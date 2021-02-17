// Copyright (c) 2019-2021 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module parser

import v.ast
import v.table

fn (mut p Parser) assign_stmt() ast.Stmt {
	exprs, comments := p.expr_list()
	return p.partial_assign_stmt(exprs, comments)
}

fn (mut p Parser) check_undefined_variables(exprs []ast.Expr, val ast.Expr) ? {
	match val {
		ast.Ident {
			for expr in exprs {
				if expr is ast.Ident {
					if expr.name == val.name {
						p.error_with_pos('undefined variable: `$val.name`', val.pos)
						return error('undefined variable: `$val.name`')
					}
				}
			}
		}
		ast.InfixExpr {
			p.check_undefined_variables(exprs, val.left) ?
			p.check_undefined_variables(exprs, val.right) ?
		}
		ast.ParExpr {
			p.check_undefined_variables(exprs, val.expr) ?
		}
		ast.PostfixExpr {
			p.check_undefined_variables(exprs, val.expr) ?
		}
		ast.PrefixExpr {
			p.check_undefined_variables(exprs, val.right) ?
		}
		ast.StringInterLiteral {
			for expr_ in val.exprs {
				p.check_undefined_variables(exprs, expr_) ?
			}
		}
		else {}
	}
}

fn (mut p Parser) check_cross_variables(exprs []ast.Expr, val ast.Expr) bool {
	val_ := val
	match val_ {
		ast.Ident {
			for expr in exprs {
				if expr is ast.Ident {
					if expr.name == val_.name {
						return true
					}
				}
			}
		}
		ast.IndexExpr {
			for expr in exprs {
				if expr.str() == val.str() {
					return true
				}
			}
		}
		ast.InfixExpr {
			return p.check_cross_variables(exprs, val_.left) || p.check_cross_variables(exprs, val_.right)
		}
		ast.PrefixExpr {
			return p.check_cross_variables(exprs, val_.right)
		}
		ast.PostfixExpr {
			return p.check_cross_variables(exprs, val_.expr)
		}
		ast.SelectorExpr {
			for expr in exprs {
				if expr.str() == val.str() {
					return true
				}
			}
		}
		else {}
	}
	return false
}

fn (mut p Parser) partial_assign_stmt(left []ast.Expr, left_comments []ast.Comment) ast.Stmt {
	p.is_stmt_ident = false
	op := p.tok.kind
	mut pos := p.tok.position()
	p.next()
	mut comments := []ast.Comment{cap: 2 * left_comments.len + 1}
	comments << left_comments
	comments << p.eat_comments()
	mut right_comments := []ast.Comment{}
	mut right := []ast.Expr{cap: left.len}
	if p.tok.kind == .key_go {
		stmt := p.stmt(false)
		go_stmt := stmt as ast.GoStmt
		right << ast.GoExpr{
			go_stmt: go_stmt
			pos: go_stmt.pos
		}
	} else {
		right, right_comments = p.expr_list()
	}
	comments << right_comments
	end_comments := p.eat_line_end_comments()
	mut has_cross_var := false
	if op == .decl_assign {
		// a, b := a + 1, b
		for r in right {
			p.check_undefined_variables(left, r)
		}
	} else if left.len > 1 {
		// a, b = b, a
		for r in right {
			has_cross_var = p.check_cross_variables(left, r)
			if op !in [.assign, .decl_assign] {
				p.error_with_pos('unexpected $op.str(), expecting := or = or comma', pos)
				return ast.Stmt{}
			}
			if has_cross_var {
				break
			}
		}
	}
	mut is_static := false
	for i, lx in left {
		match mut lx {
			ast.Ident {
				if op == .decl_assign {
					if p.scope.known_var(lx.name) {
						p.error_with_pos('redefinition of `$lx.name`', lx.pos)
						return ast.Stmt{}
					}
					mut share := table.ShareType(0)
					if lx.info is ast.IdentVar {
						iv := lx.info as ast.IdentVar
						share = iv.share
						if iv.is_static {
							if !p.pref.translated {
								p.error_with_pos('static variables are supported only in -translated mode',
									lx.pos)
								return ast.Stmt{}
							}
							is_static = true
						}
					}
					r0 := right[0]
					mut v := ast.Var{
						name: lx.name
						expr: if left.len == right.len { right[i] } else { ast.Expr{} }
						share: share
						is_mut: lx.is_mut || p.inside_for
						pos: lx.pos
					}
					if p.pref.autofree {
						if r0 is ast.CallExpr {
							// Set correct variable position (after the or block)
							// so that autofree doesn't free it in cgen before
							// it's declared. (`Or` variables are declared after the or block).
							if r0.or_block.pos.pos > 0 && r0.or_block.stmts.len > 0 {
								v.is_or = true
								// v.pos = r0.or_block.pos.
							}
						}
					}
					obj := ast.ScopeObject(v)
					lx.obj = obj
					p.scope.register(obj)
				}
			}
			ast.IndexExpr {
				if op == .decl_assign {
					p.error_with_pos('non-name `$lx.left[$lx.index]` on left side of `:=`',
						lx.pos)
					return ast.Stmt{}
				}
				lx.is_setter = true
			}
			ast.ParExpr {}
			ast.PrefixExpr {}
			ast.SelectorExpr {
				if op == .decl_assign {
					p.error_with_pos('struct fields can only be declared during the initialization',
						lx.pos)
					return ast.Stmt{}
				}
			}
			else {
				// TODO: parexpr ( check vars)
				// else { p.error_with_pos('unexpected `${typeof(lx)}`', lx.position()) }
			}
		}
	}
	pos.update_last_line(p.prev_tok.line_nr)
	return ast.AssignStmt{
		op: op
		left: left
		right: right
		comments: comments
		end_comments: end_comments
		pos: pos
		has_cross_var: has_cross_var
		is_simple: p.inside_for && p.tok.kind == .lcbr
		is_static: is_static
	}
}
