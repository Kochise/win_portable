module os

// ProcessState.not_started - the process has not yet started
// ProcessState.running - the process is currently running
// ProcessState.stopped - the process was running, but was stopped temporarily
// ProcessState.exited - the process has finished/exited
// ProcessState.aborted - the process was terminated by a signal
pub enum ProcessState {
	not_started
	running
	stopped
	exited
	aborted
}

[ref_only]
pub struct Process {
pub:
	filename      string // the process's command file path
pub mut:
	pid           int // the PID of the process
	code          int = -1
	// the exit code of the process, != -1 *only* when status is .exited *and* the process was not aborted
	status        ProcessState = .not_started
	// the current status of the process
	err           string // if the process fails, contains the reason why
	args          []string // the arguments that the command takes
	env_is_custom bool // true, when the environment was customized with .set_environment
	env           []string // the environment with which the process was started
	use_stdio_ctl bool // when true, then you can use p.stdin_write(), p.stdout_slurp() and p.stderr_slurp()
	stdio_fd      [3]int
}

// new_process - create a new process descriptor
// NB: new does NOT start the new process.
// That is done because you may want to customize it first,
// by calling different set_ methods on it.
// In order to start it, call p.run() or p.wait()
pub fn new_process(filename string) &Process {
	return &Process{
		filename: filename
	}
}

// set_args - set the arguments for the new process
pub fn (mut p Process) set_args(pargs []string) &Process {
	if p.status != .not_started {
		return p
	}
	p.args = pargs
	return p
}

// set_environment - set a custom environment variable mapping for the new process
pub fn (mut p Process) set_environment(envs map[string]string) &Process {
	if p.status != .not_started {
		return p
	}
	p.env_is_custom = true
	p.env = []string{}
	for k, v in envs {
		p.env << '$k=$v'
	}
	return p
}

// run - starts the new process
pub fn (mut p Process) run() &Process {
	if p.status != .not_started {
		return p
	}
	p._spawn()
	return p
}

// signal_kill - kills the process, after that it is no longer running
pub fn (mut p Process) signal_kill() &Process {
	if p.status !in [.running, .stopped] {
		return p
	}
	p._signal_kill()
	p.status = .aborted
	return p
}

// signal_stop - stops the process, you can resume it with p.signal_continue()
pub fn (mut p Process) signal_stop() &Process {
	if p.status != .running {
		return p
	}
	p._signal_stop()
	p.status = .stopped
	return p
}

// signal_continue - tell a stopped process to continue/resume its work
pub fn (mut p Process) signal_continue() &Process {
	if p.status != .stopped {
		return p
	}
	p._signal_continue()
	p.status = .running
	return p
}

// wait - wait for a process to finish.
// NB: You have to call p.wait(), otherwise a finished process
// would get to a zombie state, and its resources will not get
// released fully, until its parent process exits.
// NB: This call will block the calling process until the child
// process is finished.
pub fn (mut p Process) wait() &Process {
	if p.status == .not_started {
		p._spawn()
	}
	if p.status !in [.running, .stopped] {
		return p
	}
	p._wait()
	return p
}

//
// _spawn - should not be called directly, but only by p.run()/p.wait() .
// It encapsulates the fork/execve mechanism that allows the
// asynchronous starting of the new child process.
fn (mut p Process) _spawn() int {
	if !p.env_is_custom {
		p.env = []string{}
		current_environment := environ()
		for k, v in current_environment {
			p.env << '$k=$v'
		}
	}
	mut pid := 0
	$if windows {
		pid = p.win_spawn_process()
	} $else {
		pid = p.unix_spawn_process()
	}
	p.pid = pid
	p.status = .running
	return 0
}

// is_alive - query whether the process p.pid is still alive
pub fn (mut p Process) is_alive() bool {
	if p.status in [.running, .stopped] {
		return p._is_alive()
	}
	return false
}

//
pub fn (mut p Process) set_redirect_stdio() &Process {
	p.use_stdio_ctl = true
	return p
}

pub fn (mut p Process) stdin_write(s string) {
	p._check_redirection_call('stdin_write')
	fd_write(p.stdio_fd[0], s)
}

pub fn (mut p Process) stdout_slurp() string {
	p._check_redirection_call('stdout_slurp')
	return fd_slurp(p.stdio_fd[1]).join('')
}

pub fn (mut p Process) stderr_slurp() string {
	p._check_redirection_call('stderr_slurp')
	return fd_slurp(p.stdio_fd[2]).join('')
}

pub fn (mut p Process) stdout_read() string {
	p._check_redirection_call('stdout_read')
	s, _ := fd_read(p.stdio_fd[1], 4096)
	return s
}

pub fn (mut p Process) stderr_read() string {
	p._check_redirection_call('stderr_read')
	s, _ := fd_read(p.stdio_fd[2], 4096)
	return s
}

// _check_redirection_call - should be called just by stdxxx methods
fn (mut p Process) _check_redirection_call(fn_name string) {
	if !p.use_stdio_ctl {
		panic('Call p.set_redirect_stdio() before calling p.$fn_name')
	}
	if p.status == .not_started {
		panic('Call p.${fn_name}() after you have called p.run()')
	}
}

// _signal_stop - should not be called directly, except by p.signal_stop
fn (mut p Process) _signal_stop() {
	$if windows {
		p.win_stop_process()
	} $else {
		p.unix_stop_process()
	}
}

// _signal_continue - should not be called directly, just by p.signal_continue
fn (mut p Process) _signal_continue() {
	$if windows {
		p.win_resume_process()
	} $else {
		p.unix_resume_process()
	}
}

// _signal_kill - should not be called directly, except by p.signal_kill
fn (mut p Process) _signal_kill() {
	$if windows {
		p.win_kill_process()
	} $else {
		p.unix_kill_process()
	}
}

// _wait - should not be called directly, except by p.wait()
fn (mut p Process) _wait() {
	$if windows {
		p.win_wait()
	} $else {
		p.unix_wait()
	}
}

// _is_alive - should not be called directly, except by p.is_alive()
fn (mut p Process) _is_alive() bool {
	$if windows {
		return p.win_is_alive()
	} $else {
		return p.unix_is_alive()
	}
}
