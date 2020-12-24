// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module parser

import v.ast
import v.table

fn (mut p Parser) sql_expr() ast.Expr {
	// `sql db {`
	pos := p.tok.position()
	p.check_name()
	db_expr := p.expr(0)
	p.check(.lcbr)
	p.check(.key_select)
	n := p.check_name()
	is_count := n == 'count'
	mut typ := table.void_type
	if is_count {
		p.check_name() // from
		typ = table.int_type
	}
	table_type := p.parse_type() // `User`
	mut where_expr := ast.Expr{}
	has_where := p.tok.kind == .name && p.tok.lit == 'where'
	mut query_one := false // one object is returned, not an array
	if has_where {
		p.next()
		where_expr = p.expr(0)
		// `id == x` means that a single object is returned
		if !is_count && where_expr is ast.InfixExpr {
			e := where_expr as ast.InfixExpr
			if e.op == .eq && e.left is ast.Ident {
				ident := e.left as ast.Ident
				if ident.name == 'id' {
					query_one = true
				}
			}
		}
	}
	mut has_limit := false
	mut limit_expr := ast.Expr{}
	mut has_offset := false
	mut offset_expr := ast.Expr{}
	mut has_order := false
	mut order_expr := ast.Expr{}
	mut has_desc := false
	if p.tok.kind == .name && p.tok.lit == 'order' {
		p.check_name() // `order`
		order_pos := p.tok.position()
		if p.tok.kind == .name && p.tok.lit == 'by' {
			p.check_name() // `by`
		} else {
			p.error_with_pos('use `order by` in ORM queries', order_pos)
			return ast.Expr{}
		}
		has_order = true
		order_expr = p.expr(0)
		if p.tok.kind == .name && p.tok.lit == 'desc' {
			p.check_name() // `desc`
			has_desc = true
		}
	}
	if p.tok.kind == .name && p.tok.lit == 'limit' {
		// `limit 1` means that a single object is returned
		p.check_name() // `limit`
		if p.tok.kind == .number && p.tok.lit == '1' {
			query_one = true
		}
		has_limit = true
		limit_expr = p.expr(0)
	}
	if p.tok.kind == .name && p.tok.lit == 'offset' {
		p.check_name() // `offset`
		has_offset = true
		offset_expr = p.expr(0)
	}
	if !query_one && !is_count {
		// return an array
		typ = table.new_type(p.table.find_or_register_array(table_type, 1))
	} else if !is_count {
		// return a single object
		// TODO optional
		// typ = table_type.set_flag(.optional)
		typ = table_type
	}
	p.check(.rcbr)
	return ast.SqlExpr{
		is_count: is_count
		typ: typ
		db_expr: db_expr
		table_type: table_type
		where_expr: where_expr
		has_where: has_where
		has_limit: has_limit
		limit_expr: limit_expr
		has_offset: has_offset
		offset_expr: offset_expr
		has_order: has_order
		order_expr: order_expr
		has_desc: has_desc
		is_array: !query_one
		pos: pos
	}
}

// insert user into User
// update User set nr_oders=nr_orders+1 where id == user_id
fn (mut p Parser) sql_stmt() ast.SqlStmt {
	pos := p.tok.position()
	p.inside_match = true
	defer {
		p.inside_match = false
	}
	// `sql db {`
	p.check_name()
	db_expr := p.expr(0)
	// println(typeof(db_expr))
	p.check(.lcbr)
	// kind := ast.SqlExprKind.select_
	//
	mut n := p.check_name() // insert
	mut kind := ast.SqlStmtKind.insert
	if n == 'delete' {
		kind = .delete
	} else if n == 'update' {
		kind = .update
	}
	mut inserted_var_name := ''
	mut table_name := ''
	if kind != .delete {
		expr := p.expr(0)
		match expr {
			ast.Ident {
				if kind == .insert {
					inserted_var_name = expr.name
				} else if kind == .update {
					table_name = expr.name
				}
			}
			else {
				p.error('can only insert variables')
				return ast.SqlStmt{}
			}
		}
	}
	n = p.check_name() // into
	mut updated_columns := []string{}
	mut update_exprs := []ast.Expr{cap: 5}
	if kind == .insert && n != 'into' {
		p.error('expecting `into`')
		return ast.SqlStmt{}
	} else if kind == .update {
		if n != 'set' {
			p.error('expecting `set`')
			return ast.SqlStmt{}
		}
		for {
			column := p.check_name()
			updated_columns << column
			p.check(.assign)
			update_exprs << p.expr(0)
			if p.tok.kind == .comma {
				p.check(.comma)
			} else {
				break
			}
		}
	} else if kind == .delete && n != 'from' {
		p.error('expecting `from`')
		return ast.SqlStmt{}
	}
	mut table_type := table.Type(0)
	mut where_expr := ast.Expr{}
	if kind == .insert {
		table_type = p.parse_type() // `User`
		sym := p.table.get_type_symbol(table_type)
		// info := sym.info as table.Struct
		// fields := info.fields.filter(it.typ in [table.string_type, table.int_type, table.bool_type])
		table_name = sym.name
	} else if kind == .update {
		if !p.pref.is_fmt {
			// NB: in vfmt mode, v parses just a single file and table_name may not have been registered
			idx := p.table.find_type_idx(p.prepend_mod(table_name))
			table_type = table.new_type(idx)
		}
		p.check_sql_keyword('where') or { return ast.SqlStmt{} }
		where_expr = p.expr(0)
	} else if kind == .delete {
		table_type = p.parse_type()
		sym := p.table.get_type_symbol(table_type)
		table_name = sym.name
		p.check_sql_keyword('where') or { return ast.SqlStmt{} }
		where_expr = p.expr(0)
	}
	p.check(.rcbr)
	return ast.SqlStmt{
		db_expr: db_expr
		table_name: table_name
		table_type: table_type
		object_var_name: inserted_var_name
		pos: pos
		updated_columns: updated_columns
		update_exprs: update_exprs
		kind: kind
		where_expr: where_expr
	}
}

fn (mut p Parser) check_sql_keyword(name string) ?bool {
	if p.check_name() != name {
		p.error('orm: expecting `$name`')
		return none
	}
	return true
}
