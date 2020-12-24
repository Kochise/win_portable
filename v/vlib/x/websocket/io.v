module websocket

import net
import time
import sync

// socket_read reads from socket into the provided buffer
fn (mut ws Client) socket_read(mut buffer []byte) ?int {
	lock  {
		if ws.state in [.closed, .closing] || ws.conn.sock.handle <= 1 {
			return error('socket_read: trying to read a closed socket')
		}
		if ws.is_ssl {
			r := ws.ssl_conn.read_into(mut buffer) ?
			return r
		} else {
			for {
				r := ws.conn.read(mut buffer) or {
					if errcode == net.err_timed_out_code {
						continue
					}
					return error(err)
				}
				return r
			}
		}
	}
}

// socket_read reads from socket into the provided byte pointer and length
fn (mut ws Client) socket_read_ptr(buf_ptr byteptr, len int) ?int {
	lock  {
		if ws.state in [.closed, .closing] || ws.conn.sock.handle <= 1 {
			return error('socket_read_ptr: trying to read a closed socket')
		}
		if ws.is_ssl {
			r := ws.ssl_conn.socket_read_into_ptr(buf_ptr, len) ?
			return r
		} else {
			for {
				r := ws.conn.read_ptr(buf_ptr, len) or {
					if errcode == net.err_timed_out_code {
						continue
					}
					return error(err)
				}
				return r
			}
		}
	}
}

// socket_write writes the provided byte array to the socket
fn (mut ws Client) socket_write(bytes []byte) ? {
	lock  {
		if ws.state == .closed || ws.conn.sock.handle <= 1 {
			ws.debug_log('socket_write: Socket allready closed')
			return error('socket_write: trying to write on a closed socket')
		}
		if ws.is_ssl {
			ws.ssl_conn.write(bytes) ?
		} else {
			for {
				ws.conn.write(bytes) or {
					if errcode == net.err_timed_out_code {
						continue
					}
					return error(err)
				}
				return
			}
		}
	}
}

// shutdown_socket shuts down the socket properly when connection is closed
fn (mut ws Client) shutdown_socket() ? {
	ws.debug_log('shutting down socket')
	if ws.is_ssl {
		ws.ssl_conn.shutdown() ?
	} else {
		ws.conn.close() ?
	}
	return none
}

// dial_socket connects tcp socket and initializes default configurations
fn (mut ws Client) dial_socket() ?net.TcpConn {
	tcp_address := '$ws.uri.hostname:$ws.uri.port'
	mut t := net.dial_tcp(tcp_address) ?
	optval := int(1)
	t.sock.set_option_int(.keep_alive, optval) ?
	t.set_read_timeout(30 * time.second)
	t.set_write_timeout(30 * time.second)
	if ws.is_ssl {
		ws.ssl_conn.connect(mut t, ws.uri.hostname) ?
	}
	return t
}
