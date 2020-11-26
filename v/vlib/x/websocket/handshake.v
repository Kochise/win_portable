module websocket

import encoding.base64
import strings

// handshake manage the handshake part of connecting
fn (mut ws Client) handshake() ? {
	nonce := get_nonce(ws.nonce_size)
	seckey := base64.encode(nonce)
	// handshake := 'GET $ws.uri.resource$ws.uri.querystring HTTP/1.1\r\nHost: $ws.uri.hostname:$ws.uri.port\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: $seckey\r\nSec-WebSocket-Version: 13\r\n\r\n'
	mut sb := strings.new_builder(1024)
	// todo, remove when autofree
	defer {
		sb.free()
	}
	sb.write('GET ')
	sb.write(ws.uri.resource)
	sb.write(ws.uri.querystring)
	sb.write(' HTTP/1.1\r\nHost: ')
	sb.write(ws.uri.hostname)
	sb.write(':')
	sb.write(ws.uri.port)
	sb.write('\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n')
	sb.write('Sec-WebSocket-Key: ')
	sb.write(seckey)
	sb.write('\r\nSec-WebSocket-Version: 13\r\n\r\n')
	// handshake := 'GET $ws.uri.resource$ws.uri.querystring HTTP/1.1\r\nHost: $ws.uri.hostname:$ws.uri.port\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: $seckey\r\nSec-WebSocket-Version: 13\r\n\r\n'
	handshake := sb.str()
	defer {
		handshake.free()
	}
	handshake_bytes := handshake.bytes()
	ws.debug_log('sending handshake: $handshake')
	ws.socket_write(handshake_bytes)?
	ws.read_handshake(seckey)?
	unsafe {
		handshake_bytes.free()
	}
}

// handshake manage the handshake part of connecting
fn (mut s Server) handle_server_handshake(mut c Client) ?(string, &ServerClient) {
	msg := c.read_handshake_str()?
	handshake_response, client := s.parse_client_handshake(msg, mut c)?
	unsafe {
		msg.free()
	}
	return handshake_response, client
}

fn (mut s Server) parse_client_handshake(client_handshake string, mut c Client) ?(string, &ServerClient) {
	s.logger.debug('server-> client handshake:\n$client_handshake')
	lines := client_handshake.split_into_lines()
	get_tokens := lines[0].split(' ')
	if get_tokens.len < 3 {
		return error('unexpected get operation, $get_tokens')
	}
	if get_tokens[0].trim_space() != 'GET' {
		return error("unexpected request '${get_tokens[0]}', expected 'GET'")
	}
	if get_tokens[2].trim_space() != 'HTTP/1.1' {
		return error("unexpected request $get_tokens, expected 'HTTP/1.1'")
	}
	// path := get_tokens[1].trim_space()
	mut seckey := ''
	mut flags := []Flag{}
	mut key := ''
	for i in 1 .. lines.len {
		if lines[i].len <= 0 || lines[i] == '\r\n' {
			continue
		}
		keys := lines[i].split(':')
		match keys[0] {
			'Upgrade', 'upgrade' {
				flags << .has_upgrade
			}
			'Connection', 'connection' {
				flags << .has_connection
			}
			'Sec-WebSocket-Key', 'sec-websocket-key' {
				key = keys[1].trim_space()
				s.logger.debug('server-> got key: $key')
				seckey = create_key_challenge_response(key)?
				s.logger.debug('server-> challenge: $seckey, response: ${keys[1]}')
				flags << .has_accept
			}
			else {
				// We ignore other headers like protocol for now
			}
		}
		unsafe {
			keys.free()
		}
	}
	if flags.len < 3 {
		return error('invalid client handshake, $client_handshake')
	}
	server_handshake := 'HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: $seckey\r\n\r\n'
	server_client := &ServerClient{
		resource_name: get_tokens[1]
		client_key: key
		client: c
		server: s
	}
	unsafe {
		lines.free()
		flags.free()
		get_tokens.free()
		seckey.free()
		key.free()
	}
	return server_handshake, server_client
}

fn (mut ws Client) read_handshake_str() ?string {
	mut total_bytes_read := 0
	mut msg := [1024]byte{}
	mut buffer := [1]byte{}
	for total_bytes_read < 1024 {
		bytes_read := ws.socket_read_into_ptr(byteptr(&buffer), 1)?
		if bytes_read == 0 {
			return error('unexpected no response from handshake')
		}
		msg[total_bytes_read] = buffer[0]
		total_bytes_read++
		if total_bytes_read > 5 && msg[total_bytes_read - 1] == `\n` && msg[total_bytes_read -
			2] == `\r` && msg[total_bytes_read - 3] == `\n` && msg[total_bytes_read - 4] == `\r` {
			break
		}
	}
	res := msg[..total_bytes_read].bytestr()
	return res
}

// read_handshake reads the handshake and check if valid
fn (mut ws Client) read_handshake(seckey string) ? {
	mut msg := ws.read_handshake_str()?
	ws.check_handshake_response(msg, seckey)?
	unsafe {
		msg.free()
	}
}

fn (mut ws Client) check_handshake_response(handshake_response, seckey string) ? {
	ws.debug_log('handshake response:\n$handshake_response')
	lines := handshake_response.split_into_lines()
	header := lines[0]
	if !header.starts_with('HTTP/1.1 101') && !header.starts_with('HTTP/1.0 101') {
		return error('handshake_handler: invalid HTTP status response code')
	}
	for i in 1 .. lines.len {
		if lines[i].len <= 0 || lines[i] == '\r\n' {
			continue
		}
		keys := lines[i].split(':')
		match keys[0] {
			'Upgrade', 'upgrade' {
				ws.flags << .has_upgrade
			}
			'Connection', 'connection' {
				ws.flags << .has_connection
			}
			'Sec-WebSocket-Accept', 'sec-websocket-accept' {
				ws.debug_log('seckey: $seckey')
				challenge := create_key_challenge_response(seckey)?
				ws.debug_log('challenge: $challenge, response: ${keys[1]}')
				if keys[1].trim_space() != challenge {
					return error('handshake_handler: Sec-WebSocket-Accept header does not match computed sha1/base64 response.')
				}
				ws.flags << .has_accept
				unsafe {
					challenge.free()
				}
			}
			else {}
		}
		unsafe {
			keys.free()
		}
	}
	unsafe {
		lines.free()
	}
	if ws.flags.len < 3 {
		ws.close(1002, 'invalid websocket HTTP headers')?
		return error('invalid websocket HTTP headers')
	}
}
