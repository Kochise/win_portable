fn test_fixed_array_can_be_assigned() {
	x := 2.32
	mut v := [8]f64{}
	assert v[1] == 0
	v = [1.0, x, 3.0,4.0,5.0,6.0,7.0,8.0]!!
	assert v[1] == x
	v[1] = 2.0
	for i, e in v {
		assert e == i + 1
	}
	v = [8]f64{}
	assert v[1] == 0
	// test slicing
	for e in v[0..v.len] {
		assert e == 0
	}
	v = [8]f64{init: 3.0}
	assert v[1] == 3.0
}

fn test_fixed_array_can_be_used_in_declaration() {
	x := 2.32
	v := [1.0, x, 3.0,4.0,5.0,6.0,7.0,8.0]!!
	assert v.len == 8
	assert v[1] == x
}


struct Context {
	pub mut:
	vb [8]f64
}

fn test_fixed_array_can_be_assigned_to_a_struct_field() {
	mut ctx := Context{}
	assert ctx.vb.len == 8
	x := 2.32
	ctx.vb = [1.1, x, 3.3, 4.4, 5.0, 6.0, 7.0, 8.9]!!
	assert ctx.vb[1] == x
	assert ctx.vb[7] == 8.9
	for i, e in ctx.vb {
		assert e == ctx.vb[i]
	}
	assert ctx.vb == ctx.vb
	/*
	println( ctx.vb[0] )
	println( ctx.vb[1] )
	println( ctx.vb[2] )
	println( ctx.vb[3] )
	*/
}
