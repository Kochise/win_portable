// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module builtin

//pub fn vsyscall(id int
//

/*
pub const (
	sys_write = 1
	sys_mkdir = 83
)
const (
	stdin_value = 0
	stdout_value = 1
	stderr_value  = 2
)

*/

fn builtin_init() {
	// Do nothing
}

fn print_backtrace_skipping_top_frames(xskipframes int) bool {
	skipframes := xskipframes + 2
	$if macos {
		return print_backtrace_skipping_top_frames_mac(skipframes)
	}
	$if linux {
		return print_backtrace_skipping_top_frames_linux(skipframes)
	}
	$if freebsd {
		return print_backtrace_skipping_top_frames_freebsd(skipframes)
	}
	$if netbsd {
		return print_backtrace_skipping_top_frames_freebsd(skipframes)
	}
	$if openbsd {
		return print_backtrace_skipping_top_frames_freebsd(skipframes)
	}
	println('print_backtrace_skipping_top_frames is not implemented. skipframes: $skipframes')
	return false
}

// the functions below are not called outside this file,
// so there is no need to have their twins in builtin_windows.v
fn print_backtrace_skipping_top_frames_mac(skipframes int) bool {
	$if macos {
		buffer := [100]voidptr{}
		nr_ptrs := C.backtrace(buffer, 100)
		if nr_ptrs < 2 {
			eprintln('C.backtrace returned less than 2 frames')
			return false
		}
		C.backtrace_symbols_fd(&buffer[skipframes], nr_ptrs - skipframes, 2)
	}
	return true
}

fn print_backtrace_skipping_top_frames_freebsd(skipframes int) bool {
	$if freebsd {
		buffer := [100]voidptr{}
		nr_ptrs := C.backtrace(buffer, 100)
		if nr_ptrs < 2 {
			eprintln('C.backtrace returned less than 2 frames')
			return false
		}
		C.backtrace_symbols_fd(&buffer[skipframes], nr_ptrs - skipframes, 2)
	}
	return true
}

fn C.tcc_backtrace(fmt charptr, other ...charptr) int
fn print_backtrace_skipping_top_frames_linux(skipframes int) bool {
	$if android {
		eprintln('On Android no backtrace is available.')
		return false
	}
	$if !glibc {
		eprintln('backtrace_symbols is missing => printing backtraces is not available.')
		eprintln('Some libc implementations like musl simply do not provide it.')
		return false
	}
	$if no_backtrace ? {
		return false
	} $else {
		$if tinyc {
			C.tcc_backtrace("Backtrace")
			return false
		}
		buffer := [100]byteptr{}
		nr_ptrs := C.backtrace(voidptr(buffer), 100)
		if nr_ptrs < 2 {
			eprintln('C.backtrace returned less than 2 frames')
			return false
		}
		nr_actual_frames := nr_ptrs - skipframes
		mut sframes := []string{}
		//////csymbols := backtrace_symbols(*voidptr(&buffer[skipframes]), nr_actual_frames)
		csymbols := C.backtrace_symbols(voidptr(&buffer[skipframes]), nr_actual_frames)
		for i in 0 .. nr_actual_frames {
			sframes << unsafe {tos2( byteptr(csymbols[i]) )}
		}
		for sframe in sframes {
			executable := sframe.all_before('(')
			addr := sframe.all_after('[').all_before(']')
			beforeaddr := sframe.all_before('[')
			cmd := 'addr2line -e $executable $addr'
			// taken from os, to avoid depending on the os module inside builtin.v
			f := C.popen(charptr(cmd.str), 'r')
			if isnil(f) {
				eprintln(sframe)
				continue
			}
			buf := [1000]byte{}
			mut output := ''
			for C.fgets(charptr(buf), 1000, f) != 0 {
				output += tos(byteptr(buf), vstrlen(byteptr(buf)))
			}
			output = output.trim_space() + ':'
			if C.pclose(f) != 0 {
				eprintln(sframe)
				continue
			}
			if output in ['??:0:', '??:?:'] {
				output = ''
			}
			// See http://wiki.dwarfstd.org/index.php?title=Path_Discriminators
			// NB: it is shortened here to just d. , just so that it fits, and so
			// that the common error file:lineno: line format is enforced.
			output = output.replace(' (discriminator', ': (d.')
			eprintln('${output:-55s} | ${addr:14s} | $beforeaddr')
		}
	}
	return true
}

fn break_if_debugger_attached() {
	unsafe {
		mut ptr := &voidptr(0)
		*ptr = voidptr(0)
	}
}
