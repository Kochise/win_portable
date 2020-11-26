// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module util

import os
import v.pref
import v.vmod

pub const (
	v_version = '0.1.29'
)

// math.bits is needed by strconv.ftoa
pub const (
	builtin_module_parts = ['math.bits', 'strconv', 'strconv.ftoa', 'hash', 'strings', 'builtin']
)

pub const (
	external_module_dependencies_for_tool = {
		'vdoc': ['markdown']
	}
)

// vhash() returns the build string C.V_COMMIT_HASH . See cmd/tools/gen_vc.v .
pub fn vhash() string {
	mut buf := [50]byte{}
	buf[0] = 0
	unsafe {
		C.snprintf(charptr(buf), 50, '%s', C.V_COMMIT_HASH)
	}
	return tos_clone(buf)
}

pub fn full_hash() string {
	build_hash := vhash()
	current_hash := githash(false)
	if build_hash == current_hash {
		return build_hash
	}
	return '${build_hash}.$current_hash'
}

// full_v_version() returns the full version of the V compiler
pub fn full_v_version(is_verbose bool) string {
	if is_verbose {
		return 'V $v_version $full_hash()'
	}
	hash := githash(false)
	return 'V $v_version $hash'
}

// githash(x) returns the current git commit hash.
// When x is false, it is very fast - it just returns a predefined C constant.
// When x is true, it tries to get the current commit hash, by parsing the
// relevant files in the .git/ folder, or if that is not possible
// for example when using a V from a V binary release, that does not have .git/
// defaults to getting the predefined C constant again.
// NB: githash(true) must be called only when v detects that it builds itself.
// For all other programs, githash(false) should be used.
pub fn githash(should_get_from_filesystem bool) string {
	for {
		// The `for` construct here is used as a goto substitute.
		// The code in this function will break out of the `for`
		// if it detects an error and can not continue.
		if should_get_from_filesystem {
			vexe := os.getenv('VEXE')
			vroot := os.dir(vexe)
			// .git/HEAD
			git_head_file := os.join_path(vroot, '.git', 'HEAD')
			if !os.exists(git_head_file) {
				break
			}
			// 'ref: refs/heads/master' ... the current branch name
			head_content := os.read_file(git_head_file) or {
				break
			}
			mut current_branch_hash := head_content
			if head_content.starts_with('ref: ') {
				gcbranch_rel_path := head_content.replace('ref: ', '').trim_space()
				gcbranch_file := os.join_path(vroot, '.git', gcbranch_rel_path)
				// .git/refs/heads/master
				if !os.exists(gcbranch_file) {
					break
				}
				// get the full commit hash contained in the ref heads file
				branch_hash := os.read_file(gcbranch_file) or {
					break
				}
				current_branch_hash = branch_hash
			}
			desired_hash_length := 7
			if current_branch_hash.len > desired_hash_length {
				return current_branch_hash[0..desired_hash_length]
			}
		}
		break
	}
	mut buf := [50]byte{}
	buf[0] = 0
	unsafe {
		C.snprintf(charptr(buf), 50, '%s', C.V_CURRENT_COMMIT_HASH)
	}
	return tos_clone(buf)
}

//
pub fn set_vroot_folder(vroot_path string) {
	// Preparation for the compiler module:
	// VEXE env variable is needed so that compiler.vexe_path()
	// can return it later to whoever needs it:
	vname := if os.user_os() == 'windows' { 'v.exe' } else { 'v' }
	os.setenv('VEXE', os.real_path(os.join_path(vroot_path, vname)), true)
	os.setenv('VCHILD', 'true', true)
}

pub fn resolve_vroot(str, dir string) ?string {
	mut mcache := vmod.get_cache()
	vmod_file_location := mcache.get_by_folder(dir)
	if vmod_file_location.vmod_file.len == 0 {
		// There was no actual v.mod file found.
		return error('To use @VROOT, you need to have a "v.mod" file in $dir, or in one of its parent folders.')
	}
	vmod_path := vmod_file_location.vmod_folder
	return str.replace('@VROOT', os.real_path(vmod_path))
}

pub fn launch_tool(is_verbose bool, tool_name string, args []string) {
	vexe := pref.vexe_path()
	vroot := os.dir(vexe)
	set_vroot_folder(vroot)
	tool_args := args_quote_paths_with_spaces(args)
	tool_exe := path_of_executable(os.real_path('$vroot/cmd/tools/$tool_name'))
	tool_source := os.real_path('$vroot/cmd/tools/${tool_name}.v')
	tool_command := '"$tool_exe" $tool_args'
	if is_verbose {
		println('launch_tool vexe        : $vroot')
		println('launch_tool vroot       : $vroot')
		println('launch_tool tool_args   : $tool_args')
		println('launch_tool tool_command: $tool_command')
	}
	// TODO Caching should be done on the `vlib/v` level.
	mut should_compile := false
	if !os.exists(tool_exe) {
		should_compile = true
	} else {
		if os.file_last_mod_unix(tool_exe) <= os.file_last_mod_unix(vexe) {
			// v was recompiled, maybe after v up ...
			// rebuild the tool too just in case
			should_compile = true
			if tool_name == 'vself' || tool_name == 'vup' {
				// The purpose of vself/up is to update and recompile v itself.
				// After the first 'v self' execution, v will be modified, so
				// then a second 'v self' will detect, that v is newer than the
				// vself executable, and try to recompile vself/up again, which
				// will slow down the next v recompilation needlessly.
				should_compile = false
			}
		}
		if os.file_last_mod_unix(tool_exe) <= os.file_last_mod_unix(tool_source) {
			// the user changed the source code of the tool, or git updated it:
			should_compile = true
		}
	}
	if is_verbose {
		println('launch_tool should_compile: $should_compile')
	}
	if should_compile {
		emodules := external_module_dependencies_for_tool[tool_name]
		for emodule in emodules {
			check_module_is_installed(emodule, is_verbose) or {
				panic(err)
			}
		}
		mut compilation_command := '"$vexe" '
		compilation_command += '"$tool_source"'
		if is_verbose {
			println('Compiling $tool_name with: "$compilation_command"')
		}
		tool_compilation := os.exec(compilation_command) or {
			panic(err)
		}
		if tool_compilation.exit_code != 0 {
			mut err := 'Permission denied'
			if !tool_compilation.output.contains(err) {
				err = '\n$tool_compilation.output'
			}
			eprintln('cannot compile `$tool_source`: $err')
			exit(1)
		}
	}
	if is_verbose {
		println('launch_tool running tool command: $tool_command ...')
	}
	exit(os.system(tool_command))
}

pub fn quote_path_with_spaces(s string) string {
	if s.contains(' ') {
		return '"$s"'
	}
	return s
}

pub fn args_quote_paths_with_spaces(args []string) string {
	mut res := []string{}
	for a in args {
		res << quote_path_with_spaces(a)
	}
	return res.join(' ')
}

pub fn path_of_executable(path string) string {
	$if windows {
		return path + '.exe'
	}
	return path
}

pub fn read_file(file_path string) ?string {
	mut raw_text := os.read_file(file_path) or {
		return error('failed to open $file_path')
	}
	// BOM check
	if raw_text.len >= 3 {
		unsafe {
			c_text := raw_text.str
			if c_text[0] == 0xEF && c_text[1] == 0xBB && c_text[2] == 0xBF {
				// skip three BOM bytes
				offset_from_begin := 3
				raw_text = tos(c_text[offset_from_begin], vstrlen(c_text) - offset_from_begin)
			}
		}
	}
	return raw_text
}

[inline]
pub fn imin(a, b int) int {
	return if a < b {
		a
	} else {
		b
	}
}

[inline]
pub fn imax(a, b int) int {
	return if a > b {
		a
	} else {
		b
	}
}

pub fn replace_op(s string) string {
	last_char := s[s.len - 1]
	suffix := match last_char {
		`+` { '_plus' }
		`-` { '_minus' }
		`*` { '_mult' }
		`/` { '_div' }
		`%` { '_mod' }
		else { '' }
	}
	return s[..s.len - 1] + suffix
}

pub fn join_env_vflags_and_os_args() []string {
	vosargs := os.getenv('VOSARGS')
	if vosargs != '' {
		return non_empty(vosargs.split(' '))
	}
	mut args := []string{}
	vflags := os.getenv('VFLAGS')
	if vflags != '' {
		args << os.args[0]
		args << vflags.split(' ')
		if os.args.len > 1 {
			args << os.args[1..]
		}
		return non_empty(args)
	}
	return non_empty(os.args)
}

fn non_empty(arg []string) []string {
	return arg.filter(it != '')
}

pub fn check_module_is_installed(modulename string, is_verbose bool) ?bool {
	mpath := os.join_path(os.home_dir(), '.vmodules', modulename)
	mod_v_file := os.join_path(mpath, 'v.mod')
	murl := 'https://github.com/vlang/$modulename'
	if is_verbose {
		eprintln('check_module_is_installed: mpath: $mpath')
		eprintln('check_module_is_installed: mod_v_file: $mod_v_file')
		eprintln('check_module_is_installed: murl: $murl')
	}
	if os.exists(mod_v_file) {
		vexe := pref.vexe_path()
		update_cmd := '"$vexe" update "$modulename"'
		if is_verbose {
			eprintln('check_module_is_installed: updating with $update_cmd ...')
		}
		update_res := os.exec(update_cmd) or {
			return error('can not start $update_cmd, error: $err')
		}
		if update_res.exit_code != 0 {
			eprintln('Warning: `$modulename` exists, but is not updated.
V will continue, since updates can fail due to temporary network problems,
and the existing module `$modulename` may still work.')
			if is_verbose {
				eprintln('Details:')
				eprintln(update_res.output)
			}
			eprintln('-'.repeat(50))
		}
		return true
	}
	if is_verbose {
		eprintln('check_module_is_installed: cloning from $murl ...')
	}
	cloning_res := os.exec('git clone $murl $mpath') or {
		return error('git is not installed, error: $err')
	}
	if cloning_res.exit_code != 0 {
		return error('cloning failed, details: $cloning_res.output')
	}
	if !os.exists(mod_v_file) {
		return error('even after cloning, $mod_v_file is still missing')
	}
	if is_verbose {
		eprintln('check_module_is_installed: done')
	}
	return true
}

pub fn ensure_modules_for_all_tools_are_installed(is_verbose bool) {
	for tool_name, tool_modules in external_module_dependencies_for_tool {
		if is_verbose {
			eprintln('Installing modules for tool: $tool_name ...')
		}
		for emodule in tool_modules {
			check_module_is_installed(emodule, is_verbose) or {
				panic(err)
			}
		}
	}
}

pub fn strip_mod_name(name string) string {
	return name.all_after_last('.')
}

pub fn strip_main_name(name string) string {
	return name.replace('main.', '')
}

pub fn no_dots(s string) string {
	return s.replace('.', '__')
}

const (
	map_prefix = 'map[string]'
)

// no_cur_mod - removes cur_mod. prefix from typename,
// but *only* when it is at the start, i.e.:
// no_cur_mod('vproto.Abdcdef', 'proto') == 'vproto.Abdcdef'
// even though proto. is a substring
pub fn no_cur_mod(typename, cur_mod string) string {
	mut res := typename
	mod_prefix := cur_mod + '.'
	has_map_prefix := res.starts_with(map_prefix)
	if has_map_prefix {
		res = res.replace_once(map_prefix, '')
	}
	no_symbols := res.trim_left('&[]')
	should_shorten := no_symbols.starts_with(mod_prefix)
	if should_shorten {
		res = res.replace_once(mod_prefix, '')
	}
	if has_map_prefix {
		res = map_prefix + res
	}
	return res
}
