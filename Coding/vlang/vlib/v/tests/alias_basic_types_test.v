type MyByte = byte

type MyInt = int

type MyString = string

fn ok() {
	assert true
}

// bytes
fn test_byte_aliasing() {
	dump(byte(123))
	dump(MyByte(byte(123)))
	dump(byte(MyByte(byte(123))))
	ok()
}

fn test_pbyte_aliasing() {
	unsafe {
		dump(voidptr(&byte(123)))
		dump(voidptr(&MyByte(&byte(123))))
		dump(voidptr(&byte(&MyByte(&byte(123)))))
	}
	ok()
}

// ints
fn test_int_aliasing() {
	dump(int(123))
	dump(int(MyInt(123)))
	dump(MyInt(int(MyInt(123))))
	ok()
}

fn test_pint_aliasing() {
	unsafe {
		dump(voidptr(&int(123456)))
		dump(voidptr(&MyInt(&int(123456))))
		dump(voidptr(&int(&MyInt(&int(123456)))))
	}
	ok()
}

// strings
fn test_string_aliasing() {
	$if msvc {
		eprintln('> TODO: msvc errors out for casting a `string` to a `string`')
	}
	$if !msvc {
		dump(string('abc'))
		dump(string(MyString('abc')))
		dump(MyString(string(MyString('abc'))))
	}
	ok()
}

fn test_pstring_aliasing() {
	s := 'abc'
	unsafe {
		dump(voidptr(&string(&s)))
		dump(voidptr(&string(&MyString(&s))))
		dump(voidptr(&MyString(&string(&MyString(&s)))))
	}
	ok()
}
