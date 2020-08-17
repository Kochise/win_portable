require "core.strict"
local common = require "core.common"
local config = require "core.config"
local style = require "core.style"
local command
local keymap
local RootView
local StatusView
local CommandView
local Doc
local View

local core = {}


local function project_scan_thread()
  local function diff_files(a, b)
    if #a ~= #b then return true end
    for i, v in ipairs(a) do
      if b[i].filename ~= v.filename or b[i].type ~= v.type then
        return true
      end
    end
  end

  local function get_files(path, t)
    coroutine.yield()
    t = t or {}
    local size_limit = config.file_size_limit * 10e5
    local all = system.list_dir(path)
    local dirs, files = {}, {}

    for _, file in ipairs(all) do
      if not file:find("^%.") then
        local file = path .. _PATHSEP .. file
        local info = system.get_file_info(file)
        if info and info.size < size_limit then
          table.insert(info.type == "dir" and dirs or files, file)
        end
      end
    end

    table.sort(dirs)
    for _, dir in ipairs(dirs) do
      table.insert(t, { filename = dir, type = "dir" })
      get_files(dir, t)
    end

    table.sort(files)
    for _, file in ipairs(files) do
      table.insert(t, { filename = file, type = "file" })
    end

    return t
  end

  while true do
    -- get project files and replace previous table if the new table is
    -- different
    local t = get_files(core.project_dir)
    if diff_files(core.project_files, t) then
      core.project_files = t
      core.redraw = true
    end

    -- wait for next scan
    coroutine.yield(config.project_scan_rate)
  end
end


function core.init()
  command = require "core.command"
  keymap = require "core.keymap"
  RootView = require "core.rootview"
  View = require "core.view"
  StatusView = require "core.statusview"
  CommandView = require "core.commandview"
  Doc = require "core.doc"

  core.frame_start = 0
  core.clip_rect_stack = {{ 0,0,0,0 }}
  core.log_items = {}
  core.docs = {}
  core.threads = setmetatable({}, { __mode = "k" })
  core.project_files = {}
  core.project_dir = "."

  local info = _ARGS[2] and system.get_file_info(_ARGS[2])
  if info and info.type == "dir" then
    core.project_dir = _ARGS[2]:gsub("[\\/]$", "")
  end

  core.root_view = RootView()
  core.command_view = CommandView()
  core.status_view = StatusView()

  core.root_view.root_node:split("down", core.command_view, true)
  core.root_view.root_node.b:split("down", core.status_view, true)
  core.active_view = core.root_view.root_node.a.active_view

  core.add_thread(project_scan_thread)
  command.add_defaults()
  local got_plugin_error = not core.load_plugins()
  local got_user_error = not core.try(require, "user")

  for i = 2, #_ARGS do
    local filename = _ARGS[i]
    local info = system.get_file_info(filename)
    if info and info.type == "file" then
      core.root_view:open_doc(core.open_doc(filename))
    end
  end

  if got_plugin_error or got_user_error then
    command.perform("core:open-log")
  end
end


function core.quit(force)
  if force then
    os.exit()
  end
  local dirty_count = 0
  local dirty_name
  for _, doc in ipairs(core.docs) do
    if doc:is_dirty() then
      dirty_count = dirty_count + 1
      dirty_name = doc:get_name()
    end
  end
  if dirty_count > 0 then
    local text
    if dirty_count == 1 then
      text = string.format("%q has unsaved changes. Quit anyway?", dirty_name)
    else
      text = string.format("%d docs have unsaved changes. Quit anyway?", dirty_count)
    end
    local confirm = system.show_confirm_dialog("Unsaved Changes", text)
    if not confirm then return end
  end
  core.quit(true)
end


function core.load_plugins()
  local no_errors = true
  local files = system.list_dir(_EXEDIR .. "/data/plugins")
  for _, filename in ipairs(files) do
    local modname = "plugins." .. filename:gsub(".lua$", "")
    local ok = core.try(require, modname)
    if ok then
      core.log_quiet("Loaded plugin %q", modname)
    else
      no_errors = false
    end
  end
  return no_errors
end


function core.reload_module(name)
  local old = package.loaded[name]
  package.loaded[name] = nil
  local new = require(name)
  if type(old) == "table" then
    for k, v in pairs(new) do old[k] = v end
    package.loaded[name] = old
  end
end


function core.add_thread(f, weak_ref)
  local key = weak_ref or #core.threads + 1
  core.threads[key] = { cr = coroutine.create(f), wake = 0 }
end


function core.push_clip_rect(x, y, w, h)
  local x2, y2, w2, h2 = table.unpack(core.clip_rect_stack[#core.clip_rect_stack])
  local r, b, r2, b2 = x+w, y+h, x2+w2, y2+h2
  x, y = math.max(x, x2), math.max(y, y2)
  b, r = math.min(b, b2), math.min(r, r2)
  w, h = r-x, b-y
  table.insert(core.clip_rect_stack, { x, y, w, h })
  renderer.set_clip_rect(x, y, w, h)
end


function core.pop_clip_rect()
  table.remove(core.clip_rect_stack)
  local x, y, w, h = table.unpack(core.clip_rect_stack[#core.clip_rect_stack])
  renderer.set_clip_rect(x, y, w, h)
end


function core.open_doc(filename)
  if filename then
    -- try to find existing doc for filename
    local abs_filename = system.absolute_path(filename)
    for _, doc in ipairs(core.docs) do
      if doc.filename
      and abs_filename == system.absolute_path(doc.filename) then
        return doc
      end
    end
  end
  -- no existing doc for filename; create new
  local doc = Doc(filename)
  table.insert(core.docs, doc)
  core.log_quiet(filename and "Opened doc %q" or "Opened new doc", filename)
  return doc
end


function core.get_views_referencing_doc(doc)
  local res = {}
  local views = core.root_view.root_node:get_children()
  for _, view in ipairs(views) do
    if view.doc == doc then table.insert(res, view) end
  end
  return res
end


local function log(icon, icon_color, fmt, ...)
  local text = string.format(fmt, ...):gsub("%s", " ")
  if icon then
    core.status_view:show_message(icon, icon_color, text)
  end

  local view = core.active_view and core.active_view:get_name()
  local item = { text = text, time = os.time(), view = view }
  table.insert(core.log_items, item)
  if #core.log_items > config.max_log_items then
    table.remove(core.log_items, 1)
  end
  return item
end


function core.log(...)
  return log("i", style.text, ...)
end


function core.log_quiet(...)
  return log(nil, nil, ...)
end


function core.error(...)
  return log("!", style.accent, ...)
end


function core.try(fn, ...)
  local err
  local ok, res = xpcall(fn, function(msg)
    local item = core.error(msg)
    item.info = debug.traceback(nil, 2):gsub("\t", "")
    err = msg
  end, ...)
  if ok then
    return true, res
  end
  return false, err
end


function core.on_event(type, ...)
  local did_keymap = false
  if type == "textinput" then
    core.root_view:on_text_input(...)
  elseif type == "keypressed" then
    did_keymap = keymap.on_key_pressed(...)
  elseif type == "keyreleased" then
    keymap.on_key_released(...)
  elseif type == "mousemoved" then
    core.root_view:on_mouse_moved(...)
  elseif type == "mousepressed" then
    core.root_view:on_mouse_pressed(...)
  elseif type == "mousereleased" then
    core.root_view:on_mouse_released(...)
  elseif type == "mousewheel" then
    core.root_view:on_mouse_wheel(...)
  elseif type == "filedropped" then
    local mx, my = core.root_view.mouse.x, core.root_view.mouse.y
    local ok, doc = core.try(core.open_doc, select(1, ...))
    if ok then
      core.root_view:on_mouse_pressed("left", mx, my, 1)
      core.root_view:open_doc(doc)
    end
  elseif type == "quit" then
    core.quit()
  end
  return did_keymap
end


function core.step()
  -- handle events
  local event_count = 0
  local did_keymap = false
  local mouse_moved = false
  local mouse = { x = 0, y = 0, dx = 0, dy = 0 }

  for type, a,b,c,d in system.poll_event do
    if type == "mousemoved" then
      mouse_moved = true
      mouse.x, mouse.y = a, b
      mouse.dx, mouse.dy = mouse.dx + c, mouse.dy + d
    elseif type == "textinput" and did_keymap then
      did_keymap = false
    else
      did_keymap = core.on_event(type, a, b, c, d) or did_keymap
    end
    event_count = event_count + 1
  end
  if mouse_moved then
    core.on_event("mousemoved", mouse.x, mouse.y, mouse.dx, mouse.dy)
  end

  local width, height = renderer.get_size()

  -- update
  core.root_view.size.x, core.root_view.size.y = width, height
  core.root_view:update()
  if not (event_count > 0 or core.redraw) then
    return
  end
  core.redraw = false

  -- close unreferenced docs
  for i = #core.docs, 1, -1 do
    local doc = core.docs[i]
    if #core.get_views_referencing_doc(doc) == 0 then
      table.remove(core.docs, i)
      core.log_quiet("Closed doc %q", doc:get_name())
    end
  end

  -- update window title
  local name = core.active_view:get_name()
  if name ~= "---" then
    system.set_window_title(name .. " - lite")
  else
    system.set_window_title("lite")
  end

  -- draw
  renderer.begin_frame()
  core.clip_rect_stack[1] = { 0, 0, width, height }
  renderer.set_clip_rect(table.unpack(core.clip_rect_stack[1]))
  core.root_view:draw()
  renderer.end_frame()
end


local run_threads = coroutine.wrap(function()
  while true do
    local max_time = 1 / config.fps - 0.004
    local ran_any_threads = false

    for k, thread in pairs(core.threads) do
      -- run thread
      if thread.wake < system.get_time() then
        local _, wait = assert(coroutine.resume(thread.cr))
        if coroutine.status(thread.cr) == "dead" then
          if type(k) == "number" then
            table.remove(core.threads, k)
          else
            core.threads[k] = nil
          end
        elseif wait then
          thread.wake = system.get_time() + wait
        end
        ran_any_threads = true
      end

      -- stop running threads if we're about to hit the end of frame
      if system.get_time() - core.frame_start > max_time then
        coroutine.yield()
      end
    end

    if not ran_any_threads then coroutine.yield() end
  end
end)


function core.run()
  while true do
    core.frame_start = system.get_time()
    core.step()
    run_threads()
    local elapsed = system.get_time() - core.frame_start
    system.sleep(math.max(0, 1 / config.fps - elapsed))
  end
end


function core.on_error(err)
  -- write error to file
  local fp = io.open(_EXEDIR .. "/error.txt", "wb")
  fp:write("Error: " .. tostring(err) .. "\n")
  fp:write(debug.traceback(nil, 4))
  fp:close()
  -- save copy of all unsaved documents
  for _, doc in ipairs(core.docs) do
    if doc:is_dirty() and doc.filename then
      doc:save(doc.filename .. "~")
    end
  end
end


return core
