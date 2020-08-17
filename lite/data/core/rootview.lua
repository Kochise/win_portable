local core = require "core"
local common = require "core.common"
local style = require "core.style"
local keymap = require "core.keymap"
local Object = require "core.object"
local View = require "core.view"
local DocView = require "core.docview"


local EmptyView = View:extend()

function EmptyView:draw()
  self:draw_background(style.background)
  local pos = self.position
  local x, y, w, h = pos.x, pos.y, self.size.x, self.size.y
  local _, y = common.draw_text(style.big_font, style.dim, "empty", "center", x, y, w, h)
  local lines = {
    { fmt = "%s to run a command", cmd = "core:do-command" },
    { fmt = "%s to open a file from the project", cmd = "core:open-project-file" },
  }
  local th = style.font:get_height()
  for _, line in ipairs(lines) do
    local text = string.format(line.fmt, keymap.get_binding(line.cmd))
    y = y + style.padding.y
    common.draw_text(style.font, style.dim, text, "center", x, y, w, th)
    y = y + th
  end
end



local Node = Object:extend()

function Node:new(type)
  self.type = type or "leaf"
  self.position = { x = 0, y = 0 }
  self.size = { x = 0, y = 0 }
  self.views = {}
  self.divider = 0.5
  if self.type == "leaf" then
    self:add_view(EmptyView())
  end
end


function Node:propagate(fn, ...)
  self.a[fn](self.a, ...)
  self.b[fn](self.b, ...)
end


function Node:on_mouse_moved(x, y, ...)
  self.hovered_tab = self:get_tab_overlapping_point(x, y)
  if self.type == "leaf" then
    self.active_view:on_mouse_moved(x, y, ...)
  else
    self:propagate("on_mouse_moved", x, y, ...)
  end
end


function Node:on_mouse_released(...)
  if self.type == "leaf" then
    self.active_view:on_mouse_released(...)
  else
    self:propagate("on_mouse_released", ...)
  end
end


function Node:consume(node)
  for k, _ in pairs(self) do self[k] = nil end
  for k, v in pairs(node) do self[k] = v   end
end


local type_map = { up="vsplit", down="vsplit", left="hsplit", right="hsplit" }

function Node:split(dir, view, locked)
  assert(self.type == "leaf", "tried to split non-leaf node")
  local type = assert(type_map[dir], "invalid direction")
  local child = Node()
  child:consume(self)
  self:consume(Node(type))
  self.a = child
  self.b = Node()
  self.b.locked = locked
  if view then self.b:add_view(view) end
  if not self.b.active_view.focusable then
    self.a:set_active_view(self.a.active_view)
  end
  if dir == "up" or dir == "left" then
    self.a, self.b = self.b, self.a
  end
  return child
end


function Node:close_active_view(root)
  local do_close = function()
    if #self.views > 1 then
      local idx = self:get_view_idx(self.active_view)
      table.remove(self.views, idx)
      self:set_active_view(self.views[idx] or self.views[#self.views])
    else
      local parent = self:get_parent_node(root)
      local other = parent[parent.a == self and "b" or "a"]
      if other:get_locked_size() then
        self.views = {}
        self:add_view(EmptyView())
      else
        parent:consume(other)
        parent:set_active_view(parent.active_view)
      end
    end
  end
  self.active_view:try_close(do_close)
end


function Node:add_view(view)
  assert(self.type == "leaf", "tried to add view to non-leaf node")
  if self.views[1] and self.views[1]:is(EmptyView) then
    table.remove(self.views)
  end
  table.insert(self.views, view)
  self:set_active_view(view)
end


function Node:set_active_view(view)
  self.active_view = view
  core.active_view = view
end


function Node:get_view_idx(view)
  for i, v in ipairs(self.views) do
    if v == view then return i end
  end
end


function Node:get_node_for_view(view)
  for _, v in ipairs(self.views) do
    if v == view then return self end
  end
  if self.type ~= "leaf" then
    return self.a:get_node_for_view(view) or self.b:get_node_for_view(view)
  end
end


function Node:get_parent_node(root)
  if root.a == self or root.b == self then
    return root
  elseif root.type ~= "leaf" then
    return self:get_parent_node(root.a) or self:get_parent_node(root.b)
  end
end


function Node:get_children(t)
  t = t or {}
  for _, view in ipairs(self.views) do
    table.insert(t, view)
  end
  if self.a then self.a:get_children(t) end
  if self.b then self.b:get_children(t) end
  return t
end


function Node:get_divider_overlapping_point(px, py)
  if self.type ~= "leaf" then
    local p = 6
    local x, y, w, h = self:get_divider_rect()
    x, y = x - p, y - p
    w, h = w + p * 2, h + p * 2
    if px > x and py > y and px < x + w and py < y + h then
      return self
    end
    return self.a:get_divider_overlapping_point(px, py)
        or self.b:get_divider_overlapping_point(px, py)
  end
end


function Node:get_tab_overlapping_point(px, py)
  if #self.views == 1 then return nil end
  local x, y, w, h = self:get_tab_rect(1)
  if px >= x and py >= y and px < x + w * #self.views and py < y + h then
    return math.floor((px - x) / w) + 1
  end
end


function Node:get_child_overlapping_point(x, y)
  local child
  if self.type == "leaf" then
    return self
  elseif self.type == "hsplit" then
    child = (x < self.b.position.x) and self.a or self.b
  elseif self.type == "vsplit" then
    child = (y < self.b.position.y) and self.a or self.b
  end
  return child:get_child_overlapping_point(x, y)
end


function Node:get_tab_rect(idx)
  local tw = math.min(style.tab_width, math.ceil(self.size.x / #self.views))
  local h = style.font:get_height() + style.padding.y * 2
  return self.position.x + (idx-1) * tw, self.position.y, tw, h
end


function Node:get_divider_rect()
  local x, y = self.position.x, self.position.y
  if self.type == "hsplit" then
    return x + self.a.size.x, y, style.divider_size, self.size.y
  elseif self.type == "vsplit" then
    return x, y + self.a.size.y, self.size.x, style.divider_size
  end
end


function Node:get_locked_size()
  if self.type == "leaf" then
    if self.locked then
      local size = self.active_view.size
      return size.x, size.y
    end
  else
    local x1, y1 = self.a:get_locked_size()
    local x2, y2 = self.b:get_locked_size()
    if x1 and x2 then
      return x1 + x2 + style.divider_size, y1 + y2 + style.divider_size
    end
  end
end


local function copy_position_and_size(dst, src)
  dst.position.x, dst.position.y = src.position.x, src.position.y
  dst.size.x, dst.size.y = src.size.x, src.size.y
end


-- calculating the sizes is the same for hsplits and vsplits, except the x/y
-- axis are swapped; this function lets us use the same code for both
local function calc_split_sizes(self, x, y, x1, x2)
  local n
  local ds = (x1 == 0 or x2 == 0) and 0 or style.divider_size
  if x1 then
    n = math.floor(x1 + ds)
  elseif x2 then
    n = math.floor(self.size[x] - x2)
  else
    n = math.floor(self.size[x] * self.divider)
  end
  self.a.position[x] = self.position[x]
  self.a.position[y] = self.position[y]
  self.a.size[x] = n - ds
  self.a.size[y] = self.size[y]
  self.b.position[x] = self.position[x] + n
  self.b.position[y] = self.position[y]
  self.b.size[x] = self.size[x] - n
  self.b.size[y] = self.size[y]
end


function Node:update_layout()
  if self.type == "leaf" then
    local av = self.active_view
    if #self.views > 1 then
      local _, _, _, th = self:get_tab_rect(1)
      av.position.x, av.position.y = self.position.x, self.position.y + th
      av.size.x, av.size.y = self.size.x, self.size.y - th
    else
      copy_position_and_size(av, self)
    end
  else
    local x1, y1 = self.a:get_locked_size()
    local x2, y2 = self.b:get_locked_size()
    if self.type == "hsplit" then
      calc_split_sizes(self, "x", "y", x1, x2)
    elseif self.type == "vsplit" then
      calc_split_sizes(self, "y", "x", y1, y2)
    end
    self.a:update_layout()
    self.b:update_layout()
  end
end


function Node:update()
  if self.type == "leaf" then
    for _, view in ipairs(self.views) do
      view:update()
    end
  else
    self.a:update()
    self.b:update()
  end
end


function Node:draw_tabs()
  local x, y, _, h = self:get_tab_rect(1)
  local ds = style.divider_size
  core.push_clip_rect(x, y, self.size.x, h)
  renderer.draw_rect(x, y, self.size.x, h, style.background2)
  renderer.draw_rect(x, y + h - ds, self.size.x, ds, style.divider)

  for i, view in ipairs(self.views) do
    local x, y, w, h = self:get_tab_rect(i)
    local text = view:get_name()
    local color = style.dim
    if view == self.active_view then
      color = style.text
      renderer.draw_rect(x, y, w, h, style.background)
      renderer.draw_rect(x + w, y, ds, h, style.divider)
      renderer.draw_rect(x - ds, y, ds, h, style.divider)
    end
    if i == self.hovered_tab then
      color = style.text
    end
    core.push_clip_rect(x, y, w, h)
    common.draw_text(style.font, color, text, "center", x, y, w, h)
    core.pop_clip_rect()
  end

  core.pop_clip_rect()
end


function Node:draw()
  if self.type == "leaf" then
    if #self.views > 1 then
      self:draw_tabs()
    end
    local pos, size = self.active_view.position, self.active_view.size
    core.push_clip_rect(pos.x, pos.y, size.x, size.y)
    self.active_view:draw()
    core.pop_clip_rect()
  else
    local x, y, w, h = self:get_divider_rect()
    renderer.draw_rect(x, y, w, h, style.divider)
    self:propagate("draw")
  end
end



local RootView = View:extend()

function RootView:new()
  RootView.super.new(self)
  self.root_node = Node()
  self.deferred_draws = {}
  self.mouse = { x = 0, y = 0 }
end


function RootView:defer_draw(fn, ...)
  table.insert(self.deferred_draws, 1, { fn = fn, ... })
end


function RootView:get_active_node()
  local node = self.root_node:get_node_for_view(core.active_view)
  return node or self.root_node.a
end


function RootView:open_doc(doc)
  local node = self:get_active_node()
  assert(not node.locked, "Cannot open doc on locked node")
  for i, view in ipairs(node.views) do
    if view.doc == doc then
      node:set_active_view(node.views[i])
      return view
    end
  end
  local view = DocView(doc)
  node:add_view(view)
  self.root_node:update_layout()
  view:scroll_to_line(view.doc:get_selection(), true, true)
  return view
end


function RootView:on_mouse_pressed(button, x, y, clicks)
  local div = self.root_node:get_divider_overlapping_point(x, y)
  if div then
    self.dragged_divider = div
    return
  end
  local node = self.root_node:get_child_overlapping_point(x, y)
  local idx = node:get_tab_overlapping_point(x, y)
  if idx then
    node:set_active_view(node.views[idx])
    if button == "middle" then
      node:close_active_view(self.root_node)
    end
  else
    if node.active_view.focusable then
      core.active_view = node.active_view
    end
    node.active_view:on_mouse_pressed(button, x, y, clicks)
  end
end


function RootView:on_mouse_released(...)
  if self.dragged_divider then
    self.dragged_divider = nil
  end
  self.root_node:on_mouse_released(...)
end


function RootView:on_mouse_moved(x, y, dx, dy)
  if self.dragged_divider then
    local div = self.dragged_divider
    if div.type == "hsplit" then
      div.divider = div.divider + dx / div.size.x
    else
      div.divider = div.divider + dy / div.size.y
    end
    div.divider = common.clamp(div.divider, 0.01, 0.99)
    return
  end

  self.mouse.x, self.mouse.y = x, y
  self.root_node:on_mouse_moved(x, y, dx, dy)

  local node = self.root_node:get_child_overlapping_point(x, y)
  local div = self.root_node:get_divider_overlapping_point(x, y)
  if div then
    system.set_cursor(div.type == "hsplit" and "sizeh" or "sizev")
  elseif node:get_tab_overlapping_point(x, y) then
    system.set_cursor("arrow")
  else
    system.set_cursor(node.active_view.cursor)
  end
end


function RootView:on_mouse_wheel(...)
  local x, y = self.mouse.x, self.mouse.y
  local node = self.root_node:get_child_overlapping_point(x, y)
  node.active_view:on_mouse_wheel(...)
end


function RootView:on_text_input(...)
  core.active_view:on_text_input(...)
end


function RootView:update()
  copy_position_and_size(self.root_node, self)
  self.root_node:update()
  self.root_node:update_layout()

  -- do `on_mouse_moved` if the scroll of the hovered view has changed
  local x, y = self.mouse.x, self.mouse.y
  local s = self.root_node:get_child_overlapping_point(x, y).active_view.scroll
  if self.last_scroll_x ~= s.x or self.last_scroll_y ~= s.y then
    self:on_mouse_moved(self.mouse.x, self.mouse.y, 0, 0)
    self.last_scroll_x, self.last_scroll_y = s.x, s.y
  end
end


function RootView:draw()
  self.root_node:draw()
  while #self.deferred_draws > 0 do
    local t = table.remove(self.deferred_draws)
    t.fn(table.unpack(t))
  end
end


return RootView
