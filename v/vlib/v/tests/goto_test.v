fn test_goto() {
	mut i := 0
	a: b := 1
	_ = b
	i++
	if i < 3 {
		goto a
	}
	assert i == 3
}
