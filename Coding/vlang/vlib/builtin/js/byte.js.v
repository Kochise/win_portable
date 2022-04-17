module builtin

pub fn (b byte) is_space() bool {
	mut result := false
	#result.val = /^\s*$/.test(String.fromCharCode(b))

	return result
}

pub fn (c byte) str() string {
	res := ''
	#res.str = c.val.toString()

	return res
}

pub fn (c byte) ascii_str() string {
	res := ''
	#res.str = String.fromCharCode(c.val)

	return res
}

pub fn (c byte) repeat(count int) string {
	mut res := ''
	for _ in 0 .. count {
		res += c.ascii_str()
	}

	return res
}

[inline]
pub fn (c byte) is_digit() bool {
	return c >= `0` && c <= `9`
}

// is_hex_digit returns `true` if the byte is either in range 0-9, a-f or A-F and `false` otherwise.
// Example: assert byte(`F`) == true
[inline]
pub fn (c byte) is_hex_digit() bool {
	return (c >= `0` && c <= `9`) || (c >= `a` && c <= `f`) || (c >= `A` && c <= `F`)
}

// is_oct_digit returns `true` if the byte is in range 0-7 and `false` otherwise.
// Example: assert byte(`7`) == true
[inline]
pub fn (c byte) is_oct_digit() bool {
	return c >= `0` && c <= `7`
}

// is_bin_digit returns `true` if the byte is a binary digit (0 or 1) and `false` otherwise.
// Example: assert byte(`0`) == true
[inline]
pub fn (c byte) is_bin_digit() bool {
	return c == `0` || c == `1`
}

// is_letter returns `true` if the byte is in range a-z or A-Z and `false` otherwise.
// Example: assert byte(`V`) == true
[inline]
pub fn (c byte) is_letter() bool {
	return (c >= `a` && c <= `z`) || (c >= `A` && c <= `Z`)
}

// is_alnum returns `true` if the byte is in range a-z, A-Z, 0-9 and `false` otherwise.
// Example: assert byte(`V`) == true
[inline]
pub fn (c byte) is_alnum() bool {
	return (c >= `a` && c <= `z`) || (c >= `A` && c <= `Z`) || (c >= `0` && c <= `9`)
}

// is_capital returns `true`, if the byte is a Latin capital letter.
// Example: assert `H`.is_capital() == true
// Example: assert `h`.is_capital() == false
[inline]
pub fn (c byte) is_capital() bool {
	return c >= `A` && c <= `Z`
}

// str_escaped returns the contents of `byte` as an escaped `string`.
// Example: assert byte(0).str_escaped() == r'`\0`'

pub fn (b byte) str_escaped() string {
	mut str := ''
	match b {
		0 { str = r'`\0`' }
		7 { str = r'`\a`' }
		8 { str = r'`\b`' }
		9 { str = r'`\t`' }
		10 { str = r'`\n`' }
		11 { str = r'`\v`' }
		12 { str = r'`\f`' }
		13 { str = r'`\r`' }
		27 { str = r'`\e`' }
		32...126 { str = b.ascii_str() }
		else { str = '0x' + b.hex() }
	}
	return str
}
