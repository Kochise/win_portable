import encoding.csv

fn test_encoding_csv_writer() {
	mut csv_writer := csv.new_writer()

	csv_writer.write(['name', 'email', 'phone', 'other']) or {}
	csv_writer.write(['joe', 'joe@blow.com', '0400000000', 'test']) or {}
	csv_writer.write(['sam', 'sam@likesham.com', '0433000000', 'needs, quoting']) or {}

	assert csv_writer.str() == 'name,email,phone,other\njoe,joe@blow.com,0400000000,test\nsam,sam@likesham.com,0433000000,"needs, quoting"\n'
}
