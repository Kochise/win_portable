module fontstash

#flag -I @VROOT/thirdparty/fontstash

#define FONTSTASH_IMPLEMENTATION
#include "fontstash.h"

pub const (
	// TODO: fontstash.used_import is used to keep v from warning about unused imports
	used_import = 1
)

// Contructor and destructor.
[inline]
pub fn create_internal(params &C.FONSparams) &C.FONScontext {
	return C.fonsCreateInternal(params)
}

[inline]
pub fn delete_internal(s &C.FONScontext) {
	C.fonsDeleteInternal(s)
}

[inline]
pub fn (s &C.FONScontext) set_error_callback(callback fn(uptr voidptr, error int, val int), uptr voidptr) {
	C.fonsSetErrorCallback(s, callback, uptr)
}

// Returns current atlas size.
[inline]
pub fn (s &C.FONScontext) get_atlas_size(width &int, height &int) {
	C.fonsGetAtlasSize(s, width, height)
}

// Expands the atlas size.
[inline]
pub fn (s &C.FONScontext) expand_atlas(width int, height int) int {
	return C.fonsExpandAtlas(s, width, height)
}

// Resets the whole stash.
[inline]
pub fn (s &C.FONScontext) reset_atlas(width int, height int) int {
	return C.fonsResetAtlas(s, width, height)
}

// Add fonts
[inline]
pub fn (s &C.FONScontext) get_font_by_name(name byteptr) int {
	return C.fonsGetFontByName(s, name)
}

[inline]
pub fn (s &C.FONScontext) add_fallback_font(base int, fallback int) int {
	return C.fonsAddFallbackFont(s, base, fallback)
}

[inline]
pub fn (s &C.FONScontext) add_font_mem(name byteptr, data byteptr, data_size int, free_data int) int {
	return C.fonsAddFontMem(s, name, data, data_size, free_data)
}

// State handling
[inline]
pub fn (s &C.FONScontext) push_state() {
	C.fonsPushState(s)
}

[inline]
pub fn (s &C.FONScontext) pop_state() {
	C.fonsPopState(s)
}

[inline]
pub fn (s &C.FONScontext) clear_state() {
	C.fonsClearState(s)
}

// State setting
[inline]
pub fn (s &C.FONScontext) set_size(size f32) {
	C.fonsSetSize(s, size)
}

[inline]
pub fn (s &C.FONScontext) set_color(color u32) {
	C.fonsSetColor(s, color)
}

[inline]
pub fn (s &C.FONScontext) set_spacing(spacing f32) {
	C.fonsSetSpacing(s, spacing)
}

[inline]
pub fn (s &C.FONScontext) set_blur(blur f32) {
	C.fonsSetBlur(s, blur)
}

[inline]
pub fn (s &C.FONScontext) set_align(align int) {
	C.fonsSetAlign(s, align)
}

[inline]
pub fn (s &C.FONScontext) set_font(font int) {
	C.fonsSetFont(s, font)
}

// Draw text
[inline]
pub fn (s &C.FONScontext) draw_text(x f32, y f32, str byteptr, end byteptr) f32 {
	return C.fonsDrawText(s, x, y, str, end)
}

// Measure text
[inline]
pub fn (s &C.FONScontext) text_bounds(x f32, y f32, str byteptr, end byteptr, bounds &f32) f32 {
	return C.fonsTextBounds(s, x, y, str, end, bounds)
}

[inline]
pub fn (s &C.FONScontext) line_bounds(y f32, miny &f32, maxy &f32) {
	C.fonsLineBounds(s, y, miny, maxy)
}

[inline]
pub fn (s &C.FONScontext) vert_metrics(ascender &f32, descender &f32, lineh &f32) {
	C.fonsVertMetrics(s, ascender, descender, lineh)
}

// Text iterator
[inline]
pub fn (s &C.FONScontext) text_iter_init(iter &C.FONStextIter, x f32, y f32, str byteptr, end byteptr) int {
	return C.fonsTextIterInit(s, iter, x, y, str, end)
}

[inline]
pub fn (s &C.FONScontext) text_iter_next(iter &C.FONStextIter, quad &C.FONSquad) int {
	return C.fonsTextIterNext(s, iter, quad)
}

// Pull texture changes
[inline]
pub fn (s &C.FONScontext) get_texture_data(width &int, height &int) byteptr {
	return C.fonsGetTextureData(s, width, height)
}

[inline]
pub fn (s &C.FONScontext) validate_texture(dirty &int) int {
	return C.fonsValidateTexture(s, dirty)
}

// Draws the stash texture for debugging
[inline]
pub fn (s &C.FONScontext) draw_debug(x f32, y f32) {
	C.fonsDrawDebug(s, x, y)
}

