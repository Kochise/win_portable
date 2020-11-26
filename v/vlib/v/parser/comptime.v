// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module parser

import os
import v.ast
import v.pref
import v.table
import vweb.tmpl

// #flag darwin -I.
const (
	supported_platforms  = ['windows', 'macos', 'darwin', 'linux', 'freebsd', 'openbsd',
		'netbsd', 'dragonfly', 'android', 'js', 'solaris', 'haiku', 'linux_or_macos']
	supported_ccompilers = ['tinyc', 'clang', 'mingw', 'msvc', 'gcc']
)

// // #include, #flag, #v
fn (mut p Parser) hash() ast.HashStmt {
	mut val := p.tok.lit
	p.next()
	return ast.HashStmt{
		val: val
		mod: p.mod
		pos: p.prev_tok.position()
	}
}

fn (mut p Parser) vweb() ast.ComptimeCall {
	p.check(.dollar)
	p.check(.name) // skip `vweb.html()` TODO
	p.check(.dot)
	p.check(.name)
	p.check(.lpar)
	p.check(.rpar)
	// Compile vweb html template to V code, parse that V code and embed the resulting V function
	// that returns an html string.
	fn_path := p.cur_fn_name.split('_')
	html_name := '${fn_path.last()}.html'
	// Looking next to the vweb program
	dir := os.dir(p.scanner.file_path)
	mut path := os.join_path(dir, fn_path.join('/'))
	path += '.html'
	if !os.exists(path) {
		// can be in `templates/`
		path = os.join_path(dir, 'templates', fn_path.join('/'))
		path += '.html'
		if !os.exists(path) {
			p.error('vweb HTML template "$path" not found')
		}
		// println('path is now "$path"')
	}
	if p.pref.is_verbose {
		println('>>> compiling vweb HTML template "$path"')
	}
	v_code := tmpl.compile_file(path, p.cur_fn_name)
	mut scope := &ast.Scope{
		start_pos: 0
		parent: p.global_scope
	}
	mut file := parse_text(v_code, p.table, p.pref, scope, p.global_scope)
	if p.pref.is_verbose {
		println('\n\n')
		println('>>> vweb template for $path:')
		println(v_code)
		println('>>> end of vweb template END')
		println('\n\n')
	}
	file = {
		file |
		path: html_name
	}
	// copy vars from current fn scope into vweb_tmpl scope
	for stmt in file.stmts {
		if stmt is ast.FnDecl {
			if stmt.name == 'main.vweb_tmpl_$p.cur_fn_name' {
				mut tmpl_scope := file.scope.innermost(stmt.body_pos.pos)
				for _, obj in p.scope.objects {
					if obj is ast.Var {
						mut v := obj
						v.pos = stmt.body_pos
						tmpl_scope.register(v.name, *v)
						// set the controller action var to used
						// if its unused in the template it will warn
						v.is_used = true
					}
				}
				break
			}
		}
	}
	return ast.ComptimeCall{
		is_vweb: true
		vweb_tmpl: file
	}
}

fn (mut p Parser) comp_for() ast.CompFor {
	// p.comp_for() handles these special forms:
	// $for method in App(methods) {
	// $for field in App(fields) {
	p.next()
	p.check(.key_for)
	val_var := p.check_name()
	p.check(.key_in)
	lang := p.parse_language()
	typ := p.parse_any_type(lang, false, false)
	p.check(.dot)
	for_val := p.check_name()
	mut kind := ast.CompForKind.methods
	if for_val == 'methods' {
		p.scope.register(val_var, ast.Var{
			name: val_var
			typ: p.table.find_type_idx('FunctionData')
		})
	} else if for_val == 'fields' {
		p.scope.register(val_var, ast.Var{
			name: val_var
			typ: p.table.find_type_idx('FieldData')
		})
		kind = .fields
	} else {
		p.error('unknown kind `$for_val`, available are: `methods` or `fields`')
	}
	stmts := p.parse_block()
	return ast.CompFor{
		val_var: val_var
		stmts: stmts
		kind: kind
		typ: typ
	}
}

// TODO import warning bug
const (
	todo_delete_me = pref.OS.linux
)

fn os_from_string(os string) pref.OS {
	match os {
		'linux' {
			return .linux
		}
		'windows' {
			return .windows
		}
		'ios' {
			return .ios
		}
		'macos' {
			return .macos
		}
		'freebsd' {
			return .freebsd
		}
		'openbsd' {
			return .openbsd
		}
		'netbsd' {
			return .netbsd
		}
		'dragonfly' {
			return .dragonfly
		}
		'js' {
			return .js
		}
		'solaris' {
			return .solaris
		}
		'android' {
			return .android
		}
		'msvc' {
			// notice that `-os msvc` became `-cc msvc`
			verror('use the flag `-cc msvc` to build using msvc')
		}
		'haiku' {
			return .haiku
		}
		'linux_or_macos' {
			return .linux
		}
		else {
			panic('bad os $os')
		}
	}
	// println('bad os $os') // todo panic?
	return .linux
}

// `app.$action()` (`action` is a string)
// `typ` is `App` in this example
// fn (mut p Parser) comptime_method_call(typ table.Type) ast.ComptimeCall {
fn (mut p Parser) comptime_method_call(left ast.Expr) ast.ComptimeCall {
	p.check(.dollar)
	method_name := p.check_name()
	/*
	mut j := 0
	sym := p.table.get_type_symbol(typ)
	if sym.kind != .struct_ {
		p.error('not a struct')
	}
	// info := sym.info as table.Struct
	for method in sym.methods {
		if method.return_type != table.void_type {
			continue
		}
		/*
		receiver := method.args[0]
		if !p.expr_var.ptr {
			p.error('`$p.expr_var.name` needs to be a reference')
		}
		amp := if receiver.is_mut && !p.expr_var.ptr { '&' } else { '' }
		if j > 0 {
			p.gen(' else ')
		}
		p.genln('if (string_eq($method_name, _STR("$method.name")) ) ' + '${typ.name}_$method.name ($amp $p.expr_var.name);')
		*/
		j++
	}
	*/
	p.check(.lpar)
	mut args_var := ''
	if p.tok.kind == .name {
		args_var = p.tok.lit
		p.next()
	}
	p.check(.rpar)
	if p.tok.kind == .key_orelse {
		p.check(.key_orelse)
		// p.genln('else {')
		p.check(.lcbr)
		// p.statements()
	}
	return ast.ComptimeCall{
		left: left
		method_name: method_name
		args_var: args_var
	}
}
