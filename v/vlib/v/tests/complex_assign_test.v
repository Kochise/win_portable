struct Object {
	name string
	value int
}

fn multireturner(n int, s string) (int, string) {
	return n + 1, s
}

fn test_assign_multi_expr_func() {
	e, f := if false {
		multireturner(-1, 'notawesome')
	} else if false {
		multireturner(-1, 'notawesome')
	} else {
		multireturner(17, 'awesomer')
	}
	assert e == 18
	assert f == 'awesomer'

	g, h := match true {
		true { multireturner(0, 'good') }
		false { multireturner(100, 'bad') }
		else { multireturner(200, 'bad') }
	}
	assert g == 1
	assert h == 'good'
}

fn test_assign_multi_expr() {
	// helpers
	val1 := 1
	val2 := 2

	// simple case for match
	a,b,c := match false {
		true { 1,2,3 }
		false { 4,5,6 }
		else { 7,8,9 }
	}
	assert a == 4
	assert b == 5
	assert c == 6

	// test with first value `literal`
	d, e, f := if true {
		1, 'awesome', [13]
	} else {
		0, 'bad', [0]
	}
	assert d == 1
	assert e == 'awesome'
	assert f == [13]

	// test with first value `literal expr` and statement
	awesome := 'awesome'
	g, h, i := if true {
		1 + val1, awesome, [13]
	} else {
		int(0), 'bad', [0]
	}
	assert g == 2
	assert h == 'awesome'
	assert i == [13]

	// test with first value `.name`
	j, k, l := if true {
		val1, 'awesome', [13]
	} else {
		val2, 'bad', [0]
	}
	assert j == 1
	assert k == 'awesome'
	assert l == [13]

	// test with first value name and peek != .comma
	m, n, o := if true {
		val1 + 1, val1, val1
	} else {
		val2, val2, val2
	}
	assert m == val1 + 1
	assert n == val1
	assert o == val1

	// test practical complex expressions
	val3 := Object { name: 'initial', value: 19 }
	mut q, mut r, mut s := if true {
		1 + 1, 'awe' + 'some', { val3 | name: 'ok' }
	} else {
		0, '0', Object {}
	}
	assert q == 2
	assert r == 'awesome'
	assert s.name == 'ok'
	assert s.value == 19

	// test assign to existing variables
	q, r, s = if false {
		0, '0', Object {}
	} else {
		5, '55', { val3 | value: 555 }
	}
	assert q == 5
	assert r == '55'
	assert s.value == 555
	assert s.name == 'initial'
}
