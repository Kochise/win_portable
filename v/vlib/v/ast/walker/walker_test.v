import v.ast
import v.ast.walker
import v.parser
import v.table
import v.pref

fn parse_text(text string) ast.File {
	tbl := table.new_table()
	prefs := pref.new_preferences()
	scope := &ast.Scope{
		parent: 0
	}
	return parser.parse_text(text, '', tbl, .skip_comments, prefs, scope)
}

struct NodeByOffset {
	pos int
mut:
	node ast.Node
}

fn (mut n NodeByOffset) visit(node ast.Node) ? {
	node_pos := node.position()
	if n.pos >= node_pos.pos && n.pos <= node_pos.pos + node_pos.len && node !is ast.File {
		n.node = node
		return none
	}
	return
}

fn test_walk() {
	source := '
module main
struct Foo {
	name string
}
	'
	file := parse_text(source)
	mut nbo := NodeByOffset{
		pos: 13
	}
	walker.walk(nbo, file)
	assert nbo.node is ast.Stmt
	stmt := nbo.node as ast.Stmt
	assert stmt is ast.StructDecl
}

fn test_inspect() {
	source := '
module main
	'
	file := parse_text(source)
	walker.inspect(&file, voidptr(0), fn (node ast.Node, data voidptr) bool {
		// Second visit must be ast.Stmt
		if node is ast.Stmt {
			if node !is ast.Module {
				// Proceed to another node
				return false
			}
			assert node is ast.Module
			mod := node as ast.Module
			assert mod.name == 'main'
			return false
		}
		// First visit must be ast.File
		assert node is ast.File
		// True means that the inspector must now
		// inspect the ast.File's children
		return true
	})
}
