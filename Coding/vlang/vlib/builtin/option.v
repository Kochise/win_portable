// Copyright (c) 2019-2022 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module builtin

// IError holds information about an error instance
pub interface IError {
	// >> Hack to allow old style custom error implementations
	// TODO: remove once deprecation period for `IError` methods has ended
	msg string
	code int // <<
	msg() string
	code() int
}

pub fn (err IError) str() string {
	return match err {
		None__ {
			'none'
		}
		Error {
			err.msg()
		}
		MessageError {
			err.msg()
		}
		else {
			// >> Hack to allow old style custom error implementations
			// TODO: remove once deprecation period for `IError` methods has ended
			// old_error_style := unsafe { voidptr(&err.msg) != voidptr(&err.code) } // if fields are not defined (new style) they don't have an offset between
			// <<
			'$err.type_name(): $err.msg()'
		}
	}
}

// Error is the empty default implementation of `IError`.
pub struct Error {}

pub fn (err Error) msg() string {
	return ''
}

pub fn (err Error) code() int {
	return 0
}

// MessageError is the default implementation of the `IError` interface that is returned by the `error()` function
struct MessageError {
pub:
	msg  string
	code int
}

pub fn (err MessageError) msg() string {
	return err.msg
}

pub fn (err MessageError) code() int {
	return err.code
}

[unsafe]
pub fn (err &MessageError) free() {
	unsafe { err.msg.free() }
}

const none__ = IError(&None__{})

struct None__ {
	Error
}

fn (_ None__) str() string {
	return 'none'
}

[if trace_error ?]
fn trace_error(x string) {
	eprintln('> ${@FN} | $x')
}

// error returns a default error instance containing the error given in `message`.
// Example: if ouch { return error('an error occurred') }
[inline]
pub fn error(message string) IError {
	trace_error(message)
	return &MessageError{
		msg: message
	}
}

// error_with_code returns a default error instance containing the given `message` and error `code`.
// Example: if ouch { return error_with_code('an error occurred', 1) }
[inline]
pub fn error_with_code(message string, code int) IError {
	trace_error('$message | code: $code')
	return &MessageError{
		msg: message
		code: code
	}
}

// Option is the base of V's internal optional return system.
struct Option {
	state byte
	err   IError = none__
	// Data is trailing after err
	// and is not included in here but in the
	// derived Option_xxx types
}

fn opt_ok(data voidptr, mut option Option, size int) {
	unsafe {
		*option = Option{}
		// use err to get the end of OptionBase and then memcpy into it
		vmemcpy(&byte(&option.err) + sizeof(IError), data, size)
	}
}

pub fn (_ none) str() string {
	return 'none'
}
