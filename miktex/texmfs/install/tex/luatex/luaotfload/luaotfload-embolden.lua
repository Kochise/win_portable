-----------------------------------------------------------------------
--         FILE:  luaotfload-embolden.lua
--  DESCRIPTION:  part of luaotfload / embolden
-----------------------------------------------------------------------

local ProvidesLuaModule = { 
    name          = "luaotfload-embolden",
    version       = "3.15",       --TAGVERSION
    date          = "2020-09-02", --TAGDATE
    description   = "luaotfload submodule / embolden",
    license       = "GPL v2.0",
    author        = "Marcel Krüger"
}

if luatexbase and luatexbase.provides_module then
  luatexbase.provides_module (ProvidesLuaModule)
end  

local otffeatures        = fonts.constructors.newfeatures "otf"

local function enableembolden(tfmdata, _, embolden)
  tfmdata.mode, tfmdata.width = 2, tfmdata.size*embolden/6578.176
end

otffeatures.register {
  name        = "embolden",
  description = "embolden",
  manipulators = {
    base = enableembolden,
    node = enableembolden,
    plug = enableembolden,
  }
}

--- vim:sw=2:ts=2:expandtab:tw=71
