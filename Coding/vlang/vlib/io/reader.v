module io

// Reader represents a stream of data that can be read
pub interface Reader {
	// read reads up to buf.len bytes and places
	// them into buf.
	// A type that implements this should return
	// `none` on end of stream (EOF) instead of just returning 0
mut:
	read(mut buf []byte) ?int
}

const (
	read_all_len      = 10 * 1024
	read_all_grow_len = 1024
)

// ReadAllConfig allows options to be passed for the behaviour
// of read_all
pub struct ReadAllConfig {
	read_to_end_of_stream bool
mut:
	reader Reader
}

// read_all reads all bytes from a reader until either a 0 length read
// or if read_to_end_of_stream is true then the end of the stream (`none`)
pub fn read_all(config ReadAllConfig) ?[]byte {
	mut r := config.reader
	read_till_eof := config.read_to_end_of_stream

	mut b := []byte{len: io.read_all_len}
	mut read := 0
	for {
		new_read := r.read(mut b[read..]) or { break }
		read += new_read
		if !read_till_eof && read == 0 {
			break
		}
		if b.len == read {
			unsafe { b.grow_len(io.read_all_grow_len) }
		}
	}
	return b[..read]
}

// read_any reads any available bytes from a reader
// (until the reader returns a read of 0 length)
pub fn read_any(mut r Reader) ?[]byte {
	mut b := []byte{len: io.read_all_len}
	mut read := 0
	for {
		new_read := r.read(mut b[read..]) or { break }
		read += new_read
		if new_read == 0 {
			break
		}
		if b.len == read {
			unsafe { b.grow_len(io.read_all_grow_len) }
		}
	}
	return b[..read]
}

// RandomReader represents a stream of data that can be read from at a random location
pub interface RandomReader {
	read_from(pos u64, mut buf []byte) ?int
}
