import sqlite

struct Parent {
	id      int      [primary; sql: serial]
	name    string
	chields []Chield [fkey: 'parent_id']
}

struct Chield {
	id        int    [primary; sql: serial]
	parent_id int
	name      string
}

fn test_orm_array() {
	mut db := sqlite.connect(':memory:') or { panic(err) }
	sql db {
		create table Parent
	}

	par := Parent{
		name: 'test'
		chields: [
			Chield{
				name: 'abc'
			},
			Chield{
				name: 'def'
			},
		]
	}

	sql db {
		insert par into Parent
	}

	parent := sql db {
		select from Parent where id == 1
	}

	sql db {
		drop table Parent
	}

	assert parent.name == par.name
	assert parent.chields.len == par.chields.len
	assert parent.chields[0].name == 'abc'
	assert parent.chields[1].name == 'def'
}
