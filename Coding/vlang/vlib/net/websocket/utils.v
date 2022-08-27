module websocket

import rand
import crypto.sha1
import encoding.base64

// htonl64 converts payload length to header bits
fn htonl64(payload_len u64) []u8 {
	mut ret := []u8{len: 8}
	ret[0] = u8(((payload_len & (u64(0xff) << 56)) >> 56) & 0xff)
	ret[1] = u8(((payload_len & (u64(0xff) << 48)) >> 48) & 0xff)
	ret[2] = u8(((payload_len & (u64(0xff) << 40)) >> 40) & 0xff)
	ret[3] = u8(((payload_len & (u64(0xff) << 32)) >> 32) & 0xff)
	ret[4] = u8(((payload_len & (u64(0xff) << 24)) >> 24) & 0xff)
	ret[5] = u8(((payload_len & (u64(0xff) << 16)) >> 16) & 0xff)
	ret[6] = u8(((payload_len & (u64(0xff) << 8)) >> 8) & 0xff)
	ret[7] = u8(((payload_len & (u64(0xff) << 0)) >> 0) & 0xff)
	return ret
}

// create_masking_key returs a new masking key to use when masking websocket messages
fn create_masking_key() []u8 {
	mask_bit := rand.u8()
	buf := []u8{len: 4, init: `0`}
	unsafe { C.memcpy(buf.data, &mask_bit, 4) }
	return buf
}

// create_key_challenge_response creates a key challange response from security key
fn create_key_challenge_response(seckey string) ?string {
	if seckey.len == 0 {
		return error('unexpected seckey lengt zero')
	}
	guid := '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
	sha1buf := seckey + guid
	shabytes := sha1buf.bytes()
	hash := sha1.sum(shabytes)
	b64 := base64.encode(hash)
	unsafe {
		hash.free()
		shabytes.free()
	}
	return b64
}

// get_nonce creates a randomized array used in handshake process
fn get_nonce(nonce_size int) string {
	mut nonce := []u8{len: nonce_size, cap: nonce_size}
	alphanum := '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz'
	for i in 0 .. nonce_size {
		nonce[i] = alphanum[rand.intn(alphanum.len) or { 0 }]
	}
	return unsafe { tos(nonce.data, nonce.len) }.clone()
}
