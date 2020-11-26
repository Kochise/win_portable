const (
	unsorted = [2,30,10,20,1]
	sorted_asc = [1, 2, 10, 20, 30]
	sorted_desc = [30, 20, 10, 2, 1]
)

fn test_sorting_simple() {
	mut a := unsorted
	a.sort()
	eprintln(' a: $a')
	assert a == sorted_asc
}

fn test_sorting_with_condition_expression() {
	mut a := unsorted
	a.sort(a>b)
	eprintln(' a: $a')
	assert a == sorted_desc
}


fn mysort (mut a []int) {
	a.sort()
}

fn test_sorting_by_passing_a_mut_array_to_a_function() {
	mut a := unsorted
	mysort(mut a)
	eprintln(' a: $a')
	assert a == sorted_asc
}

/*
fn test_sorting_by_passing_an_anonymous_sorting_function() {
	mut a := unsorted
	a.sort(fn(a &int, b &int) int {	return *b - *a })
	eprintln(' a: $a')
	assert a == sort_desc
}
*/
