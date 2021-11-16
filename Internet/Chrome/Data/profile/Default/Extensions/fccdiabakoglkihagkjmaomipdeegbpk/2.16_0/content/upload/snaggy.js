s3sg.Upload_Snaggy = {};
s3sg.Upload_Snaggy.csrftoken = null;
//------------------------------------------------------------------------------
s3sg.Upload_Snaggy.doUpload = function(image_data) {
	if (s3sg.Upload_Snaggy.csrftoken != null) {
		s3sg.Upload_Snaggy.doUpload_1(image_data);
		return;
	}
	var req = new XMLHttpRequest();
	req.open("GET", "https://snag.gy/", true);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var responseText = req.responseText.replace(/\s/g, '');
				var result = /csrf_token='(.+)';/i.exec(responseText);
				if (result == null)  {
					s3sg.upload.errorUpload(req);
				}
				s3sg.Upload_Snaggy.csrftoken = result[1];
				s3sg.Upload_Snaggy.doUpload_1(image_data);
			} else {
				s3sg.upload.errorUpload(req);
			}
		}
	}
	req.send(null);
}
//------------------------------------------------------------------------------
s3sg.Upload_Snaggy.doUpload_1 = function(image_data) {
	var req = new XMLHttpRequest();
	req.open("POST", "https://snag.gy/api/prepareForImageUpload", true);
	req.setRequestHeader("X-Requested-With","XMLHttpRequest");
	req.setRequestHeader("x-referer", 'https://snag.gy/');
	req.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8');


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
				if (jrsp && jrsp.form) {
					s3sg.Upload_Snaggy.doUpload_2(image_data, jrsp);
				} else {
					s3sg.upload.errorUpload(req);
				}
			} else {
				s3sg.upload.errorUpload(req);
			}
		}
	}
	var body = 'csrfmiddlewaretoken=' + encodeURIComponent(s3sg.Upload_Snaggy.csrftoken) + '&token=&type=' + encodeURIComponent(image_data.formatMimeType);
	req.send(body);
}
//------------------------------------------------------------------------------
s3sg.Upload_Snaggy.doUpload_2 = function(image_data, jrsp) {
	var req = new XMLHttpRequest();

	var send_post = new FormData();
        send_post.append('acl', 'public-read');
        send_post.append('key', jrsp.form.fields.key);
        send_post.append('signature', jrsp.form.fields.signature);
        send_post.append('policy', jrsp.form.fields.policy);
        send_post.append('AWSAccessKeyId', jrsp.form.fields.AWSAccessKeyId);
        send_post.append('x-amz-security-token', jrsp.form.fields['x-amz-security-token']);

        send_post.append('Content-Type', image_data.formatMimeType);
        send_post.append('file', image_data.imgBlob, s3sg.utils.defaultFileName(image_data) + "." + image_data.formatImageExt);

	req.open("POST", "https://s3.amazonaws.com/i.snag.gy", true);
	req.setRequestHeader("X-Requested-With","XMLHttpRequest");
	req.setRequestHeader("x-referer", jrsp.info.url);

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if ((req.status == 200) || (req.status == 204)) {
				s3sg.Upload_Snaggy.okUpload(jrsp, image_data);
			} else {
				try {
					jrsp = JSON.parse(req.responseText);
				} catch (e) {
				};
				if (jrsp && (! jrsp.success) && jrsp.error) {
					alert('https://snag.gy/' + "\n" + jrsp.error);
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
s3sg.Upload_Snaggy.okUpload = function(jrsp, image_data) {
	s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_done'));
	chrome.tabs.create({
		url: 'https://snag.gy/' + jrsp.form.fields.key,
		active: true,
		index : image_data.tab_index
	});
	s3sg.upload.copyUploadLink(jrsp.info.url);
	s3sg.action.end_action(image_data.tabdata);
	return 1;
}
//------------------------------------------------------------------------------
