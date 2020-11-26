/*
 * ATTENTION! Do not use this file as an example!
 * For that, please look at `channel_select_2_test.v` or `channel_select_3_test.v`
 *
 * This test case uses the implementation in `sync/channels.v` directly
 * in order to test it independently from the support in the core language
 */

import sync

fn do_rec_i64(mut ch sync.Channel) {
	mut sum := i64(0)
	for _ in 0 .. 300 {
		mut a := i64(0)
		ch.pop(&a)
		sum += a
	}
	assert sum == 300 * (300 - 1) / 2
}

fn do_send_int(mut ch sync.Channel) {
	for i in 0 .. 300 {
		ch.push(&i)
	}
}

fn do_send_byte(mut ch sync.Channel) {
	for i in 0 .. 300 {
		ii := byte(i)
		ch.push(&ii)
	}
}

fn do_send_i64(mut ch sync.Channel) {
	for i in 0 .. 300 {
		ii := i64(i)
		ch.push(&ii)
	}
}

fn test_select() {
	mut chi := sync.new_channel<int>(0)
	mut chl := sync.new_channel<i64>(1)
	mut chb := sync.new_channel<byte>(10)
	mut recch := sync.new_channel<i64>(0)
	go do_rec_i64(mut recch)
	go do_send_int(mut chi)
	go do_send_byte(mut chb)
	go do_send_i64(mut chl)
	mut channels := [chi, recch, chl, chb]
	directions := [sync.Direction.pop, .push, .pop, .pop]
	mut sum := i64(0)
	mut rl := i64(0)
	mut ri := int(0)
	mut rb := byte(0)
	mut sl := i64(0)
	mut objs := [voidptr(&ri), &sl, &rl, &rb]
	for _ in 0 .. 1200 {
		idx := sync.channel_select(mut channels, directions, mut objs, -1)
		match idx {
			0 {
				sum += ri
			}
			1 {
				sl++
			}
			2 {
				sum += rl
			}
			3 {
				sum += rb
			}
			else {
				println('got $idx (timeout)')
			}
		}
	}
	// Use Gauß' formula for the first 2 contributions
	// the 3rd contribution is `byte` and must be seen modulo 256
	expected_sum :=  2 * (300 * (300 - 1) / 2) +
		256 * (256 - 1) / 2 +
		44 * (44 - 1) / 2
	assert sum == expected_sum
}
