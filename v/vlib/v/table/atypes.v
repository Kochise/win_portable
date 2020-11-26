// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
//
// Type layout information (32 bits)
// flag (8 bits) | nr_muls (8 bits) | idx (16 bits)
// pack: (int(flag)<<24) | (nr_muls<<16) | u16(idx)
// unpack:
// flag: (int(type)>>24) & 0xff
// nr_muls: (int(type)>>16) & 0xff
// idx:  u16(type) & 0xffff
module table

import strings

pub type Type = int

pub type TypeInfo = Aggregate | Alias | Array | ArrayFixed | Chan | Enum | FnType | GenericStructInst |
	Interface | Map | MultiReturn | Struct | SumType

pub enum Language {
	v
	c
	js
}

// Represents a type that only needs an identifier, e.g. int, array_int.
// A pointer type `&T` would have a TypeSymbol `T`.
// Note: For a Type, use Table.type_to_str(typ) not TypeSymbol.name.
// Each TypeSymbol is entered into `Table.types`.
// See also: Table.get_type_symbol.
pub struct TypeSymbol {
pub:
	parent_idx  int
pub mut:
	info        TypeInfo
	kind        Kind
	name        string // the internal name of the type or underlying type, i.e. `array_fixed_int_5`. See also .source_name below.
	source_name string // the original source name of the type, i.e. `[5]int`.
	methods     []Fn
	mod         string
	is_public   bool
	is_written  bool // set to true, when the backend definition for a symbol had been written, to avoid duplicates
}

// max of 8
pub enum TypeFlag {
	optional
	variadic
	generic
	shared_f
	atomic_f
}

/*
To save precious TypeFlag bits the 4 possible ShareTypes are coded in the two
	bits `shared` and `atomic_or_rw` (see sharetype_from_flags() below).
*/
pub enum ShareType {
	mut_t
	shared_t
	atomic_t
}

pub fn (t ShareType) str() string {
	match t {
		.mut_t { return 'mut' }
		.shared_t { return 'shared' }
		.atomic_t { return 'atomic' }
	}
}

// <atomic.h> defines special typenames
pub fn (t Type) atomic_typename() string {
	idx := t.idx()
	match idx {
		u32_type_idx { return 'atomic_uint' }
		int_type_idx { return 'atomic_int' }
		u64_type_idx { return 'atomic_ullong' }
		i64_type_idx { return 'atomic_llong' }
		else { return 'unknown_atomic' }
	}
}

pub fn sharetype_from_flags(is_shared, is_atomic bool) ShareType {
	return ShareType((int(is_atomic) << 1) | int(is_shared))
}

pub fn (t Type) share() ShareType {
	return sharetype_from_flags(t.has_flag(.shared_f), t.has_flag(.atomic_f))
}

pub fn (types []Type) contains(typ Type) bool {
	for t in types {
		if int(typ) == int(t) {
			return true
		}
	}
	return false
}

// return TypeSymbol idx for `t`
[inline]
pub fn (t Type) idx() int {
	return u16(t) & 0xffff
}

// return nr_muls for `t`
[inline]
pub fn (t Type) nr_muls() int {
	return (int(t) >> 16) & 0xff
}

// return true if `t` is a pointer (nr_muls>0)
[inline]
pub fn (t Type) is_ptr() bool {
	return (int(t) >> 16) & 0xff > 0
}

// set nr_muls on `t` and return it
[inline]
pub fn (t Type) set_nr_muls(nr_muls int) Type {
	if nr_muls < 0 || nr_muls > 255 {
		panic('set_nr_muls: nr_muls must be between 0 & 255')
	}
	return int(t) & 0xff00ffff | (nr_muls << 16)
}

// increments nr_nuls on `t` and return it
[inline]
pub fn (t Type) to_ptr() Type {
	nr_muls := (int(t) >> 16) & 0xff
	if nr_muls == 255 {
		panic('to_ptr: nr_muls is already at max of 255')
	}
	return int(t) & 0xff00ffff | ((nr_muls + 1) << 16)
}

// decrement nr_muls on `t` and return it
[inline]
pub fn (t Type) deref() Type {
	nr_muls := (int(t) >> 16) & 0xff
	if nr_muls == 0 {
		panic('deref: type `$t` is not a pointer')
	}
	return int(t) & 0xff00ffff | ((nr_muls - 1) << 16)
}

// set `flag` on `t` and return `t`
[inline]
pub fn (t Type) set_flag(flag TypeFlag) Type {
	return int(t) | (1 << (int(flag) + 24))
}

// clear `flag` on `t` and return `t`
[inline]
pub fn (t Type) clear_flag(flag TypeFlag) Type {
	return int(t) & ~(1 << (int(flag) + 24))
}

// clear all flags
[inline]
pub fn (t Type) clear_flags() Type {
	return int(t) & 0xffffff
}

// return true if `flag` is set on `t`
[inline]
pub fn (t Type) has_flag(flag TypeFlag) bool {
	return int(t) & (1 << (int(flag) + 24)) > 0
}

// copy flags & nr_muls from `t_from` to `t` and return `t`
[inline]
pub fn (t Type) derive(t_from Type) Type {
	return (0xffff0000 & t_from) | u16(t)
}

// return new type with TypeSymbol idx set to `idx`
[inline]
pub fn new_type(idx int) Type {
	if idx < 1 || idx > 65535 {
		panic('new_type: idx must be between 1 & 65535')
	}
	return idx
}

// return new type with TypeSymbol idx set to `idx` & nr_muls set to `nr_muls`
[inline]
pub fn new_type_ptr(idx, nr_muls int) Type {
	if idx < 1 || idx > 65535 {
		panic('new_type_ptr: idx must be between 1 & 65535')
	}
	if nr_muls < 0 || nr_muls > 255 {
		panic('new_type_ptr: nr_muls must be between 0 & 255')
	}
	return (nr_muls << 16) | u16(idx)
}

// built in pointers (voidptr, byteptr, charptr)
[inline]
pub fn (typ Type) is_pointer() bool {
	return typ.idx() in pointer_type_idxs
}

[inline]
pub fn (typ Type) is_float() bool {
	return typ.idx() in float_type_idxs
}

[inline]
pub fn (typ Type) is_int() bool {
	return typ.idx() in integer_type_idxs
}

[inline]
pub fn (typ Type) is_signed() bool {
	return typ.idx() in signed_integer_type_idxs
}

[inline]
pub fn (typ Type) is_unsigned() bool {
	return typ.idx() in unsigned_integer_type_idxs
}

[inline]
pub fn (typ Type) is_any_int() bool {
	return typ.idx() == any_int_type_idx
}

[inline]
pub fn (typ Type) is_number() bool {
	return typ.idx() in number_type_idxs
}

[inline]
pub fn (typ Type) is_string() bool {
	return typ.idx() in string_type_idxs
}

pub const (
	void_type_idx    = 1
	voidptr_type_idx = 2
	byteptr_type_idx = 3
	charptr_type_idx = 4
	i8_type_idx      = 5
	i16_type_idx     = 6
	int_type_idx     = 7
	i64_type_idx     = 8
	byte_type_idx    = 9
	u16_type_idx     = 10
	u32_type_idx     = 11
	u64_type_idx     = 12
	f32_type_idx     = 13
	f64_type_idx     = 14
	char_type_idx    = 15
	bool_type_idx    = 16
	none_type_idx    = 17
	string_type_idx  = 18
	ustring_type_idx = 19
	array_type_idx   = 20
	map_type_idx     = 21
	chan_type_idx    = 22
	sizet_type_idx   = 23
	rune_type_idx    = 24
	any_type_idx     = 25
	any_flt_type_idx = 26
	any_int_type_idx = 27
)

pub const (
	integer_type_idxs          = [i8_type_idx, i16_type_idx, int_type_idx, i64_type_idx, byte_type_idx,
		u16_type_idx, u32_type_idx, u64_type_idx, any_int_type_idx, rune_type_idx]
	signed_integer_type_idxs   = [i8_type_idx, i16_type_idx, int_type_idx, i64_type_idx]
	unsigned_integer_type_idxs = [byte_type_idx, u16_type_idx, u32_type_idx, u64_type_idx]
	float_type_idxs            = [f32_type_idx, f64_type_idx, any_flt_type_idx]
	number_type_idxs           = [i8_type_idx, i16_type_idx, int_type_idx, i64_type_idx, byte_type_idx,
		u16_type_idx, u32_type_idx, u64_type_idx, f32_type_idx, f64_type_idx, any_int_type_idx, any_flt_type_idx,
		rune_type_idx,
	]
	pointer_type_idxs          = [voidptr_type_idx, byteptr_type_idx, charptr_type_idx]
	string_type_idxs           = [string_type_idx, ustring_type_idx]
)

pub const (
	void_type    = new_type(void_type_idx)
	voidptr_type = new_type(voidptr_type_idx)
	byteptr_type = new_type(byteptr_type_idx)
	charptr_type = new_type(charptr_type_idx)
	i8_type      = new_type(i8_type_idx)
	int_type     = new_type(int_type_idx)
	i16_type     = new_type(i16_type_idx)
	i64_type     = new_type(i64_type_idx)
	byte_type    = new_type(byte_type_idx)
	u16_type     = new_type(u16_type_idx)
	u32_type     = new_type(u32_type_idx)
	u64_type     = new_type(u64_type_idx)
	f32_type     = new_type(f32_type_idx)
	f64_type     = new_type(f64_type_idx)
	char_type    = new_type(char_type_idx)
	bool_type    = new_type(bool_type_idx)
	none_type    = new_type(none_type_idx)
	string_type  = new_type(string_type_idx)
	ustring_type = new_type(ustring_type_idx)
	array_type   = new_type(array_type_idx)
	map_type     = new_type(map_type_idx)
	chan_type    = new_type(chan_type_idx)
	rune_type    = new_type(rune_type_idx)
	any_type     = new_type(any_type_idx)
	any_flt_type = new_type(any_flt_type_idx)
	any_int_type = new_type(any_int_type_idx)
)

pub const (
	builtin_type_names = ['void', 'voidptr', 'charptr', 'byteptr', 'i8', 'i16', 'int', 'i64', 'u16',
		'u32', 'u64', 'any_int', 'f32', 'f64', 'any_float', 'string', 'ustring', 'char', 'byte', 'bool',
		'none', 'array', 'array_fixed', 'map', 'chan', 'any', 'struct', 'mapnode', 'size_t', 'rune']
)

pub struct MultiReturn {
pub mut:
	types []Type
}

pub struct FnType {
pub:
	is_anon  bool
	has_decl bool
	func     Fn
}

pub enum Kind {
	placeholder
	void
	voidptr
	byteptr
	charptr
	i8
	i16
	int
	i64
	byte
	u16
	u32
	u64
	f32
	f64
	char
	size_t
	rune
	bool
	none_
	string
	ustring
	array
	array_fixed
	map
	chan
	any
	struct_
	generic_struct_inst
	multi_return
	sum_type
	alias
	enum_
	function
	interface_
	any_float
	any_int
	aggregate
}

pub fn (t &TypeSymbol) str() string {
	return t.name.replace('array_', '[]')
}

[inline]
pub fn (t &TypeSymbol) enum_info() Enum {
	match t.info {
		Enum { return *it }
		else { panic('TypeSymbol.enum_info(): no enum info for type: $t.name') }
	}
}

[inline]
pub fn (t &TypeSymbol) mr_info() MultiReturn {
	match t.info {
		MultiReturn { return *it }
		else { panic('TypeSymbol.mr_info(): no multi return info for type: $t.name') }
	}
}

[inline]
pub fn (t &TypeSymbol) array_info() Array {
	match t.info {
		Array { return *it }
		else { panic('TypeSymbol.array_info(): no array info for type: $t.name') }
	}
}

[inline]
pub fn (t &TypeSymbol) array_fixed_info() ArrayFixed {
	match t.info {
		ArrayFixed { return *it }
		else { panic('TypeSymbol.array_fixed(): no array fixed info for type: $t.name') }
	}
}

[inline]
pub fn (t &TypeSymbol) chan_info() Chan {
	match t.info {
		Chan { return *it }
		else { panic('TypeSymbol.chan_info(): no chan info for type: $t.name') }
	}
}

[inline]
pub fn (t &TypeSymbol) map_info() Map {
	match t.info {
		Map { return *it }
		else { panic('TypeSymbol.map_info(): no map info for type: $t.name') }
	}
}

[inline]
pub fn (t &TypeSymbol) struct_info() Struct {
	match t.info {
		Struct { return *it }
		else { panic('TypeSymbol.struct_info(): no struct info for type: $t.name') }
	}
}

/*
pub fn (t TypeSymbol) str() string {
	return t.name
}
*/
pub fn (mut t Table) register_builtin_type_symbols() {
	// reserve index 0 so nothing can go there
	// save index check, 0 will mean not found
	t.register_type_symbol({
		kind: .placeholder
		name: 'reserved_0'
	})
	t.register_type_symbol(TypeSymbol{
		kind: .void
		name: 'void'
		source_name: 'void'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .voidptr
		name: 'voidptr'
		source_name: 'voidptr'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .byteptr
		name: 'byteptr'
		source_name: 'byteptr'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .charptr
		name: 'charptr'
		source_name: 'charptr'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .i8
		name: 'i8'
		source_name: 'i8'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .i16
		name: 'i16'
		source_name: 'i16'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .int
		name: 'int'
		source_name: 'int'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .i64
		name: 'i64'
		source_name: 'i64'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .byte
		name: 'byte'
		source_name: 'byte'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .u16
		name: 'u16'
		source_name: 'u16'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .u32
		name: 'u32'
		source_name: 'u32'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .u64
		name: 'u64'
		source_name: 'u64'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .f32
		name: 'f32'
		source_name: 'f32'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .f64
		name: 'f64'
		source_name: 'f64'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .char
		name: 'char'
		source_name: 'char'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .bool
		name: 'bool'
		source_name: 'bool'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .none_
		name: 'none'
		source_name: 'none'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .string
		name: 'string'
		source_name: 'string'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .ustring
		name: 'ustring'
		source_name: 'ustring'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .array
		name: 'array'
		source_name: 'array'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .map
		name: 'map'
		source_name: 'map'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .chan
		name: 'chan'
		source_name: 'chan'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .size_t
		name: 'size_t'
		source_name: 'size_t'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .rune
		name: 'rune'
		source_name: 'rune'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .any
		name: 'any'
		source_name: 'any'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .any_float
		name: 'any_float'
		source_name: 'any_float'
		mod: 'builtin'
	})
	t.register_type_symbol({
		kind: .any_int
		name: 'any_int'
		source_name: 'any_int'
		mod: 'builtin'
	})
	// TODO: remove. for v1 map compatibility
	map_string_string_idx := t.find_or_register_map(string_type, string_type)
	map_string_int_idx := t.find_or_register_map(string_type, int_type)
	t.register_type_symbol({
		kind: .alias
		name: 'map_string'
		source_name: 'map_string'
		mod: 'builtin'
		parent_idx: map_string_string_idx
	})
	t.register_type_symbol({
		kind: .alias
		name: 'map_int'
		source_name: 'map_int'
		mod: 'builtin'
		parent_idx: map_string_int_idx
	})
}

[inline]
pub fn (t &TypeSymbol) is_pointer() bool {
	return t.kind in [.byteptr, .charptr, .voidptr]
}

[inline]
pub fn (t &TypeSymbol) is_int() bool {
	return t.kind in [.i8, .i16, .int, .i64, .byte, .u16, .u32, .u64, .any_int]
}

[inline]
pub fn (t &TypeSymbol) is_float() bool {
	return t.kind in [.f32, .f64, .any_float]
}

[inline]
pub fn (t &TypeSymbol) is_number() bool {
	return t.is_int() || t.is_float()
}

// for debugging/errors only, perf is not an issue
pub fn (k Kind) str() string {
	k_str := match k {
		.placeholder { 'placeholder' }
		.void { 'void' }
		.voidptr { 'voidptr' }
		.charptr { 'charptr' }
		.byteptr { 'byteptr' }
		.struct_ { 'struct' }
		.int { 'int' }
		.i8 { 'i8' }
		.i16 { 'i16' }
		.i64 { 'i64' }
		.byte { 'byte' }
		.u16 { 'u16' }
		.u32 { 'u32' }
		.u64 { 'u64' }
		.any_int { 'any_int' }
		.f32 { 'f32' }
		.f64 { 'f64' }
		.any_float { 'any_float' }
		.string { 'string' }
		.char { 'char' }
		.bool { 'bool' }
		.size_t { 'size_t' }
		.none_ { 'none' }
		.array { 'array' }
		.array_fixed { 'array_fixed' }
		.map { 'map' }
		.chan { 'chan' }
		.multi_return { 'multi_return' }
		.sum_type { 'sum_type' }
		.alias { 'alias' }
		.enum_ { 'enum' }
		.any { 'any' }
		.function { 'function' }
		.interface_ { 'interface' }
		.ustring { 'ustring' }
		.generic_struct_inst { 'generic_struct_inst' }
		.rune { 'rune' }
		.aggregate { 'aggregate' }
	}
	return k_str
}

pub fn (kinds []Kind) str() string {
	mut kinds_str := ''
	for i, k in kinds {
		kinds_str += k.str()
		if i < kinds.len - 1 {
			kinds_str += '_'
		}
	}
	return kinds_str
}

pub struct Struct {
pub mut:
	fields        []Field
	is_typedef    bool // C. [typedef]
	is_union      bool
	is_ref_only   bool
	generic_types []Type
}

// instantiation of a generic struct
pub struct GenericStructInst {
pub mut:
	parent_idx    int // idx of the base generic struct
	generic_types []Type
}

pub struct Interface {
pub mut:
	types []Type
}

pub struct Enum {
pub:
	vals             []string
	is_flag          bool
	is_multi_allowed bool
}

pub struct Alias {
pub:
	parent_type Type
	language    Language
}

pub struct Aggregate {
mut:
	fields []Field // used for faster lookup inside the module
pub:
	types  []Type
}

// NB: FExpr here is a actually an ast.Expr .
// It should always be used by casting to ast.Expr, using ast.fe2ex()/ast.ex2fe()
// That hack is needed to break an import cycle between v.ast and v.table .
pub type FExpr = byteptr | voidptr

pub struct Field {
pub:
	name             string
pub mut:
	typ              Type
	default_expr     FExpr
	has_default_expr bool
	default_val      string
	attrs            []Attr
	is_pub           bool
	is_mut           bool
	is_global        bool
}

fn (f &Field) equals(o &Field) bool {
	// TODO: should all of those be checked ?
	return f.name == o.name &&
		f.typ == o.typ && f.is_pub == o.is_pub && f.is_mut == o.is_mut && f.is_global == o.is_global
}

pub struct Array {
pub:
	nr_dims   int
pub mut:
	elem_type Type
}

pub struct ArrayFixed {
pub:
	nr_dims   int
	size      int
pub mut:
	elem_type Type
}

pub struct Chan {
pub mut:
	elem_type Type
	is_mut    bool
}

pub struct Map {
pub mut:
	key_type   Type
	value_type Type
}

pub struct SumType {
pub:
	variants []Type
}

pub fn (table &Table) type_to_str(t Type) string {
	sym := table.get_type_symbol(t)
	mut res := sym.source_name
	match sym.kind {
		.any_int, .i8, .i16, .int, .i64, .byte, .u16, .u32, .u64, .any_float, .f32, .f64, .char, .rune, .string, .bool, .none_, .byteptr, .voidptr, .charptr {
			// primitive types
			res = sym.kind.str()
		}
		.array {
			if t == array_type {
				return 'array'
			}
			info := sym.info as Array
			elem_str := table.type_to_str(info.elem_type)
			res = '[]$elem_str'
		}
		.array_fixed {
			info := sym.info as ArrayFixed
			elem_str := table.type_to_str(info.elem_type)
			res = '[$info.size]$elem_str'
		}
		.chan {
			// TODO currently the `chan` struct in builtin is not considered a struct but a chan
			if sym.mod != 'builtin' && sym.name != 'chan' {
				info := sym.info as Chan
				mut elem_type := info.elem_type
				mut mut_str := ''
				if info.is_mut {
					mut_str = 'mut '
					elem_type = elem_type.set_nr_muls(elem_type.nr_muls() - 1)
				}
				elem_str := table.type_to_str(elem_type)
				res = 'chan $mut_str$elem_str'
			}
		}
		.function {
			// do nothing, source_name is sufficient
		}
		.map {
			if int(t) == map_type_idx {
				return 'map'
			}
			info := sym.info as Map
			key_str := table.type_to_str(info.key_type)
			val_str := table.type_to_str(info.value_type)
			res = 'map[$key_str]$val_str'
		}
		.multi_return {
			res = '('
			info := sym.info as MultiReturn
			for i, typ in info.types {
				if i > 0 {
					res += ', '
				}
				res += table.type_to_str(typ)
			}
			res += ')'
			res = res
		}
		.void {
			if t.has_flag(.optional) {
				return '?'
			}
			return 'void'
		}
		else {
			// types defined by the user
			// mod.submod.submod2.Type => submod2.Type
			parts := res.split('.')
			res = if parts.len > 1 { parts[parts.len - 2..].join('.') } else { parts[0] }
			// cur_mod.Type => Type
			if res.starts_with(table.cmod_prefix) {
				res = res.replace_once(table.cmod_prefix, '')
			}
		}
	}
	nr_muls := t.nr_muls()
	if nr_muls > 0 {
		res = strings.repeat(`&`, nr_muls) + res
	}
	if t.has_flag(.optional) {
		res = '?' + res
	}
	return res
}

pub fn (t &Table) fn_to_str(func &Fn) string {
	mut sb := strings.new_builder(20)
	sb.write('${func.name}(')
	for i in 1 .. func.params.len {
		param := func.params[i]
		sb.write('$param.name')
		if i == func.params.len - 1 || func.params[i + 1].typ != param.typ {
			sb.write(' ${t.type_to_str(param.typ)}')
		}
		if i != func.params.len - 1 {
			sb.write(', ')
		}
	}
	sb.write(')')
	if func.return_type != void_type {
		sb.write(' ${t.type_to_str(func.return_type)}')
	}
	return sb.str()
}

pub fn (t &TypeSymbol) has_method(name string) bool {
	t.find_method(name) or {
		return false
	}
	return true
}

pub fn (t &TypeSymbol) find_method(name string) ?Fn {
	for method in t.methods {
		if method.name == name {
			return method
		}
	}
	return none
}

pub fn (t &TypeSymbol) str_method_info() (bool, bool, int) {
	mut has_str_method := false
	mut expects_ptr := false
	mut nr_args := 0
	if sym_str_method := t.find_method('str') {
		has_str_method = true
		nr_args = sym_str_method.params.len
		if nr_args > 0 {
			expects_ptr = sym_str_method.params[0].typ.is_ptr()
		}
	}
	return has_str_method, expects_ptr, nr_args
}

fn (a &Aggregate) find_field(name string) ?Field {
	for field in a.fields {
		if field.name == name {
			return field
		}
	}
	return none
}

pub fn (s Struct) find_field(name string) ?Field {
	for field in s.fields {
		if field.name == name {
			return field
		}
	}
	return none
}

pub fn (s Struct) get_field(name string) Field {
	if field := s.find_field(name) {
		return field
	}
	panic('unknown field `$name`')
}
