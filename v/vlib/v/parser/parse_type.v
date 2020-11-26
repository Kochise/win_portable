// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module parser

import v.table

pub fn (mut p Parser) parse_array_type() table.Type {
	p.check(.lsbr)
	// fixed array
	if p.tok.kind == .number {
		size := p.tok.lit.int()
		p.next()
		p.check(.rsbr)
		elem_type := p.parse_type()
		// sym := p.table.get_type_symbol(elem_type)
		idx := p.table.find_or_register_array_fixed(elem_type, size, 1)
		return table.new_type(idx)
	}
	// array
	p.check(.rsbr)
	elem_type := p.parse_type()
	mut nr_dims := 1
	// detect attr
	not_attr := p.peek_tok.kind != .name && p.peek_tok2.kind !in [.semicolon, .rsbr]
	for p.tok.kind == .lsbr && not_attr {
		p.next()
		p.check(.rsbr)
		nr_dims++
	}
	sym := p.table.get_type_symbol(elem_type)
	idx := p.table.find_or_register_array(elem_type, nr_dims, sym.mod)
	return table.new_type(idx)
}

pub fn (mut p Parser) parse_map_type() table.Type {
	p.next()
	if p.tok.kind != .lsbr {
		return table.map_type
	}
	p.check(.lsbr)
	key_type := p.parse_type()
	// key_type_sym := p.get_type_symbol(key_type)
	// if key_type_sym.kind != .string {
	if key_type.idx() != table.string_type_idx {
		p.error('maps can only have string keys for now')
	}
	p.check(.rsbr)
	value_type := p.parse_type()
	idx := p.table.find_or_register_map(key_type, value_type)
	return table.new_type(idx)
}

pub fn (mut p Parser) parse_chan_type() table.Type {
	if p.peek_tok.kind != .name && p.peek_tok.kind != .key_mut && p.peek_tok.kind != .amp {
		p.next()
		return table.chan_type
	}
	p.register_auto_import('sync')
	p.next()
	is_mut := p.tok.kind == .key_mut
	elem_type := p.parse_type()
	idx := p.table.find_or_register_chan(elem_type, is_mut)
	return table.new_type(idx)
}

pub fn (mut p Parser) parse_multi_return_type() table.Type {
	p.check(.lpar)
	mut mr_types := []table.Type{}
	for {
		mr_type := p.parse_type()
		mr_types << mr_type
		if p.tok.kind == .comma {
			p.next()
		} else {
			break
		}
	}
	p.check(.rpar)
	idx := p.table.find_or_register_multi_return(mr_types)
	return table.new_type(idx)
}

// given anon name based off signature when `name` is blank
pub fn (mut p Parser) parse_fn_type(name string) table.Type {
	// p.warn('parse fn')
	p.check(.key_fn)
	line_nr := p.tok.line_nr
	args, _, is_variadic := p.fn_args()
	mut return_type := table.void_type
	if p.tok.line_nr == line_nr && p.tok.kind.is_start_of_type() {
		return_type = p.parse_type()
	}
	ret_type_sym := p.table.get_type_symbol(return_type)
	func := table.Fn{
		name: name
		params: args
		is_variadic: is_variadic
		return_type: return_type
		return_type_source_name: ret_type_sym.source_name
	}
	idx := p.table.find_or_register_fn_type(p.mod, func, false, false)
	return table.new_type(idx)
}

pub fn (mut p Parser) parse_type_with_mut(is_mut bool) table.Type {
	typ := p.parse_type()
	if is_mut {
		return typ.set_nr_muls(1)
	}
	return typ
}

// Parses any language indicators on a type.
pub fn (mut p Parser) parse_language() table.Language {
	language := if p.tok.lit == 'C' {
		table.Language.c
	} else if p.tok.lit == 'JS' {
		table.Language.js
	} else {
		table.Language.v
	}
	if language != .v {
		p.next()
		p.check(.dot)
	}
	return language
}

pub fn (mut p Parser) parse_type() table.Type {
	// optional
	mut is_optional := false
	if p.tok.kind == .question {
		line_nr := p.tok.line_nr
		p.next()
		is_optional = true
		if p.tok.line_nr > line_nr {
			mut typ := table.void_type
			if is_optional {
				typ = typ.set_flag(.optional)
			}
			return typ
		}
	}
	is_shared := p.tok.kind == .key_shared
	is_atomic := p.tok.kind == .key_atomic
	mut nr_muls := 0
	if p.tok.kind == .key_mut || is_shared || is_atomic {
		nr_muls++
		p.next()
	}
	if p.tok.kind == .mul {
		p.error('use `&Type` instead of `*Type` when declaring references')
	}
	mut nr_amps := 0
	// &Type
	for p.tok.kind == .amp {
		nr_amps++
		nr_muls++
		p.next()
	}
	language := p.parse_language()
	mut typ := table.void_type
	is_array := p.tok.kind == .lsbr
	if p.tok.kind != .lcbr {
		pos := p.tok.position()
		typ = p.parse_any_type(language, nr_muls > 0, true)
		if typ == table.void_type {
			p.error_with_pos('use `?` instead of `?void`', pos)
		}
	}
	if is_optional {
		typ = typ.set_flag(.optional)
	}
	if is_shared {
		typ = typ.set_flag(.shared_f)
	}
	if is_atomic {
		typ = typ.set_flag(.atomic_f)
	}
	if nr_muls > 0 {
		typ = typ.set_nr_muls(nr_muls)
		if is_array && nr_amps > 0 {
			p.error('V arrays are already references behind the scenes,
there is no need to use a reference to an array (e.g. use `[]string` instead of `&[]string`).
If you need to modify an array in a function, use a mutable argument instead: `fn foo(mut s []string) {}`.')
		}
	}
	return typ
}

pub fn (mut p Parser) parse_any_type(language table.Language, is_ptr, check_dot bool) table.Type {
	mut name := p.tok.lit
	if language == .c {
		name = 'C.$name'
	} else if language == .js {
		name = 'JS.$name'
	} else if p.peek_tok.kind == .dot && check_dot {
		// `module.Type`
		// /if !(p.tok.lit in p.table.imports) {
		if !p.known_import(name) {
			println(p.table.imports)
			p.error('unknown module `$p.tok.lit`')
		}
		if p.tok.lit in p.imports {
			p.register_used_import(p.tok.lit)
		}
		p.next()
		p.check(.dot)
		// prefix with full module
		name = '${p.imports[name]}.$p.tok.lit'
		if !p.tok.lit[0].is_capital() {
			p.error('imported types must start with a capital letter')
		}
	} else if p.expr_mod != '' {
		name = p.expr_mod + '.' + name
	} else if p.mod != 'builtin' && name.len > 1 && name !in p.table.type_idxs {
		// `Foo` in module `mod` means `mod.Foo`
		name = p.mod + '.' + name
	}
	// p.warn('get type $name')
	match p.tok.kind {
		.key_fn {
			// func
			return p.parse_fn_type('')
		}
		.lsbr {
			// array
			return p.parse_array_type()
		}
		.lpar {
			// multiple return
			if is_ptr {
				p.error('parse_type: unexpected `&` before multiple returns')
			}
			return p.parse_multi_return_type()
		}
		else {
			// no defer
			if name == 'map' {
				return p.parse_map_type()
			}
			if name == 'chan' {
				return p.parse_chan_type()
			}
			defer {
				p.next()
			}
			if name == '' {
				// This means the developer is using some wrong syntax like `x: int` instead of `x int`
				p.error('bad type syntax')
			}
			match name {
				'voidptr' {
					return table.voidptr_type
				}
				'byteptr' {
					return table.byteptr_type
				}
				'charptr' {
					return table.charptr_type
				}
				'i8' {
					return table.i8_type
				}
				'i16' {
					return table.i16_type
				}
				'int' {
					return table.int_type
				}
				'i64' {
					return table.i64_type
				}
				'byte' {
					return table.byte_type
				}
				'u16' {
					return table.u16_type
				}
				'u32' {
					return table.u32_type
				}
				'u64' {
					return table.u64_type
				}
				'f32' {
					return table.f32_type
				}
				'f64' {
					return table.f64_type
				}
				'string' {
					return table.string_type
				}
				'char' {
					return table.char_type
				}
				'bool' {
					return table.bool_type
				}
				else {
					if name.len == 1 && name[0].is_capital() {
						return p.parse_generic_template_type(name)
					}
					if p.peek_tok.kind == .lt {
						return p.parse_generic_struct_inst_type(name)
					}
					return p.parse_enum_or_struct_type(name)
				}
			}
		}
	}
}

pub fn (mut p Parser) parse_enum_or_struct_type(name string) table.Type {
	// struct / enum / placeholder
	// struct / enum
	mut idx := p.table.find_type_idx(name)
	if idx > 0 {
		return table.new_type(idx)
	}
	// not found - add placeholder
	idx = p.table.add_placeholder_type(name)
	// println('NOT FOUND: $name - adding placeholder - $idx')
	return table.new_type(idx)
}

pub fn (mut p Parser) parse_generic_template_type(name string) table.Type {
	mut idx := p.table.find_type_idx(name)
	if idx > 0 {
		return table.new_type(idx).set_flag(.generic)
	}
	idx = p.table.register_type_symbol(table.TypeSymbol{
		name: name
		source_name: name
		mod: p.mod
		kind: .any
		is_public: true
	})
	return table.new_type(idx).set_flag(.generic)
}

pub fn (mut p Parser) parse_generic_struct_inst_type(name string) table.Type {
	mut bs_name := name
	p.next()
	bs_name += '<'
	mut generic_types := []table.Type{}
	mut is_instance := false
	for {
		gt := p.parse_type()
		if !gt.has_flag(.generic) {
			is_instance = true
		}
		gts := p.table.get_type_symbol(gt)
		bs_name += gts.name
		generic_types << gt
		if p.tok.kind != .comma {
			break
		}
		p.next()
		bs_name += ','
	}
	p.check(.gt)
	bs_name += '>'
	if is_instance && generic_types.len > 0 {
		mut gt_idx := p.table.find_type_idx(bs_name)
		if gt_idx > 0 {
			return table.new_type(gt_idx)
		}
		gt_idx = p.table.add_placeholder_type(bs_name)
		idx := p.table.register_type_symbol(table.TypeSymbol{
			kind: .generic_struct_inst
			name: bs_name
			source_name: bs_name
			mod: p.mod
			info: table.GenericStructInst{
				parent_idx: p.table.type_idxs[name]
				generic_types: generic_types
			}
		})
		return table.new_type(idx)
	}
	return p.parse_enum_or_struct_type(name)
}
