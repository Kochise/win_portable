module sapp

pub struct C.sapp_desc {
pub:
	init_cb fn()					// these are the user-provided callbacks without user data
	frame_cb fn()
	cleanup_cb fn()
	event_cb fn(&C.sapp_event) //&sapp_event)
	fail_cb fn(byteptr)

    user_data voidptr                // these are the user-provided callbacks with user data
	init_userdata_cb fn(voidptr)
	frame_userdata_cb fn(voidptr)
	cleanup_userdata_cb fn(voidptr)
	event_userdata_cb fn(&C.sapp_event, voidptr)
	fail_userdata_cb fn(byteptr,voidptr)

    width int                          /* the preferred width of the window / canvas */
    height int                         /* the preferred height of the window / canvas */
    sample_count int                   /* MSAA sample count */
    swap_interval int                  /* the preferred swap interval (ignored on some platforms) */
    high_dpi bool                      /* whether the rendering canvas is full-resolution on HighDPI displays */
    fullscreen bool                    /* whether the window should be created in fullscreen mode */
    alpha bool                         /* whether the framebuffer should have an alpha channel (ignored on some platforms) */
    window_title byteptr	           /* the window title as UTF-8 encoded string */
    user_cursor bool                   /* if true, user is expected to manage cursor image in SAPP_EVENTTYPE_UPDATE_CURSOR */
    enable_clipboard bool              /* enable clipboard access, default is false */
    clipboard_size int                 /* max size of clipboard content in bytes */

    html5_canvas_name byteptr          /* the name (id) of the HTML5 canvas element, default is "canvas" */
    html5_canvas_resize bool           /* if true, the HTML5 canvas size is set to sapp_desc.width/height, otherwise canvas size is tracked */
    html5_preserve_drawing_buffer bool /* HTML5 only: whether to preserve default framebuffer content between frames */
    html5_premultiplied_alpha bool     /* HTML5 only: whether the rendered pixels use premultiplied alpha convention */
    html5_ask_leave_site bool          /* initial state of the internal html5_ask_leave_site flag (see sapp_html5_ask_leave_site()) */
    ios_keyboard_resizes_canvas bool   /* if true, showing the iOS keyboard shrinks the canvas */
    gl_force_gles2 bool                /* if true, setup GLES2/WebGL even if GLES3/WebGL2 is available */
}

pub struct Event {
pub:
    frame_count u64
    typ EventType
    key_code KeyCode
    char_code u32
    key_repeat bool
    modifiers u32
    mouse_button MouseButton
    mouse_x f32
    mouse_y f32
    mouse_dx f32
    mouse_dy f32
    scroll_x f32
    scroll_y f32
    num_touches int
    touches [8]C.sapp_touchpoint
    window_width int
    window_height int
    framebuffer_width int
    framebuffer_height int
}

pub struct C.sapp_event {
pub:
    frame_count u64
    @type EventType
    key_code KeyCode
    char_code u32
    key_repeat bool
    modifiers u32
    mouse_button MouseButton
    mouse_x f32
    mouse_y f32
    mouse_dx f32
    mouse_dy f32
    scroll_x f32
    scroll_y f32
    num_touches int
    touches [8]C.sapp_touchpoint
    window_width int
    window_height int
    framebuffer_width int
    framebuffer_height int
}
pub fn (e &C.sapp_event) str() string {
    return 'evt: frame_count=$e.frame_count, type=${e.@type}'
}

pub struct C.sapp_touchpoint {
pub:
    identifier u64
    pos_x f32
    pos_y f32
    changed bool
}
