local core = require "core"
local common = require "core.common"
local command = require "core.command"
local keymap = require "core.keymap"
local Doc = require "core.doc"
local DocView = require "core.docview"
local LogView = require "core.logview"


command.add(nil, {
  ["core:quit"] = function()
    core.quit()
  end,

  ["core:force-quit"] = function()
    core.quit(true)
  end,

  ["core:reload-module"] = function()
    core.command_view:enter("Reload Module", function(text, item)
      local text = item and item.text or text
      core.reload_module(text)
      core.log("Reloaded module %q", text)
    end, function(text)
      local items = {}
      for name in pairs(package.loaded) do
        table.insert(items, name)
      end
      return common.fuzzy_match(items, text)
    end)
  end,

  ["core:do-command"] = function()
    local commands = command.get_all_valid()
    core.command_view:enter("Do Command", function(text, item)
      if item then
        command.perform(item.command)
      end
    end, function(text)
      local res = common.fuzzy_match(commands, text)
      for i, name in ipairs(res) do
        res[i] = {
          text = command.prettify_name(name),
          info = keymap.get_binding(name),
          command = name,
        }
      end
      return res
    end)
  end,

  ["core:new-doc"] = function()
    core.root_view:open_doc(core.open_doc())
  end,

  ["core:open-project-file"] = function()
    core.command_view:enter("Open Project File", function(text, item)
      text = core.project_dir .. _PATHSEP .. (item and item.text or text)
      core.root_view:open_doc(core.open_doc(text))
    end, function(text)
      local files = {}
      for _, item in pairs(core.project_files) do
        if item.type == "file" then
          table.insert(files, item.filename:sub(#core.project_dir + 2))
        end
      end
      return common.fuzzy_match(files, text)
    end)
  end,

  ["core:open-file"] = function()
    core.command_view:enter("Open File", function(text)
      core.root_view:open_doc(core.open_doc(text))
    end, common.path_suggest)
  end,

  ["core:open-log"] = function()
    local node = core.root_view:get_active_node()
    node:add_view(LogView())
  end,
})
