module sync

import time
import rand

#flag windows -I @VROOT/thirdparty/stdatomic/win
#flag linux -I @VROOT/thirdparty/stdatomic/nix
#flag darwin -I @VROOT/thirdparty/stdatomic/nix
#flag freebsd -I @VROOT/thirdparty/stdatomic/nix
#flag solaris -I @VROOT/thirdparty/stdatomic/nix

$if linux {
	$if tinyc {
		// most Linux distributions have /usr/lib/libatomic.so, but Ubuntu uses gcc version specific dir
		#flag -L/usr/lib/gcc/x86_64-linux-gnu/6 -L/usr/lib/gcc/x86_64-linux-gnu/7 -L/usr/lib/gcc/x86_64-linux-gnu/8 -L/usr/lib/gcc/x86_64-linux-gnu/9 -latomic
	}
}

#include <atomic.h>

// the following functions are actually generic in C
fn C.atomic_load_ptr(voidptr) voidptr
fn C.atomic_store_ptr(voidptr, voidptr)
fn C.atomic_compare_exchange_weak_ptr(voidptr, voidptr, voidptr) bool
fn C.atomic_compare_exchange_strong_ptr(voidptr, voidptr, voidptr) bool
fn C.atomic_exchange_ptr(voidptr, voidptr) voidptr
fn C.atomic_fetch_add_ptr(voidptr, voidptr) voidptr
fn C.atomic_fetch_sub_ptr(voidptr, voidptr) voidptr

fn C.atomic_load_u16(voidptr) u16
fn C.atomic_store_u16(voidptr, u16)
fn C.atomic_compare_exchange_weak_u16(voidptr, voidptr, u16) bool
fn C.atomic_compare_exchange_strong_u16(voidptr, voidptr, u16) bool
fn C.atomic_exchange_u16(voidptr, u16) u16
fn C.atomic_fetch_add_u16(voidptr, u16) u16
fn C.atomic_fetch_sub_u16(voidptr, u16) u16

fn C.atomic_load_u32(voidptr) u32
fn C.atomic_store_u32(voidptr, u32)
fn C.atomic_compare_exchange_weak_u32(voidptr, voidptr, u32) bool
fn C.atomic_compare_exchange_strong_u32(voidptr, voidptr, u32) bool
fn C.atomic_exchange_u32(voidptr, u32) u32
fn C.atomic_fetch_add_u32(voidptr, u32) u32
fn C.atomic_fetch_sub_u32(voidptr, u32) u32

fn C.atomic_load_u64(voidptr) u64
fn C.atomic_store_u64(voidptr, u64)
fn C.atomic_compare_exchange_weak_u64(voidptr, voidptr, u64) bool
fn C.atomic_compare_exchange_strong_u64(voidptr, voidptr, u64) bool
fn C.atomic_exchange_u64(voidptr, u64) u64
fn C.atomic_fetch_add_u64(voidptr, u64) u64
fn C.atomic_fetch_sub_u64(voidptr, u64) u64

const (
	// how often to try to get data without blocking before to wait for semaphore
	spinloops = 750
	spinloops_sem = 4000
)

enum BufferElemStat {
	unused = 0
	writing
	written
	reading
}

struct Subscription {
mut:
	sem Semaphore
	prev &&Subscription
	nxt &Subscription
}

enum Direction {
	pop
	push
}

struct Channel {
	writesem           Semaphore // to wake thread that wanted to write, but buffer was full
	readsem            Semaphore // to wake thread that wanted to read, but buffer was empty
	writesem_im        Semaphore
	readsem_im         Semaphore
	ringbuf            byteptr // queue for buffered channels
	statusbuf          byteptr // flags to synchronize write/read in ringbuf
	objsize            u32
mut: // atomic
	write_adr          C.atomic_uintptr_t // if != NULL the next obj can be written here without wait
	read_adr           C.atomic_uintptr_t // if != NULL an obj can be read from here without wait
	adr_read           C.atomic_uintptr_t // used to identify origin of writesem
	adr_written        C.atomic_uintptr_t // used to identify origin of readsem
	write_free         u32 // for queue state
	read_avail         u32
	buf_elem_write_idx u32
	buf_elem_read_idx  u32
	// for select
	write_subscriber   &Subscription
	read_subscriber    &Subscription
	write_sub_mtx      u16
	read_sub_mtx       u16
	closed             u16
pub:
	cap                u32 // queue length in #objects
}

pub fn new_channel<T>(n u32) &Channel {
	st := sizeof(T)
	return new_channel_st(n, st)
}

fn new_channel_st(n u32, st u32) &Channel {
	wsem := if n > 0 { n } else { 1 }
	rsem := if n > 0 { u32(0) } else { 1 }
	rbuf := if n > 0 { malloc(int(n * st)) } else { byteptr(0) }
	sbuf := if n > 0 { vcalloc(int(n * 2)) } else { byteptr(0) }
	return &Channel{
		writesem: new_semaphore_init(wsem)
		readsem:  new_semaphore_init(rsem)
		writesem_im: new_semaphore()
		readsem_im: new_semaphore()
		objsize: st
		cap: n
		write_free: n
		read_avail: 0
		ringbuf: rbuf
		statusbuf: sbuf
		write_subscriber: 0
		read_subscriber: 0
	}
}

pub fn (mut ch Channel) close() {
	C.atomic_store_u16(&ch.closed, 1)
	mut nulladr := voidptr(0)
	for !C.atomic_compare_exchange_weak_ptr(&ch.adr_written, &nulladr, voidptr(-1)) {
		nulladr = voidptr(0)
	}
	ch.readsem_im.post()
	ch.readsem.post()
	mut null16 := u16(0)
	for !C.atomic_compare_exchange_weak_u16(&ch.read_sub_mtx, &null16, u16(1)) {
		null16 = u16(0)
	}
	if ch.read_subscriber != voidptr(0) {
		ch.read_subscriber.sem.post()
	}
	C.atomic_store_u16(&ch.read_sub_mtx, u16(0))
	null16 = u16(0)
	for !C.atomic_compare_exchange_weak_u16(&ch.write_sub_mtx, &null16, u16(1)) {
		null16 = u16(0)
	}
	if ch.write_subscriber != voidptr(0) {
		ch.write_subscriber.sem.post()
	}
	C.atomic_store_u16(&ch.write_sub_mtx, u16(0))
}

[inline]
pub fn (mut ch Channel) len() int {
	return int(C.atomic_load_u32(&ch.read_avail))
}

[inline]
pub fn (mut ch Channel) push(src voidptr) {
	if ch.try_push_priv(src, false) == .closed {
		panic('push on closed channel')
	}
}

[inline]
pub fn (mut ch Channel) try_push(src voidptr) ChanState {
	return ch.try_push_priv(src, true)
}

fn (mut ch Channel) try_push_priv(src voidptr, no_block bool) ChanState {
	if C.atomic_load_u16(&ch.closed) != 0 {
		return .closed
	}
	spinloops_sem_, spinloops_ := if no_block { 1, 1 } else { spinloops, spinloops_sem }
	mut have_swapped := false
	for {
		mut got_sem := false
		mut wradr := C.atomic_load_ptr(&ch.write_adr)
		for wradr != C.NULL {
			if C.atomic_compare_exchange_strong_ptr(&ch.write_adr, &wradr, voidptr(0)) {
				// there is a reader waiting for us
				unsafe { C.memcpy(wradr, src, ch.objsize) }
				mut nulladr := voidptr(0)
				for !C.atomic_compare_exchange_weak_ptr(&ch.adr_written, &nulladr, wradr) {
					nulladr = voidptr(0)
				}
				ch.readsem_im.post()
				return .success
			}
		}
		if no_block && ch.cap == 0 {
			return .not_ready
		}
		// get token to read
		for _ in 0 .. spinloops_sem_ {
			if got_sem {
				break
			}
			got_sem = ch.writesem.try_wait()
		}
		if !got_sem {
			if no_block {
				return .not_ready
			}
			ch.writesem.wait()
		}
		if ch.cap == 0 {
			// try to advertise current object as readable
			mut read_in_progress := false
			C.atomic_store_ptr(&ch.read_adr, src)
			wradr = C.atomic_load_ptr(&ch.write_adr)
			if wradr != C.NULL {
				mut src2 := src
				if C.atomic_compare_exchange_strong_ptr(&ch.read_adr, &src2, voidptr(0)) {
					ch.writesem.post()
					continue
				} else {
					read_in_progress = true
				}
			}
			if !read_in_progress {
				mut null16 := u16(0)
				for !C.atomic_compare_exchange_weak_u16(&ch.read_sub_mtx, &null16, u16(1)) {
					null16 = u16(0)
				}
				if ch.read_subscriber != voidptr(0) {
					ch.read_subscriber.sem.post()
				}
				C.atomic_store_u16(&ch.read_sub_mtx, u16(0))
			}
			mut src2 := src
			for sp := u32(0); sp < spinloops_ || read_in_progress; sp++ {
				if C.atomic_compare_exchange_strong_ptr(&ch.adr_read, &src2, voidptr(0)) {
					have_swapped = true
					read_in_progress = true
					break
				}
				src2 = src
			}
			mut got_im_sem := false
			for sp := u32(0); sp < spinloops_sem_ || read_in_progress; sp++ {
				got_im_sem = ch.writesem_im.try_wait()
				if got_im_sem {
					break
				}
			}
			for {
				if got_im_sem {
					got_im_sem = false
				} else {
					ch.writesem_im.wait()
				}
				if have_swapped || C.atomic_compare_exchange_strong_ptr(&ch.adr_read, &src2, voidptr(0)) {
					ch.writesem.post()
					break
				} else {
					// this semaphore was not for us - repost in
					ch.writesem_im.post()
					if src2 == voidptr(-1) {
						ch.readsem.post()
						return .closed
					}
					src2 = src
				}
			}
			return .success
		} else {
			// buffered channel
			mut space_in_queue := false
			mut wr_free := C.atomic_load_u32(&ch.write_free)
			for wr_free > 0 {
				space_in_queue = C.atomic_compare_exchange_weak_u32(&ch.write_free, &wr_free, wr_free-1)
				if space_in_queue {
					break
				}
			}
			if space_in_queue {
				mut wr_idx := C.atomic_load_u32(&ch.buf_elem_write_idx)
				for {
					mut new_wr_idx := wr_idx + 1
					for new_wr_idx >= ch.cap {
						new_wr_idx -= ch.cap
					}
					if C.atomic_compare_exchange_strong_u32(&ch.buf_elem_write_idx, &wr_idx, new_wr_idx) {
						break
					}
				}
				mut wr_ptr := ch.ringbuf
				mut status_adr := ch.statusbuf
				unsafe {
					wr_ptr += wr_idx * ch.objsize
					status_adr += wr_idx * sizeof(u16)
				}
				mut expected_status := u16(BufferElemStat.unused)
				for !C.atomic_compare_exchange_weak_u16(status_adr, &expected_status, u16(BufferElemStat.writing)) {
					expected_status = u16(BufferElemStat.unused)
				}
				unsafe {
					C.memcpy(wr_ptr, src, ch.objsize)
				}
				C.atomic_store_u16(status_adr, u16(BufferElemStat.written))
				C.atomic_fetch_add_u32(&ch.read_avail, 1)
				ch.readsem.post()
				mut null16 := u16(0)
				for !C.atomic_compare_exchange_weak_u16(&ch.read_sub_mtx, &null16, u16(1)) {
					null16 = u16(0)
				}
				if ch.read_subscriber != voidptr(0) {
					ch.read_subscriber.sem.post()
				}
				C.atomic_store_u16(&ch.read_sub_mtx, u16(0))
				return .success
			} else {
				if no_block {
					return .not_ready
				}
				ch.writesem.post()
			}
		}
	}
	// this should not happen
	assert false
	return .success
}

[inline]
pub fn (mut ch Channel) pop(dest voidptr) bool {
	return ch.try_pop_priv(dest, false) == .success
}

[inline]
pub fn (mut ch Channel) try_pop(dest voidptr) ChanState {
	return ch.try_pop_priv(dest, true)
}

fn (mut ch Channel) try_pop_priv(dest voidptr, no_block bool) ChanState {
	spinloops_sem_, spinloops_ := if no_block { 1, 1 } else { spinloops, spinloops_sem } 
	mut have_swapped := false
	mut write_in_progress := false
	for {
		mut got_sem := false
		if ch.cap == 0 {
			// unbuffered channel - first see if a `push()` has adversized
			mut rdadr := C.atomic_load_ptr(&ch.read_adr)
			for rdadr != C.NULL {
				if C.atomic_compare_exchange_strong_ptr(&ch.read_adr, &rdadr, voidptr(0)) {
					// there is a writer waiting for us
					unsafe { C.memcpy(dest, rdadr, ch.objsize) }
					mut nulladr := voidptr(0)
					for !C.atomic_compare_exchange_weak_ptr(&ch.adr_read, &nulladr, rdadr) {
						nulladr = voidptr(0)
					}
					ch.writesem_im.post()
					return .success
				}
			}
			if no_block {
				if C.atomic_load_u16(&ch.closed) == 0 {
					return .not_ready
				} else {
					return .closed
				}
			}
		}
		// get token to read
		for _ in 0 .. spinloops_sem_ {
			if got_sem {
				break
			}
			got_sem = ch.readsem.try_wait()
		}
		if !got_sem {
			if no_block {
				if C.atomic_load_u16(&ch.closed) == 0 {
					return .not_ready
				} else {
					return .closed
				}
			}
			ch.readsem.wait()
		}
		if ch.cap > 0 {
			// try to get buffer token
			mut obj_in_queue := false
			mut rd_avail := C.atomic_load_u32(&ch.read_avail)
			for rd_avail > 0 {
				obj_in_queue = C.atomic_compare_exchange_weak_u32(&ch.read_avail, &rd_avail, rd_avail-1)
				if obj_in_queue {
					break
				}
			}
			if obj_in_queue {
				mut rd_idx := C.atomic_load_u32(&ch.buf_elem_read_idx)
				for {
					mut new_rd_idx := rd_idx + 1
					for new_rd_idx >= ch.cap {
						new_rd_idx -= ch.cap
					}
					if C.atomic_compare_exchange_weak_u32(&ch.buf_elem_read_idx, &rd_idx, new_rd_idx) {
						break
					}
				}
				mut rd_ptr := ch.ringbuf
				mut status_adr := ch.statusbuf
				unsafe {
					rd_ptr += rd_idx * ch.objsize
					status_adr += rd_idx * sizeof(u16)
				}
				mut expected_status := u16(BufferElemStat.written)
				for !C.atomic_compare_exchange_weak_u16(status_adr, &expected_status, u16(BufferElemStat.reading)) {
					expected_status = u16(BufferElemStat.written)
				}
				unsafe {
					C.memcpy(dest, rd_ptr, ch.objsize)
				}
				C.atomic_store_u16(status_adr, u16(BufferElemStat.unused))
				C.atomic_fetch_add_u32(&ch.write_free, 1)
				ch.writesem.post()
				mut null16 := u16(0)
				for !C.atomic_compare_exchange_weak_u16(&ch.write_sub_mtx, &null16, u16(1)) {
					null16 = u16(0)
				}
				if ch.write_subscriber != voidptr(0) {
					ch.write_subscriber.sem.post()
				}
				C.atomic_store_u16(&ch.write_sub_mtx, u16(0))
				return .success
			}
		}
		// try to advertise `dest` as writable
		C.atomic_store_ptr(&ch.write_adr, dest)
		if ch.cap == 0 {
			mut rdadr := C.atomic_load_ptr(&ch.read_adr)
			if rdadr != C.NULL {
				mut dest2 := dest
				if C.atomic_compare_exchange_strong_ptr(&ch.write_adr, &dest2, voidptr(0)) {
					ch.readsem.post()
					continue
				} else {
					write_in_progress = true
				}
			}
		}
		if ch.cap == 0 && !write_in_progress {
			mut null16 := u16(0)
			for !C.atomic_compare_exchange_weak_u16(&ch.write_sub_mtx, &null16, u16(1)) {
				null16 = u16(0)
			}
			if ch.write_subscriber != voidptr(0) {
				ch.write_subscriber.sem.post()
			}
			C.atomic_store_u16(&ch.write_sub_mtx, u16(0))
		}
		mut dest2 := dest
		for sp := u32(0); sp < spinloops_ || write_in_progress; sp++ {
			if C.atomic_compare_exchange_strong_ptr(&ch.adr_written, &dest2, voidptr(0)) {
				have_swapped = true
				break
			} else if dest2 == voidptr(-1) {
				ch.readsem.post()
				return .closed
			}
			dest2 = dest
		}
		mut got_im_sem := false
		for sp := u32(0); sp < spinloops_sem_ || write_in_progress; sp++ {
			got_im_sem = ch.readsem_im.try_wait()
			if got_im_sem {
				break
			}
		}
		for {
			if got_im_sem {
				got_im_sem = false
			} else {
				ch.readsem_im.wait()
			}
			if have_swapped || C.atomic_compare_exchange_strong_ptr(&ch.adr_written, &dest2, voidptr(0)) {
				ch.readsem.post()
				break
			} else {
				// this semaphore was not for us - repost in
				ch.readsem_im.post()
				if dest2 == voidptr(-1) {
					ch.readsem.post()
					return .closed
				}
				dest2 = dest
			}
		}
		break        
	}
	return .success
}

// Wait `timeout` on any of `channels[i]` until one of them can push (`is_push[i] = true`) or pop (`is_push[i] = false`)
// object referenced by `objrefs[i]`. `timeout < 0` means wait unlimited time. `timeout == 0` means return immediately
// if no transaction can be performed without waiting.
// return value: the index of the channel on which a transaction has taken place
//               -1 if waiting for a transaction has exceeded timeout
//               -2 if all channels are closed

pub fn channel_select(mut channels []&Channel, dir []Direction, mut objrefs []voidptr, timeout time.Duration) int {
	assert channels.len == dir.len
	assert dir.len == objrefs.len
	mut subscr := []Subscription{len: channels.len}
	sem := new_semaphore()
	for i, ch in channels {
		subscr[i].sem = sem
		if dir[i] == .push {
			mut null16 := u16(0)
			for !C.atomic_compare_exchange_weak_u16(&ch.write_sub_mtx, &null16, u16(1)) {
				null16 = u16(0)
			}
			subscr[i].prev = &ch.write_subscriber
			unsafe {
				subscr[i].nxt = C.atomic_exchange_ptr(&ch.write_subscriber, &subscr[i])
			}
			if voidptr(subscr[i].nxt) != voidptr(0) {
				subscr[i].nxt.prev = &subscr[i].nxt
			}
			C.atomic_store_u16(&ch.write_sub_mtx, u16(0))
		} else {
			mut null16 := u16(0)
			for !C.atomic_compare_exchange_weak_u16(&ch.read_sub_mtx, &null16, u16(1)) {
				null16 = u16(0)
			}
			subscr[i].prev = &ch.read_subscriber
			unsafe {
				subscr[i].nxt = C.atomic_exchange_ptr(&ch.read_subscriber, &subscr[i])
			}
			if voidptr(subscr[i].nxt) != voidptr(0) {
				subscr[i].nxt.prev = &subscr[i].nxt
			}
			C.atomic_store_u16(&ch.read_sub_mtx, u16(0))
		}
	}
	stopwatch := if timeout <= 0 { time.StopWatch{} } else { time.new_stopwatch({}) }
	mut event_idx := -1 // negative index means `timed out`
	for {
		rnd := rand.u32_in_range(0, u32(channels.len))
		mut num_closed := 0
		for j, _ in channels {
			mut i := j + int(rnd)
			if i >= channels.len {
				i -= channels.len
			}
			if dir[i] == .push {
				stat := channels[i].try_push_priv(objrefs[i], true)
				if stat == .success {
					event_idx = i
					goto restore
				} else if stat == .closed {
					num_closed++
				}
			} else {
				stat := channels[i].try_pop_priv(objrefs[i], true)
				if stat == .success {
					event_idx = i
					goto restore
				} else if stat == .closed {
					num_closed++
				}
			}
		}
		if num_closed == channels.len {
			event_idx = -2
			goto restore
		}
		if timeout == 0 {
			goto restore
		}
		if timeout > 0 {
			remaining := timeout - stopwatch.elapsed()
			if !sem.timed_wait(remaining) {
				goto restore
			}
		} else {
			sem.wait()
		}
	}
restore:
	// reset subscribers
	for i, ch in channels {
		if dir[i] == .push {
			mut null16 := u16(0)
			for !C.atomic_compare_exchange_weak_u16(&ch.write_sub_mtx, &null16, u16(1)) {
				null16 = u16(0)
			}
			unsafe {
				*subscr[i].prev = subscr[i].nxt
			}
			if subscr[i].nxt != 0 {
				subscr[i].nxt.prev = subscr[i].prev
				// just in case we have missed a semaphore during restore
				subscr[i].nxt.sem.post()
			}
			C.atomic_store_u16(&ch.write_sub_mtx, u16(0))
		} else {
			mut null16 := u16(0)
			for !C.atomic_compare_exchange_weak_u16(&ch.read_sub_mtx, &null16, u16(1)) {
				null16 = u16(0)
			}
			unsafe {
				*subscr[i].prev = subscr[i].nxt
			}
			if subscr[i].nxt != 0 {
				subscr[i].nxt.prev = subscr[i].prev
				subscr[i].nxt.sem.post()
			}
			C.atomic_store_u16(&ch.read_sub_mtx, u16(0))
		}
	}
	sem.destroy()
	return event_idx
}
