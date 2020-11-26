import big

fn test_new_big(){
	n := big.new()
	assert sizeof( big.Number ) == 128
	assert n.hexstr() == '0'
}

fn test_from_int(){
	assert big.from_int(255).hexstr() == 'ff'
	assert big.from_int(127).hexstr() == '7f'
	assert big.from_int(1024).hexstr() == '400'
	assert big.from_int(2147483647).hexstr() == '7fffffff'
	assert big.from_int(-1).hexstr() == 'ffffffffffffffff'
}

fn test_from_u64(){
	assert big.from_u64(255).hexstr() == 'ff'
	assert big.from_u64(127).hexstr() == '7f'
	assert big.from_u64(1024).hexstr() == '400'
	assert big.from_u64(4294967295).hexstr() == 'ffffffff'
	assert big.from_u64(4398046511104).hexstr() == '40000000000'
	assert big.from_u64(-1).hexstr() == 'ffffffffffffffff'
}

fn test_plus(){
	a := big.from_u64(2)
	b := big.from_u64(3)
	c := a + b
	assert c.hexstr() == '5'
	assert (big.from_u64(1024) + big.from_u64(1024)).hexstr() == '800'
}

fn test_minus(){
	a := big.from_u64(2)
	b := big.from_u64(3)
	c := b - a
	assert c.hexstr() == '1'
	e := big.from_u64(1024)
	ee := e - e
	assert ee.hexstr() == '0'
}

fn test_divide(){
	a := big.from_u64(2)
	b := big.from_u64(3)
	c := b / a
	assert c.hexstr() == '1'
	assert (b % a ).hexstr() == '1'
	e := big.from_u64(1024) // dec(1024) == hex(0x400)
	ee := e / e
	assert ee.hexstr() == '1'
	assert (e / a).hexstr() == '200'
	assert (e / (a*a)).hexstr() == '100'
}

fn test_multiply(){
	a := big.from_u64(2)
	b := big.from_u64(3)
	c := b * a
	assert c.hexstr() == '6'
	e := big.from_u64(1024)
	e2 := e * e
	e4 := e2 * e2
	e8 := e2 * e2 * e2 * e2
	e9 := e8 + big.from_u64(1)
	d  := ((e9 * e9) + b) * c
	assert e4.hexstr() == '10000000000'
	assert e8.hexstr() == '100000000000000000000'
	assert e9.hexstr() == '100000000000000000001'
	assert d.hexstr() == '60000000000000000000c00000000000000000018'
}

fn test_mod(){
	assert (big.from_u64(13) % big.from_u64(10) ).int() == 3
	assert (big.from_u64(13) % big.from_u64(9) ).int()  == 4
	assert (big.from_u64(7) % big.from_u64(5) ).int() == 2
}


fn test_factorial(){
	f5 := big.factorial( big.from_u64(5) )
	assert f5.hexstr() == '78'
	f100 := big.factorial( big.from_u64(100) )
	assert f100.hexstr() == '1b30964ec395dc24069528d54bbda40d16e966ef9a70eb21b5b2943a321cdf10391745570cca9420c6ecb3b72ed2ee8b02ea2735c61a000000000000000000000000'
}
