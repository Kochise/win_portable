// Copyright (c) 2019-2021 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license that can be found in the LICENSE file.
module gen

import v.ast
import v.util
import v.table

fn (mut g Gen) write_str_fn_definitions() {
	// _STR function can't be defined in vlib
	g.writeln("
void _STR_PRINT_ARG(const char *fmt, char** refbufp, int *nbytes, int *memsize, int guess, ...) {
	va_list args;
	va_start(args, guess);
	// NB: (*memsize - *nbytes) === how much free space is left at the end of the current buffer refbufp
	// *memsize === total length of the buffer refbufp
	// *nbytes === already occupied bytes of buffer refbufp
	// guess === how many bytes were taken during the current vsnprintf run
	for(;;) {
		if (guess < *memsize - *nbytes) {
			guess = vsnprintf(*refbufp + *nbytes, *memsize - *nbytes, fmt, args);
			if (guess < *memsize - *nbytes) { // result did fit into buffer
				*nbytes += guess;
				break;
			}
		}
		// increase buffer (somewhat exponentially)
		*memsize += (*memsize + *memsize) / 3 + guess;
		*refbufp = (char*)realloc((void*)*refbufp, *memsize);
	}
	va_end(args);
}

string _STR(const char *fmt, int nfmts, ...) {
	va_list argptr;
	int memsize = 128;
	int nbytes = 0;
	char* buf = (char*)malloc(memsize);
	va_start(argptr, nfmts);
	for (int i=0; i<nfmts; ++i) {
		int k = strlen(fmt);
		bool is_fspec = false;
		for (int j=0; j<k; ++j) {
			if (fmt[j] == '%') {
				j++;
				if (fmt[j] != '%') {
					is_fspec = true;
					break;
				}
			}
		}
		if (is_fspec) {
			char f = fmt[k-1];
			char fup = f & 0xdf; // toupper
			bool l = fmt[k-2] == 'l';
			bool ll = l && fmt[k-3] == 'l';
			if (f == 'u' || fup == 'X' || f == 'o' || f == 'd' || f == 'c') { // int...
				if (ll) _STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k+16, va_arg(argptr, long long));
				else if (l) _STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k+10, va_arg(argptr, long));
				else _STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k+8, va_arg(argptr, int));
			} else if (fup >= 'E' && fup <= 'G') { // floating point
				_STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k+10, va_arg(argptr, double));
			} else if (f == 'p') {
				_STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k+14, va_arg(argptr, void*));
			} else if (f == 's') { // v string
				string s = va_arg(argptr, string);
				if (fmt[k-4] == '*') { // %*.*s
					int fwidth = va_arg(argptr, int);
					if (fwidth < 0)
						fwidth -= (s.len - utf8_str_visible_length(s));
					else
						fwidth += (s.len - utf8_str_visible_length(s));
					_STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k+s.len-4, fwidth, s.len, s.str);
				} else { // %.*s
					_STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k+s.len-4, s.len, s.str);
				}
			} else {
				//v_panic(tos3('Invaid format specifier'));
			}
		} else {
			_STR_PRINT_ARG(fmt, &buf, &nbytes, &memsize, k);
		}
		fmt += k+1;
	}
	va_end(argptr);
	buf[nbytes] = 0;
	buf = (char*)realloc((void*)buf, nbytes+1);
#ifdef DEBUG_ALLOC
	//puts('_STR:');
	puts(buf);
#endif
#if _VAUTOFREE
	//g_cur_str = (byteptr)buf;
#endif
	return tos2((byteptr)buf);
}

string _STR_TMP(const char *fmt, ...) {
	va_list argptr;
	va_start(argptr, fmt);
	size_t len = vsnprintf(0, 0, fmt, argptr) + 1;
	va_end(argptr);
	va_start(argptr, fmt);
	vsprintf((char *)g_str_buf, fmt, argptr);
	va_end(argptr);

#ifdef DEBUG_ALLOC
	//puts('_STR_TMP:');
	//puts(g_str_buf);
#endif
	string res = tos(g_str_buf,  len);
	res.is_lit = 1;
	return res;

} // endof _STR_TMP

")
}

fn (mut g Gen) string_literal(node ast.StringLiteral) {
	if node.is_raw {
		escaped_val := util.smart_quote(node.val, true)
		g.write('_SLIT("$escaped_val")')
		return
	}
	escaped_val := util.smart_quote(node.val, false)
	if g.is_c_call || node.language == .c {
		// In C calls we have to generate C strings
		// `C.printf("hi")` => `printf("hi");`
		g.write('"$escaped_val"')
	} else {
		// TODO calculate the literal's length in V, it's a bit tricky with all the
		// escape characters.
		// Clang and GCC optimize `strlen("lorem ipsum")` to `11`
		// g.write('tos4("$escaped_val", strlen("$escaped_val"))')
		// g.write('tos4("$escaped_val", $it.val.len)')
		// g.write('_SLIT("$escaped_val")')
		g.write('_SLIT("$escaped_val")')
	}
}

// optimize string interpolation in string builders:
// `sb.writeln('a=$a')` =>
// `sb.writeln('a='); sb.writeln(a.str())`
fn (mut g Gen) string_inter_literal_sb_optimized(call_expr ast.CallExpr) {
	node := call_expr.args[0].expr as ast.StringInterLiteral
	// sb_name := g.cur_call_expr.left
	// g.go_before_stmt(0)
	g.writeln('// sb inter opt')
	is_nl := call_expr.name == 'writeln'
	// println('optimize sb $call_expr.name')
	for i, val in node.vals {
		escaped_val := util.smart_quote(val, false)
		// if val == '' {
		// break
		// continue
		// }
		g.write('strings__Builder_write(&')
		g.expr(call_expr.left)
		g.write(', _SLIT("')
		g.write(escaped_val)
		g.writeln('"));')
		//
		if i >= node.exprs.len {
			break
		}
		// if node.expr_types.len <= i || node.exprs.len <= i {
		// continue
		// }
		if is_nl && i == node.exprs.len - 1 {
			g.write('strings__Builder_writeln(&')
		} else {
			g.write('strings__Builder_write(&')
		}
		g.expr(call_expr.left)
		g.write(', ')
		typ := node.expr_types[i]
		g.write(g.typ(typ))
		g.write('_str(')
		sym := g.table.get_type_symbol(typ)
		if sym.kind != .function {
			g.expr(node.exprs[i])
		}
		g.writeln('));')
	}
	g.writeln('')
	// println(node.vals)
	return
}

fn (mut g Gen) string_inter_literal(node ast.StringInterLiteral) {
	g.write('_STR("')
	// Build the string with %
	mut end_string := false
	for i, val in node.vals {
		mut escaped_val := val.replace_each(['%', '%%'])
		escaped_val = util.smart_quote(escaped_val, false)
		if i >= node.exprs.len {
			if escaped_val.len > 0 {
				end_string = true
				g.write('\\000')
				g.write(escaped_val)
			}
			break
		}
		g.write(escaped_val)
		typ := g.unwrap_generic(node.expr_types[i])
		// write correct format specifier to intermediate string
		g.write('%')
		fspec := node.fmts[i]
		mut fmt := if node.pluss[i] { '+' } else { '' }
		if node.fills[i] && node.fwidths[i] >= 0 {
			fmt = '${fmt}0'
		}
		if node.fwidths[i] != 0 {
			fmt = '$fmt${node.fwidths[i]}'
		}
		if node.precisions[i] != 987698 {
			fmt = '${fmt}.${node.precisions[i]}'
		}
		if fspec == `s` {
			if node.fwidths[i] == 0 {
				g.write('.*s')
			} else {
				g.write('*.*s')
			}
		} else if typ.is_float() {
			g.write('$fmt${fspec:c}')
		} else if typ.is_pointer() {
			if fspec == `p` {
				g.write('${fmt}p')
			} else {
				g.write('$fmt"PRI${fspec:c}PTR"')
			}
		} else if typ.is_int() {
			if fspec == `c` {
				g.write('${fmt}c')
			} else {
				g.write('$fmt"PRI${fspec:c}')
				if typ in [table.i8_type, table.byte_type] {
					g.write('8')
				} else if typ in [table.i16_type, table.u16_type] {
					g.write('16')
				} else if typ in [table.i64_type, table.u64_type] {
					g.write('64')
				} else {
					g.write('32')
				}
				g.write('"')
			}
		} else {
			// TODO: better check this case
			g.write('$fmt"PRId32"')
		}
		if i < node.exprs.len - 1 {
			g.write('\\000')
		}
	}
	num_string_parts := if end_string { node.exprs.len + 1 } else { node.exprs.len }
	g.write('", $num_string_parts, ')
	// Build args
	for i, expr in node.exprs {
		typ := g.unwrap_generic(node.expr_types[i])
		if typ == table.string_type {
			if g.inside_vweb_tmpl {
				g.write('vweb__filter(')
				g.expr(expr)
				g.write(')')
			} else {
				g.expr(expr)
			}
		} else if node.fmts[i] == `s` || typ.has_flag(.variadic) {
			g.gen_expr_to_string(expr, typ)
		} else if typ.is_number() || typ.is_pointer() || node.fmts[i] == `d` {
			if typ.is_signed() && node.fmts[i] in [`x`, `X`, `o`] {
				// convert to unsigned first befors C's integer propagation strikes
				if typ == table.i8_type {
					g.write('(byte)(')
				} else if typ == table.i16_type {
					g.write('(u16)(')
				} else if typ == table.int_type {
					g.write('(u32)(')
				} else {
					g.write('(u64)(')
				}
				g.expr(expr)
				g.write(')')
			} else {
				g.expr(expr)
			}
		} else {
			g.expr(expr)
		}
		if node.fmts[i] == `s` && node.fwidths[i] != 0 {
			g.write(', ${node.fwidths[i]}')
		}
		if i < node.exprs.len - 1 {
			g.write(', ')
		}
	}
	g.write(')')
}

fn (mut g Gen) gen_expr_to_string(expr ast.Expr, etype table.Type) {
	mut typ := etype
	mut sym := g.table.get_type_symbol(typ)
	// when type is alias, print the aliased value
	if mut sym.info is table.Alias {
		parent_sym := g.table.get_type_symbol(sym.info.parent_type)
		if parent_sym.has_method('str') {
			typ = sym.info.parent_type
			sym = parent_sym
		}
	}
	sym_has_str_method, str_method_expects_ptr, _ := sym.str_method_info()
	if typ.has_flag(.variadic) {
		str_fn_name := g.gen_str_for_type(typ)
		g.write('${str_fn_name}(')
		g.expr(expr)
		g.write(')')
	} else if typ == table.string_type {
		g.expr(expr)
	} else if typ == table.bool_type {
		g.expr(expr)
		g.write(' ? _SLIT("true") : _SLIT("false")')
	} else if sym.kind == .none_ {
		g.write('_SLIT("none")')
	} else if sym.kind == .enum_ {
		is_var := match expr {
			ast.SelectorExpr, ast.Ident { true }
			else { false }
		}
		if is_var {
			str_fn_name := g.gen_str_for_type(typ)
			g.write('${str_fn_name}(')
			g.enum_expr(expr)
			g.write(')')
		} else {
			g.write('_SLIT("')
			g.enum_expr(expr)
			g.write('")')
		}
	} else if sym_has_str_method || sym.kind in
		[.array, .array_fixed, .map, .struct_, .multi_return, .sum_type, .interface_]
	{
		is_ptr := typ.is_ptr()
		str_fn_name := g.gen_str_for_type(typ)
		if is_ptr {
			g.write('_STR("&%.*s\\000", 2, ')
		}
		g.write('${str_fn_name}(')
		if str_method_expects_ptr && !is_ptr {
			g.write('&')
		} else if !str_method_expects_ptr && is_ptr {
			g.write('*')
		}
		if expr is ast.ArrayInit {
			if expr.is_fixed {
				s := g.typ(expr.typ)
				g.write('($s)')
			}
		}
		g.expr(expr)
		g.write(')')
		if is_ptr {
			g.write(')')
		}
	} else {
		str_fn_name := g.gen_str_for_type(typ)
		g.write('${str_fn_name}(')
		if sym.kind != .function {
			g.expr(expr)
		}
		g.write(')')
	}
}
