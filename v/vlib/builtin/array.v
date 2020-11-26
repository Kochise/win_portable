// Copyright (c) 2019-2020 Alexander Medvednikov. All rights reserved.
// Use of this source code is governed by an MIT license
// that can be found in the LICENSE file.
module builtin

import strings

pub struct array {
pub:
	element_size int
pub mut:
	data         voidptr// Using a void pointer allows to implement arrays without generics and without generating
// extra code for every type.
	len          int
	cap          int
}

// Internal function, used by V (`nums := []int`)
fn __new_array(mylen int, cap int, elm_size int) array {
	cap_ := if cap < mylen { mylen } else { cap }
	arr := array{
		element_size: elm_size
		data: vcalloc(cap_ * elm_size)
		len: mylen
		cap: cap_
	}
	return arr
}

fn __new_array_with_default(mylen int, cap int, elm_size int, val voidptr) array {
	cap_ := if cap < mylen { mylen } else { cap }
	mut arr := array{
		element_size: elm_size
		data: vcalloc(cap_ * elm_size)
		len: mylen
		cap: cap_
	}
	if val != 0 {
		for i in 0..arr.len {
			unsafe {
				arr.set_unsafe(i, val)
			}
		}
	}
	return arr
}

fn __new_array_with_array_default(mylen int, cap int, elm_size int, val array) array {
	cap_ := if cap < mylen { mylen } else { cap }
	mut arr := array{
		element_size: elm_size
		data: vcalloc(cap_ * elm_size)
		len: mylen
		cap: cap_
	}
	for i in 0..arr.len {
		val_clone := val.clone()
		unsafe {
			arr.set_unsafe(i, &val_clone)
		}
	}
	return arr
}

// Private function, used by V (`nums := [1, 2, 3]`)
fn new_array_from_c_array(len, cap, elm_size int, c_array voidptr) array {
	cap_ := if cap < len { len } else { cap }

	arr := array{
		element_size: elm_size
		data: vcalloc(cap_ * elm_size)
		len: len
		cap: cap_
	}
	// TODO Write all memory functions (like memcpy) in V
	unsafe {
		C.memcpy(arr.data, c_array, len * elm_size)
	}
	return arr
}

// Private function, used by V (`nums := [1, 2, 3] !`)
fn new_array_from_c_array_no_alloc(len, cap, elm_size int, c_array voidptr) array {
	arr := array{
		element_size: elm_size
		data: c_array
		len: len
		cap: cap
	}
	return arr
}

// Private function. Doubles array capacity if needed
[inline]
fn (mut a array) ensure_cap(required int) {
	if required <= a.cap {
		return
	}
	mut cap := if a.cap == 0 { 2 } else { a.cap * 2 }
	for required > cap {
		cap *= 2
	}
	if a.cap == 0 {
		a.data = vcalloc(cap * a.element_size)
	}
	else {
		a.data = v_realloc(a.data, u32(cap * a.element_size))
	}
	a.cap = cap
}

// repeat returns new array with the given array elements repeated given times.
pub fn (a array) repeat(count int) array {
	if count < 0 {
		panic('array.repeat: count is negative: $count')
	}
	mut size := count * a.len * a.element_size
	if size == 0 {
		size = a.element_size
	}
	arr := array{
		element_size: a.element_size
		data: vcalloc(size)
		len: count * a.len
		cap: count * a.len
	}
	for i in 0..count {
		if a.len > 0 && a.element_size == sizeof(array) {
			ary := array{}
			unsafe {
				C.memcpy(&ary, a.data, sizeof(array))
			}
			ary_clone := ary.clone()
			unsafe {
				C.memcpy(arr.get_unsafe(i * a.len), &ary_clone, a.len * a.element_size)
			}
		} else {
			unsafe {
				C.memcpy(arr.get_unsafe(i * a.len), byteptr(a.data), a.len * a.element_size)
			}
		}
	}
	return arr
}

// array.sort sorts array in-place using given `compare` function as comparator
pub fn (mut a array) sort_with_compare(compare voidptr) {
	C.qsort(mut a.data, a.len, a.element_size, compare)
}

// array.insert
pub fn (mut a array) insert(i int, val voidptr) {
	$if !no_bounds_checking? {
		if i < 0 || i > a.len {
			panic('array.insert: index out of range (i == $i, a.len == $a.len)')
		}
	}
	a.ensure_cap(a.len + 1)
	unsafe {
		C.memmove(a.get_unsafe(i + 1), a.get_unsafe(i), (a.len - i) * a.element_size)
		a.set_unsafe(i, val)
	}
	a.len++
}

// array.insert_many
pub fn (mut a array) insert_many(i int, val voidptr, size int) {
	$if !no_bounds_checking? {
		if i < 0 || i > a.len {
			panic('array.insert_many: index out of range (i == $i, a.len == $a.len)')
		}
	}
	a.ensure_cap(a.len + size)
	elem_size := a.element_size
	unsafe {
		iptr := a.get_unsafe(i)
		C.memmove(a.get_unsafe(i + size), iptr, (a.len - i) * elem_size)
		C.memcpy(iptr, val, size * elem_size)
	}
	a.len += size
}

// array.prepend
pub fn (mut a array) prepend(val voidptr) {
	a.insert(0, val)
}

// array.prepend_many
pub fn (mut a array) prepend_many(val voidptr, size int) {
	a.insert_many(0, val, size)
}

// array.delete deletes array element at the given index
pub fn (mut a array) delete(i int) {
	$if !no_bounds_checking? {
		if i < 0 || i >= a.len {
			panic('array.delete: index out of range (i == $i, a.len == $a.len)')
		}
	}
	// NB: if a is [12,34], a.len = 2, a.delete(0)
	// should move (2-0-1) elements = 1 element (the 34) forward
	unsafe {
		C.memmove(a.get_unsafe(i), a.get_unsafe(i + 1), (a.len - i - 1) * a.element_size)
	}
	a.len--
}

// clears the array without deallocating the allocated data
pub fn (mut a array) clear() {
	a.len = 0
}

// trims the array length to "index" without modifying the allocated data. If "index" is greater
// than len nothing will be changed
pub fn (mut a array) trim(index int) {
	if index < a.len {
		a.len = index
	}
}

// we manually inline this for single operations for performance without -prod
[inline] [unsafe]
fn (a array) get_unsafe(i int) voidptr {
	unsafe {
		return byteptr(a.data) + i * a.element_size
	}
}

// Private function. Used to implement array[] operator
fn (a array) get(i int) voidptr {
	$if !no_bounds_checking? {
		if i < 0 || i >= a.len {
			panic('array.get: index out of range (i == $i, a.len == $a.len)')
		}
	}
	unsafe {
		return byteptr(a.data) + i * a.element_size
	}
}

// array.first returns the first element of the array
pub fn (a array) first() voidptr {
	$if !no_bounds_checking? {
		if a.len == 0 {
			panic('array.first: array is empty')
		}
	}
	return a.data
}

// array.last returns the last element of the array
pub fn (a array) last() voidptr {
	$if !no_bounds_checking? {
		if a.len == 0 {
			panic('array.last: array is empty')
		}
	}
	unsafe {
		return byteptr(a.data) + (a.len - 1) * a.element_size
	}
}

// array.pop returns the last element of the array, and removes it
pub fn (mut a array) pop() voidptr {
	// in a sense, this is the opposite of `a << x`
	$if !no_bounds_checking? {
		if a.len == 0 {
			panic('array.pop: array is empty')
		}
	}
	new_len := a.len - 1
	last_elem := unsafe { byteptr(a.data) + (new_len) * a.element_size }
	a.len = new_len
	// NB: a.cap is not changed here *on purpose*, so that
	// further << ops on that array will be more efficient.
	return memdup(last_elem, a.element_size)
}

// array.slice returns an array using the same buffer as original array
// but starting from the `start` element and ending with the element before
// the `end` element of the original array with the length and capacity
// set to the number of the elements in the slice.
fn (a array) slice(start, _end int) array {
	mut end := _end
	$if !no_bounds_checking? {
		if start > end {
			panic('array.slice: invalid slice index ($start > $end)')
		}
		if end > a.len {
			panic('array.slice: slice bounds out of range ($end >= $a.len)')
		}
		if start < 0 {
			panic('array.slice: slice bounds out of range ($start < 0)')
		}
	}
	mut data := byteptr(0)
	unsafe {
		data = byteptr(a.data) + start * a.element_size
	}
	l := end - start
	res := array{
		element_size: a.element_size
		data: data
		len: l
		cap: l
	}
	return res
}

// used internally for [2..4]
fn (a array) slice2(start, _end int, end_max bool) array {
	end := if end_max { a.len } else { _end }
	return a.slice(start, end)
}

// array.clone_static returns an independent copy of a given array
// It should be used only in -autofree generated code.
fn (a array) clone_static() array {
	return a.clone()
}

// array.clone returns an independent copy of a given array
pub fn (a &array) clone() array {
	mut size := a.cap * a.element_size
	if size == 0 {
		size++
	}
	mut arr := array{
		element_size: a.element_size
		data: vcalloc(size)
		len: a.len
		cap: a.cap
	}
	// Recursively clone-generated elements if array element is array type
	if a.element_size == sizeof(array) {
		for i in 0..a.len {
			ar := array{}
			unsafe {
				C.memcpy(&ar, a.get_unsafe(i), sizeof(array))
			}
			ar_clone := ar.clone()
			unsafe {
				arr.set_unsafe(i, &ar_clone)
			}
		}
	} else {
		unsafe {
			C.memcpy(byteptr(arr.data), a.data, a.cap * a.element_size)
		}
	}
	return arr
}

fn (a &array) slice_clone(start, _end int) array {
	mut end := _end
	$if !no_bounds_checking? {
		if start > end {
			panic('array.slice: invalid slice index ($start > $end)')
		}
		if end > a.len {
			panic('array.slice: slice bounds out of range ($end >= $a.len)')
		}
		if start < 0 {
			panic('array.slice: slice bounds out of range ($start < 0)')
		}
	}
	mut data := byteptr(0)
	unsafe {
		data = byteptr(a.data) + start * a.element_size
	}
	l := end - start
	res := array{
		element_size: a.element_size
		data: data
		len: l
		cap: l
	}
	return res.clone()
}

// we manually inline this for single operations for performance without -prod
[inline] [unsafe]
fn (mut a array) set_unsafe(i int, val voidptr) {
	unsafe {
		C.memcpy(byteptr(a.data) + a.element_size * i, val, a.element_size)
	}
}

// Private function. Used to implement assigment to the array element.
fn (mut a array) set(i int, val voidptr) {
	$if !no_bounds_checking? {
		if i < 0 || i >= a.len {
			panic('array.set: index out of range (i == $i, a.len == $a.len)')
		}
	}
	unsafe {
		C.memcpy(byteptr(a.data) + a.element_size * i, val, a.element_size)
	}
}

fn (mut a array) push(val voidptr) {
	a.ensure_cap(a.len + 1)
	unsafe {
		C.memcpy(byteptr(a.data) + a.element_size * a.len, val, a.element_size)
	}
	a.len++
}

// `val` is array.data
// TODO make private, right now it's used by strings.Builder
pub fn (mut a3 array) push_many(val voidptr, size int) {
	if a3.data == val {
		// handle `arr << arr`
		copy := a3.clone()
		a3.ensure_cap(a3.len + size)
		unsafe {
			//C.memcpy(a.data, copy.data, copy.element_size * copy.len)
			C.memcpy(a3.get_unsafe(a3.len), copy.data, a3.element_size * size)
		}
	} else {
		a3.ensure_cap(a3.len + size)
		unsafe {
			C.memcpy(a3.get_unsafe(a3.len), val, a3.element_size * size)
		}
	}
	a3.len += size
}

pub fn (mut a array) reverse_in_place() {
	if a.len < 2 {
		return
	}
	unsafe {
		mut tmp_value := malloc(a.element_size)
		for i in 0..a.len/2 {
			C.memcpy(tmp_value, byteptr(a.data) + i * a.element_size, a.element_size)
			C.memcpy(byteptr(a.data) + i * a.element_size, byteptr(a.data) + (a.len-1-i) * a.element_size, a.element_size)
			C.memcpy(byteptr(a.data) + (a.len-1-i) * a.element_size, tmp_value, a.element_size)
		}
		free(tmp_value)
	}
}

// array.reverse returns a new array with the elements of
// the original array in reverse order.
pub fn (a array) reverse() array {
	if a.len < 2 {
		return a
	}
	mut arr := array{
		element_size: a.element_size
		data: vcalloc(a.cap * a.element_size)
		len: a.len
		cap: a.cap
	}
	for i in 0..a.len {
		unsafe {
			arr.set_unsafe(i, a.get_unsafe(a.len - 1 - i))
		}
	}
	return arr
}

// pub fn (a []int) free() {
[unsafe]
pub fn (a &array) free() {
	$if prealloc {
		return
	}
	// if a.is_slice {
	// return
	// }
	C.free(a.data)
}

// []string.str returns a string representation of the array of strings
// => '["a", "b", "c"]'
pub fn (a []string) str() string {
	mut sb := strings.new_builder(a.len * 3)
	sb.write('[')
	for i in 0..a.len {
		val := a[i]
		sb.write("\'")
		sb.write(val)
		sb.write("\'")
		if i < a.len - 1 {
			sb.write(', ')
		}
	}
	sb.write(']')
	return sb.str()
}

// []byte.hex returns a string with the hexadecimal representation
// of the byte elements of the array
pub fn (b []byte) hex() string {
	mut hex := malloc(b.len * 2 + 1)
	mut dst_i := 0
	for i in b {
		n0 := i >> 4
		unsafe {
			hex[dst_i++] = if n0 < 10 { n0 + `0` } else { n0 + byte(87) }
		}
		n1 := i & 0xF
		unsafe {
			hex[dst_i++] = if n1 < 10 { n1 + `0` } else { n1 + byte(87) }
		}
	}
	unsafe {
		hex[dst_i] = `\0`
		return tos(hex,dst_i)
	}
}

// copy copies the `src` byte array elements to the `dst` byte array.
// The number of the elements copied is the minimum of the length of both arrays.
// Returns the number of elements copied.
// TODO: implement for all types
pub fn copy(dst, src []byte) int {
	if dst.len > 0 && src.len > 0 {
		mut min := 0
		min = if dst.len < src.len { dst.len } else { src.len }
		unsafe {
			C.memcpy(byteptr(dst.data), src[..min].data, dst.element_size * min)
		}
		return min
	}
	return 0
}

// Private function. Comparator for int type.
fn compare_ints(a, b &int) int {
	if *a < *b {
		return -1
	}
	if *a > *b {
		return 1
	}
	return 0
}

fn compare_ints_reverse(a, b &int) int {
	if *a > *b {
		return -1
	}
	if *a < *b {
		return 1
	}
	return 0
}

fn compare_floats(a, b &f64) int {
	if *a < *b {
		return -1
	}
	if *a > *b {
		return 1
	}
	return 0
}

fn compare_floats_reverse(a, b &f64) int {
	if *a > *b {
		return -1
	}
	if *a < *b {
		return 1
	}
	return 0
}

// []int.sort sorts array of int in place in ascending order.
pub fn (mut a []int) sort() {
	a.sort_with_compare(compare_ints)
}

// []string.index returns the index of the first element equal to the given value,
// or -1 if the value is not found in the array.
pub fn (a []string) index(v string) int {
	for i in 0..a.len {
		if a[i] == v {
			return i
		}
	}
	return -1
}

// []int.index returns the index of the first element equal to the given value,
// or -1 if the value is not found in the array.
pub fn (a []int) index(v int) int {
	for i in 0..a.len {
		if a[i] == v {
			return i
		}
	}
	return -1
}

// []byte.index returns the index of the first element equal to the given value,
// or -1 if the value is not found in the array.
pub fn (a []byte) index(v byte) int {
	for i in 0..a.len {
		if a[i] == v {
			return i
		}
	}
	return -1
}

pub fn (a []rune) index(v rune) int {
	for i in 0..a.len {
		if a[i] == v {
			return i
		}
	}
	return -1
}

// []char.index returns the index of the first element equal to the given value,
// or -1 if the value is not found in the array.
// TODO is `char` type yet in the language?
pub fn (a []char) index(v char) int {
	for i in 0..a.len {
		if a[i] == v {
			return i
		}
	}
	return -1
}

// []int.reduce executes a given reducer function on each element of the array,
// resulting in a single output value.
pub fn (a []int) reduce(iter fn(accum, curr int)int, accum_start int) int {
	mut accum_ := accum_start
	for i in a {
		accum_ = iter(accum_, i)
	}

	return accum_
}

// array_eq<T> checks if two arrays contain all the same elements in the same order.
// []int == []int (also for: i64, f32, f64, byte, string)
/*
fn array_eq<T>(a1, a2 []T) bool {
	if a1.len != a2.len {
		return false
	}
	for i in 0..a1.len {
		if a1[i] != a2[i] {
			return false
		}
	}
	return true
}

pub fn (a []int) eq(a2 []int) bool {
	return array_eq(a, a2)
}

pub fn (a []i64) eq(a2 []i64) bool {
	return array_eq(a, a2)
}


pub fn (a []byte) eq(a2 []byte) bool {
	return array_eq(a, a2)
}

pub fn (a []f32) eq(a2 []f32) bool {
	return array_eq(a, a2)
}
*/

pub fn (a1 []string) eq(a2 []string) bool {
	//return array_eq(a, a2)
	if a1.len != a2.len {
		return false
	}
	for i in 0..a1.len {
		if a1[i] != a2[i] {
			return false
		}
	}
	return true
}

// compare_i64 for []f64 sort_with_compare()
// sort []i64 with quicksort
// usage :
// mut x := [i64(100),10,70,28,92]
// x.sort_with_compare(compare_i64)
// println(x)     // Sorted i64 Array
// output:
// [10, 28, 70, 92, 100]
pub fn compare_i64(a, b &i64) int {
	if *a < *b {
		return -1
	}
	if *a > *b {
		return 1
	}
	return 0
}

// compare_f64 for []f64 sort_with_compare()
// ref. compare_i64(...)
pub fn compare_f64(a, b &f64) int {
	if *a < *b {
		return -1
	}
	if *a > *b {
		return 1
	}
	return 0
}

// compare_f32 for []f32 sort_with_compare()
// ref. compare_i64(...)
pub fn compare_f32(a, b &f32) int {
	if *a < *b {
		return -1
	}
	if *a > *b {
		return 1
	}
	return 0
}

// a.pointers() returns a new array, where each element
// is the address of the corresponding element in a.
pub fn (a array) pointers() []voidptr {
	mut res := []voidptr{}
	for i in 0..a.len {
		unsafe {
			res << a.get_unsafe(i)
		}
	}
	return res
}
