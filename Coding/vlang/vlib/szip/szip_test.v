import szip
import os

const (
	test_out_zip = 'v_test_zip.zip'
	test_path    = 'zip files'
	fname1       = 'file_1.txt'
	fpath1       = os.join_path(test_path, fname1)
	fname2       = 'file_2.txt'
	fpath2       = os.join_path(test_path, fname2)
)

fn cleanup() {
	os.chdir(os.temp_dir()) or {}
	os.rmdir_all(test_path) or {}
	os.rm(test_out_zip) or {}
}

fn testsuite_begin() ? {
	cleanup()
}

fn testsuite_end() ? {
	cleanup()
}

fn test_szip_create_temp_files() ? {
	os.mkdir(test_path) ?
	os.write_file(fpath1, 'file one') ?
	os.write_file(fpath2, 'file two') ?
	assert os.exists(fpath1)
	assert os.exists(fpath2)
}

fn test_zipping_files() ? {
	files := (os.ls(test_path) ?).map(os.join_path(test_path, it))
	szip.zip_files(files, test_out_zip) ?
	assert os.exists(test_out_zip)
}

fn test_extract_zipped_files() ? {
	os.rm(fpath1) ?
	os.rm(fpath2) ?
	szip.extract_zip_to_dir(test_out_zip, test_path) ?
	assert os.exists(fpath1)
	assert os.exists(fpath2)
	assert (os.read_file(fpath1) ?) == 'file one'
	assert (os.read_file(fpath2) ?) == 'file two'
	os.rmdir_all(test_path) ?
	os.rm(test_out_zip) or {}
}

fn test_reading_zipping_files() ? {
	n_files := 2
	mut file_name_list := []string{}
	for i in 0 .. n_files {
		file_name_list << 'file_${i:02}.txt'
	}

	os.chdir(os.temp_dir()) or {}
	os.rmdir_all(test_path) or {}
	os.mkdir(test_path) ?
	for c, f_name in file_name_list {
		tmp_path := os.join_path(test_path, f_name)
		os.write_file(tmp_path, 'file ${c:02}') ?
		assert os.exists(tmp_path)
	}
	files := (os.ls(test_path) ?).map(os.join_path(test_path, it))

	szip.zip_files(files, test_out_zip) ?
	assert os.exists(test_out_zip)

	mut zp := szip.open(test_out_zip, szip.CompressionLevel.no_compression, szip.OpenMode.read_only) ?
	n_entries := zp.total() ?
	assert n_entries == n_files

	unsafe {
		data_len := 'file XX'.len
		buf_size := 32
		buf := malloc(data_len * 2)

		for _ in 0 .. n_files {
			zp.open_entry_by_index(0) ?
			name := zp.name()
			assert name in file_name_list

			zp.read_entry_buf(buf, buf_size) ?
			buf[data_len] = 0
			tmp_str := tos(buf, data_len)

			assert tmp_str[0..4] == 'file'
			assert tmp_str[5..7] == name[5..7]

			zp.close_entry()
		}

		free(buf)
	}
	zp.close()
}
