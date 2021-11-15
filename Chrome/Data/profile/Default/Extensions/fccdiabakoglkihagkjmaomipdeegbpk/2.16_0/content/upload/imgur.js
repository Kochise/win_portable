s3sg.Upload_Imgur = {};
s3sg.Upload_Imgur.sid = null;
//------------------------------------------------------------------------------
s3sg.Upload_Imgur.doUpload = function(image_data) {
	if (s3sg.Upload_Imgur.sid != null) {
		s3sg.Upload_Imgur.doUpload_1(image_data);
		return;
	}
	var req = new XMLHttpRequest();
	req.open("GET", "https://imgur.com/upload/start_session", true);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var jrsp = null;
				try {
					jrsp = JSON.parse(req.responseText);
				} catch (e) {
					s3sg.upload.errorUpload(req);
					return;
				};
				s3sg.Upload_Imgur.sid = jrsp.sid;
				s3sg.Upload_Imgur.doUpload_1(image_data);
			} else {
				s3sg.upload.errorUpload(req);
			}
		}
	}
	req.send(null);
}
//------------------------------------------------------------------------------
s3sg.Upload_Imgur.doUpload_1 = function(image_data) {
	var req = new XMLHttpRequest();
	req.open("GET", "https://imgur.com/upload/checkcaptcha?total_uploads=1&create_album=0&album_title=Optional+Album+Title", true);

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var jrsp = null;
				try {
					jrsp = JSON.parse(req.responseText);
				} catch (e) {
					s3sg.upload.errorUpload(req);
					return;
				};
				if (jrsp && jrsp.success) {
					s3sg.Upload_Imgur.doUpload_2(image_data);
				} else {
					s3sg.upload.errorUpload(req);
				}
			} else {
				s3sg.upload.errorUpload(req);
			}
		}
	}
	req.send(null);
}
//------------------------------------------------------------------------------
s3sg.Upload_Imgur.doUpload_2 = function(image_data) {
	var req = new XMLHttpRequest();
	//------------------------------------------------------------------
	if (s3sg.Upload_Imgur.sid == null) {
		s3sg.Upload_Imgur.sid = s3sg.utils.random_string(26);
	}

	var send_post = new FormData();
        send_post.append('current_upload', '1');
        send_post.append('total_uploads', '1');

        send_post.append('terms', '0');
        send_post.append('gallery_type', '');
        send_post.append('location', 'inside');
        send_post.append('gallery_submit', '0');
        send_post.append('create_album', '0');
        send_post.append('album_title', 'Optional Album Title');
        send_post.append('sid', s3sg.Upload_Imgur.sid);

        send_post.append('Filedata', image_data.imgBlob, s3sg.utils.defaultFileName(image_data) + "." + image_data.formatImageExt);

	req.open("POST", "https://imgur.com/upload", true);
	req.setRequestHeader("X-Requested-With","XMLHttpRequest");
	req.setRequestHeader("x-referer", 'https://imgur.com/');
//	req.setRequestHeader("Content-type", "multipart/form-data; boundary=" + boundStr);
//	req.setRequestHeader("Content-Length", length);
//	req.setRequestHeader("Connection", "close");
//	req.overrideMimeType('text/xml');

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				s3sg.Upload_Imgur.okUpload(req, image_data);
			} else {
				var jrsp = null;
				try {
					jrsp = JSON.parse(req.responseText);
				} catch (e) {
				};
				if (jrsp && (! jrsp.success) && jrsp.data && jrsp.data.error && jrsp.data.error.message) {
					alert('https://imgur.com/' + "\n" + jrsp.data.error.message);
				}
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

	req.formatImageExt = image_data.formatImageExt;
	req.send(send_post);
}
//------------------------------------------------------------------------------
s3sg.Upload_Imgur.okUpload = function(req, image_data) {
	var jrsp = null;
	try {
		jrsp = JSON.parse(req.responseText);
	} catch (e) {
		s3sg.upload.errorUpload(req);
		return;
	};

//	{"data":{"hashes":["MfObArV","vscc7rF","quZJngf"],"hash":"quZJngf","album":false,"edit":false,"gallery":null,"gallery_type":null},"success":true,"status":200}

	if (jrsp && jrsp.success && jrsp.data.hash) {
		s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_done'));
		chrome.tabs.create({
			url: 'https://imgur.com/' + jrsp.data.hash,
			active: true,
			index : image_data.tab_index
		});
		s3sg.upload.copyUploadLink('https://imgur.com/' + jrsp.data.hash + '.' + req.formatImageExt);
		s3sg.action.end_action(image_data.tabdata);
		return 1;
	}
	s3sg.upload.errorUpload(req);
}
//------------------------------------------------------------------------------
