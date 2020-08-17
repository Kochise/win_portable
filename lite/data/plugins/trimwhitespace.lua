local core = require "core"
local command = require "core.command"
local Doc = require "core.doc"


local function trim_trailing_whitespace(doc)
  for i = 1, #doc.lines do
    local old_text = doc:get_text(i, 1, i, math.huge)
    local new_text = old_text:gsub("%s*$", "")
    if old_text ~= new_text then
      doc:insert(i, 1, new_text)
      doc:remove(i, #new_text + 1, i, math.huge)
    end
  end
end


command.add("core.docview", {
  ["trim-whitespace:trim-trailing-whitespace"] = function()
    trim_trailing_whitespace(self.active_view.doc)
  end,
})


local save = Doc.save
Doc.save = function(self, ...)
  trim_trailing_whitespace(self)
  save(self, ...)
end
