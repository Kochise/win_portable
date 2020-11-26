module picohttpparser

pub struct Response {
	fd int
pub:
	date byteptr
	buf_start byteptr
pub mut:
	buf byteptr
}

[inline]
fn (mut r Response) write_str(s string) {
	unsafe {
		C.memcpy(r.buf, s.str, s.len)
		r.buf += s.len
	}
}

[inline]
pub fn (mut r Response) http_ok() &Response {
	r.write_str("HTTP/1.1 200 OK\r\n")
	return r
}

[inline]
pub fn (mut r Response) header(k, v string) &Response {
	r.write_str(k)
	r.write_str(": ")
	r.write_str(v)
	r.write_str("\r\n")
	return r
}

[inline]
pub fn (mut r Response) header_date() &Response {
	r.write_str("Date: ")
	unsafe {
		r.buf += cpy(r.buf, r.date, 29)
	}
	r.write_str("\r\n")
	return r
}

[inline]
pub fn (mut r Response) header_server() &Response {
	r.write_str("Server: V\r\n")
	return r
}

[inline]
pub fn (mut r Response) content_type(s string) &Response {
	r.write_str("Content-Type: ")
	r.write_str(s)
	r.write_str("\r\n")
	return r
}

[inline]
pub fn (mut r Response) html() &Response {
	r.write_str("Content-Type: text/html\r\n")
	return r
}

[inline]
pub fn (mut r Response) plain() &Response {
	r.write_str("Content-Type: text/plain\r\n")
	return r
}

[inline]
pub fn (mut r Response) json() &Response {
	r.write_str("Content-Type: application/json\r\n")
	return r
}

[inline]
pub fn (mut r Response) body(body string) {
	r.write_str("Content-Length: ")
	unsafe {
		r.buf += C.u64toa(r.buf, body.len)
	}
	r.write_str("\r\n\r\n")
	r.write_str(body)
}

[inline]
pub fn (mut r Response) http_404() {
	r.write_str('HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n')
}

[inline]
pub fn (mut r Response) http_405() {
	r.write_str('HTTP/1.1 405 Method Not Allowed\r\nContent-Length: 0\r\n\r\n')
}

[inline]
pub fn (mut r Response) http_500() {
	r.write_str('HTTP/1.1 500 Internal Server Error\r\nContent-Length: 0\r\n\r\n')
}

[inline]
pub fn (mut r Response) raw(response string) {
	r.write_str(response)
}

[inline]
pub fn (mut r Response) end() int {
	n := int(r.buf) - int(r.buf_start)
	if C.write(r.fd, r.buf_start, n) != n {
		return -1
	}
	return n
}
