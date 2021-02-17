// Currently there is only X11 Selections support and no way to handle Wayland
// but since Wayland isn't extremely adopted, we are covering almost all Linux distros.
module x11

import time
import sync
import math

#flag -lX11
#flag freebsd -I/usr/local/include
#flag freebsd -L/usr/local/lib -lX11
#include <X11/Xlib.h> # Please install a package with the X11 development headers, for example: `apt-get install libx11-dev`
// X11
[typedef]
struct C.Display {
}

[typedef]
struct C.Atom {
}

[typedef]
struct C.Window {
}

fn C.XInitThreads() int

fn C.XCloseDisplay(d &Display)

fn C.XFlush(d &Display)

fn C.XDestroyWindow(d &Display, w C.Window)

fn C.XNextEvent(d C.Display, e &XEvent)

fn C.XSetSelectionOwner(d &Display, a C.Atom, w C.Window, time int)

fn C.XGetSelectionOwner(d &Display, a C.Atom) C.Window

fn C.XChangeProperty(d &Display, requestor C.Window, property C.Atom, typ C.Atom, format int, mode int, data voidptr, nelements int) int

fn C.XSendEvent(d &Display, requestor C.Window, propogate int, mask i64, event &XEvent)

fn C.XInternAtom(d &Display, typ byteptr, only_if_exists int) C.Atom

fn C.XCreateSimpleWindow(d &Display, root C.Window, x int, y int, width u32, height u32, border_width u32, border u64, background u64) C.Window

fn C.XOpenDisplay(name byteptr) &C.Display

fn C.XConvertSelection(d &Display, selection C.Atom, target C.Atom, property C.Atom, requestor Window, time int) int

fn C.XSync(d &Display, discard int) int

fn C.XGetWindowProperty(d &Display, w Window, property C.Atom, offset i64, length i64, delete int, req_type C.Atom, actual_type_return &C.Atom, actual_format_return &int, nitems &u64, bytes_after_return &u64, prop_return &byteptr) int

fn C.XDeleteProperty(d &Display, w Window, property C.Atom) int

fn C.DefaultScreen() int

fn C.RootWindow() voidptr

fn C.BlackPixel() voidptr

fn C.WhitePixel() voidptr

fn C.XFree()

fn todo_del() {}

[typedef]
struct C.XSelectionRequestEvent {
mut:
	display   &C.Display // Display the event was read from
	owner     C.Window
	requestor C.Window
	selection C.Atom
	target    C.Atom
	property  C.Atom
	time      int
}

[typedef]
struct C.XSelectionEvent {
mut:
	@type     int
	display   &C.Display // Display the event was read from
	requestor C.Window
	selection C.Atom
	target    C.Atom
	property  C.Atom
	time      int
}

[typedef]
struct C.XSelectionClearEvent {
mut:
	window    C.Window
	selection C.Atom
}

[typedef]
struct C.XDestroyWindowEvent {
mut:
	window C.Window
}

[typedef]
union C.XEvent {
mut:
	@type             int
	xdestroywindow    C.XDestroyWindowEvent
	xselectionclear   C.XSelectionClearEvent
	xselectionrequest C.XSelectionRequestEvent
	xselection        C.XSelectionEvent
}

const (
	atom_names = ['TARGETS', 'CLIPBOARD', 'PRIMARY', 'SECONDARY', 'TEXT', 'UTF8_STRING', 'text/plain',
		'text/html',
	]
)

// UNSUPPORTED TYPES: MULTIPLE, INCR, TIMESTAMP, image/bmp, image/jpeg, image/tiff, image/png
// all the atom types we need
// currently we only support text
// in the future, maybe we can extend this
// to support other mime types
enum AtomType {
	xa_atom = 0 // value 4
	xa_string = 1 // value 31
	targets = 2
	clipboard = 3
	primary = 4
	secondary = 5
	text = 6
	utf8_string = 7
	text_plain = 8
	text_html = 9
}

pub struct Clipboard {
	display &C.Display
mut:
	selection C.Atom // the selection atom
	window    C.Window
	atoms     []C.Atom
	mutex     &sync.Mutex
	text      string // text data sent or received
	got_text  bool   // used to confirm that we have got the text
	is_owner  bool   // to save selection owner state
}

struct Property {
	actual_type   C.Atom
	actual_format int
	nitems        u64
	data          byteptr
}

// new_clipboard returns a new `Clipboard` instance allocated on the heap.
// The `Clipboard` resources can be released with `free()`
pub fn new_clipboard() &Clipboard {
	return new_x11_clipboard(.clipboard)
}

// new_x11_clipboard initializes a new clipboard of the given selection type.
// Multiple clipboard instance types can be initialized and used separately.
fn new_x11_clipboard(selection AtomType) &Clipboard {
	if selection !in [.clipboard, .primary, .secondary] {
		panic('Wrong AtomType. Must be one of .primary, .secondary or .clipboard.')
	}
	// init x11 thread support
	status := C.XInitThreads()
	if status == 0 {
		println('WARN: this system does not support threads; clipboard will cause the program to lock.')
	}

	display := new_display()

	if display == C.NULL {
		println('ERROR: No X Server running. Clipboard cannot be used.')
		return &Clipboard{
			display: 0
			mutex: sync.new_mutex()
		}
	}

	mut cb := &Clipboard{
		display: display
		window: create_xwindow(display)
		mutex: sync.new_mutex()
	}
	cb.intern_atoms()
	cb.selection = cb.get_atom(selection)
	// start the listener on another thread or
	// we will be locked and will have to hard exit
	go cb.start_listener()
	return cb
}

fn (cb &Clipboard) check_availability() bool {
	return cb.display != C.NULL
}

fn (mut cb Clipboard) free() {
	C.XDestroyWindow(cb.display, cb.window)
	cb.window = C.Window(C.None)
	// FIX ME: program hangs when closing display
	// XCloseDisplay(cb.display)
}

fn (mut cb Clipboard) clear() {
	cb.mutex.m_lock()
	C.XSetSelectionOwner(cb.display, cb.selection, C.Window(C.None), C.CurrentTime)
	C.XFlush(cb.display)
	cb.is_owner = false
	cb.text = ''
	cb.mutex.unlock()
}

fn (cb &Clipboard) has_ownership() bool {
	return cb.is_owner
}

fn (cb &Clipboard) take_ownership() {
	C.XSetSelectionOwner(cb.display, cb.selection, cb.window, C.CurrentTime)
	C.XFlush(cb.display)
}

// set_text stores `text` in the system clipboard.
pub fn (mut cb Clipboard) set_text(text string) bool {
	if cb.window == C.Window(C.None) {
		return false
	}
	cb.mutex.m_lock()
	cb.text = text
	cb.is_owner = true
	cb.take_ownership()
	C.XFlush(cb.display)
	cb.mutex.unlock()
	// sleep a little bit
	time.sleep(1)
	return cb.is_owner
}

fn (mut cb Clipboard) get_text() string {
	if cb.window == C.Window(C.None) {
		return ''
	}
	if cb.is_owner {
		return cb.text
	}
	cb.got_text = false

	// Request a list of possible conversions, if we're pasting.
	C.XConvertSelection(cb.display, cb.selection, cb.get_atom(.targets), cb.selection,
		cb.window, C.CurrentTime)

	// wait for the text to arrive
	mut retries := 5
	for {
		if cb.got_text || retries == 0 {
			break
		}
		time.usleep(50000)
		retries--
	}
	return cb.text
}

// transmit_selection is crucial to handling all the different data types.
// If we ever support other mimetypes they should be handled here.
fn (mut cb Clipboard) transmit_selection(xse &C.XSelectionEvent) bool {
	if xse.target == cb.get_atom(.targets) {
		targets := cb.get_supported_targets()
		C.XChangeProperty(xse.display, xse.requestor, xse.property, cb.get_atom(.xa_atom),
			32, C.PropModeReplace, targets.data, targets.len)
	} else if cb.is_supported_target(xse.target) && cb.is_owner && cb.text != '' {
		cb.mutex.m_lock()
		C.XChangeProperty(xse.display, xse.requestor, xse.property, xse.target, 8, C.PropModeReplace,
			cb.text.str, cb.text.len)
		cb.mutex.unlock()
	} else {
		return false
	}
	return true
}

fn (mut cb Clipboard) start_listener() {
	event := C.XEvent{}
	mut sent_request := false
	mut to_be_requested := C.Atom(0)
	for {
		C.XNextEvent(cb.display, &event)
		if unsafe { event.@type == 0 } {
			println('error')
			continue
		}
		match unsafe { event.@type } {
			C.DestroyNotify {
				if unsafe { event.xdestroywindow.window == cb.window } {
					// we are done
					return
				}
			}
			C.SelectionClear {
				if unsafe { event.xselectionclear.window == cb.window } && unsafe {
					event.xselectionclear.selection == cb.selection
				}
				{
					cb.mutex.m_lock()
					cb.is_owner = false
					cb.text = ''
					cb.mutex.unlock()
				}
			}
			C.SelectionRequest {
				if unsafe { event.xselectionrequest.selection == cb.selection } {
					mut xsre := &C.XSelectionRequestEvent{
						display: 0
					}
					xsre = unsafe { &event.xselectionrequest }

					mut xse := C.XSelectionEvent{
						@type: C.SelectionNotify // 31
						display: xsre.display
						requestor: xsre.requestor
						selection: xsre.selection
						time: xsre.time
						target: xsre.target
						property: xsre.property
					}
					if !cb.transmit_selection(&xse) {
						xse.property = new_atom(C.None)
					}
					C.XSendEvent(cb.display, xse.requestor, 0, C.PropertyChangeMask, voidptr(&xse))
					C.XFlush(cb.display)
				}
			}
			C.SelectionNotify {
				if unsafe {
					event.xselection.selection == cb.selection && event.xselection.property != C.Atom(C.None)
				}
				{
					if unsafe { event.xselection.target == cb.get_atom(.targets) && !sent_request } {
						sent_request = true
						prop := read_property(cb.display, cb.window, cb.selection)
						to_be_requested = cb.pick_target(prop)
						if to_be_requested != C.Atom(0) {
							C.XConvertSelection(cb.display, cb.selection, to_be_requested,
								cb.selection, cb.window, C.CurrentTime)
						}
					} else if unsafe { event.xselection.target == to_be_requested } {
						sent_request = false
						to_be_requested = C.Atom(0)
						cb.mutex.m_lock()
						prop := unsafe {
							read_property(event.xselection.display, event.xselection.requestor,
								event.xselection.property)
						}
						unsafe {
							C.XDeleteProperty(event.xselection.display, event.xselection.requestor,
								event.xselection.property)
						}
						if cb.is_supported_target(prop.actual_type) {
							cb.got_text = true
							unsafe {
								cb.text = byteptr(prop.data).vstring() // TODO: return byteptr to support other mimetypes
							}
						}
						cb.mutex.unlock()
					}
				}
			}
			C.PropertyNotify {}
			else {}
		}
	}
}

/*
* Helpers
*/
// intern_atoms initializes all the atoms we need.
fn (mut cb Clipboard) intern_atoms() {
	cb.atoms << C.Atom(4) // XA_ATOM
	cb.atoms << C.Atom(31) // XA_STRING
	for i, name in atom_names {
		only_if_exists := if i == int(AtomType.utf8_string) { 1 } else { 0 }
		cb.atoms << C.XInternAtom(cb.display, name.str, only_if_exists)
		if i == int(AtomType.utf8_string) && cb.atoms[i] == C.Atom(C.None) {
			cb.atoms[i] = cb.get_atom(.xa_string)
		}
	}
}

fn read_property(d &C.Display, w C.Window, p C.Atom) Property {
	actual_type := C.Atom(0)
	actual_format := 0
	nitems := u64(0)
	bytes_after := u64(0)
	ret := byteptr(0)
	mut read_bytes := 1024
	for {
		if ret != 0 {
			C.XFree(ret)
		}
		C.XGetWindowProperty(d, w, p, 0, read_bytes, 0, C.AnyPropertyType, &actual_type,
			&actual_format, &nitems, &bytes_after, &ret)
		read_bytes *= 2
		if bytes_after == 0 {
			break
		}
	}
	return Property{actual_type, actual_format, nitems, ret}
}

// pick_target finds the best target given a local copy of a property.
fn (cb &Clipboard) pick_target(prop Property) C.Atom {
	// The list of targets is a list of atoms, so it should have type XA_ATOM
	// but it may have the type TARGETS instead.
	if (prop.actual_type != cb.get_atom(.xa_atom) &&
		prop.actual_type != cb.get_atom(.targets)) ||
		prop.actual_format != 32
	{
		// This would be really broken. Targets have to be an atom list
		// and applications should support this. Nevertheless, some
		// seem broken (MATLAB 7, for instance), so ask for STRING
		// next instead as the lowest common denominator
		return cb.get_atom(.xa_string)
	} else {
		atom_list := &C.Atom(prop.data)

		mut to_be_requested := C.Atom(0)

		// This is higher than the maximum priority.
		mut priority := math.max_i32

		for i in 0 .. prop.nitems {
			// See if this data type is allowed and of higher priority (closer to zero)
			// than the present one.

			target := unsafe { atom_list[i] }
			if cb.is_supported_target(target) {
				index := cb.get_target_index(target)
				if priority > index && index >= 0 {
					priority = index
					to_be_requested = target
				}
			}
		}
		return to_be_requested
	}
}

fn (cb &Clipboard) get_atoms(types ...AtomType) []C.Atom {
	mut atoms := []C.Atom{}
	for typ in types {
		atoms << cb.atoms[typ]
	}
	return atoms
}

fn (cb &Clipboard) get_atom(typ AtomType) C.Atom {
	return cb.atoms[typ]
}

fn (cb &Clipboard) is_supported_target(target C.Atom) bool {
	return cb.get_target_index(target) >= 0
}

fn (cb &Clipboard) get_target_index(target C.Atom) int {
	for i, atom in cb.get_supported_targets() {
		if atom == target {
			return i
		}
	}
	return -1
}

fn (cb &Clipboard) get_supported_targets() []C.Atom {
	return cb.get_atoms(AtomType.utf8_string, .xa_string, .text, .text_plain, .text_html)
}

fn new_atom(value int) &C.Atom {
	return unsafe { &C.Atom(value) }
}

fn create_xwindow(display &C.Display) C.Window {
	n := C.DefaultScreen(display)
	return C.XCreateSimpleWindow(display, C.RootWindow(display, n), 0, 0, 1, 1, 0, C.BlackPixel(display,
		n), C.WhitePixel(display, n))
}

fn new_display() &C.Display {
	return C.XOpenDisplay(C.NULL)
}

// new_primary returns a new X11 `PRIMARY` type `Clipboard` instance allocated on the heap.
// Please note: new_primary only works on X11 based systems.
pub fn new_primary() &Clipboard {
	return new_x11_clipboard(.primary)
}
