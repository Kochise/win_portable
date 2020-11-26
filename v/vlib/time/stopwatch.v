// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module time

pub struct StopWatchOptions {
	auto_start bool = true
}

pub struct StopWatch {
mut:
	elapsed u64
pub mut:
	start   u64
	end     u64
}

pub fn new_stopwatch(opts StopWatchOptions) StopWatch {
	mut initial := u64(0)

	if opts.auto_start {
		initial = time.sys_mono_now()
	}

	return StopWatch{elapsed: 0, start: initial, end: 0}
}

// start Starts the timer. If the timer was paused, restarts counting.
pub fn (mut t StopWatch) start() {
	t.start = time.sys_mono_now()
	t.end = 0
}

pub fn (mut t StopWatch) restart() {
	t.start = time.sys_mono_now()
	t.end = 0
	t.elapsed = 0
}

pub fn (mut t StopWatch) stop() {
	t.end = time.sys_mono_now()
}

pub fn (mut t StopWatch) pause() {
	if t.start > 0 {
		if t.end == 0 {
			t.elapsed += time.sys_mono_now() - t.start
		} else {
			t.elapsed += t.end - t.start
		}
	}

	t.start = 0
}

// elapsed returns the Duration since the last start call
pub fn (t StopWatch) elapsed() Duration {
	if t.start > 0 {
		if t.end == 0 {
			return Duration(time.sys_mono_now() - t.start + t.elapsed)
		} else {
			return Duration(t.end - t.start + t.elapsed)
		}
	}

	return Duration(t.elapsed)
}
