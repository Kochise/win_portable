fn call<T>(v T) {
}

fn simple<T>(p T) T {
	return p
}

fn test_infer() {
	call(3)
	i := 4
	r := simple(i)
	assert r == 4
}

fn test_explicit_calls_should_also_work() {
	call<int>(2)
	assert true
	simple<int>(5)
	assert true
}

//
fn choose4<T>(a, b, c, d T) T {
	// NB: a similar construct is used in prime31's via engine
	return a
}

fn test_calling_generic_fn_with_many_params() {
	x := choose4(1, 2, 3, 4)
	assert x == 1
	y := choose4<string>('abc', 'xyz', 'def', 'ghi')
	assert y == 'abc'
}
