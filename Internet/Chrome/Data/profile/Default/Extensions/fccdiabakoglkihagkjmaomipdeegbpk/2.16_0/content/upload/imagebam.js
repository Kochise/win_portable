s3sg.Upload_Imagebam = {};
//------------------------------------------------------------------------------
s3sg.Upload_Imagebam.doUpload = function(image_data) {
	var req = new XMLHttpRequest();
	//------------------------------------------------------------------
	var file_name = s3sg.utils.defaultFileName(image_data);
	file_name = file_name.replace(/[^\w\d\-\_\s]/g, '');
	if (file_name == '') { file_name = 'image_' + s3sg.utils.random_string(5); }

	var send_post = new FormData();
	send_post.append('content_type', '0');
	send_post.append('thumb_size', '350');
	send_post.append('thumb_aspect_ratio', 'resize');
	send_post.append('thumb_file_type', 'jpg');
	send_post.append('file[]', image_data.imgBlob, file_name + "." + image_data.formatImageExt);

	req.open("POST", "http://www.imagebam.com/sys/upload/save", true);

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				s3sg.Upload_Imagebam.okUpload(req, image_data);
			} else {
				s3sg.upload.errorUpload(req);
			}
		}
	}
	req.upload.onprogress = function(event) {
		if (event.lengthComputable) {
			var percent = Math.round(100 * event.loaded / event.total);
			s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_percent') + percent + '%');
		}
	}

	s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_percent') +'0%');
	req.send(send_post);
	return true;
}
//------------------------------------------------------------------------------
s3sg.Upload_Imagebam.okUpload = function(req, image_data) {
	var data = /\[URL=([^\]]+)/i.exec(req.responseText);
	if (data != null) {
		s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_done'));
		var url = data[1];
		chrome.tabs.create({ 'url': url, 'active': true, 'index' : image_data.tab_index });
		s3sg.upload.copyUploadLink(url);
		s3sg.action.end_action(image_data.tabdata);
		return 1;
	}		
	s3sg.upload.errorUpload(req);
}
//------------------------------------------------------------------------------
