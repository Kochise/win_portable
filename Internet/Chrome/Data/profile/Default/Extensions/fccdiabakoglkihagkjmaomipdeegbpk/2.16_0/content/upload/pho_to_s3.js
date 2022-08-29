s3sg.Upload_PhoToS3 = {};

//------------------------------------------------------------------------------
s3sg.Upload_PhoToS3.doUpload = function(image_data, only_pho_to) {
	//------------------------------------------------------------------------
	var req = new XMLHttpRequest();
//	req.open("POST", 'http://share.pho.to/photosets', false);
	req.open("POST", 'http://api.share.pho.to/v1/photosets', false);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//        req.setRequestHeader("Referer", 'http://share.pho.to/');
	req.send('app_key=1effede988baac0fe3171eb69a41a25b');
	var jrsp = null;
	try {
		jrsp = JSON.parse(req.responseText);
	} catch (e) {
		s3sg.upload.errorUpload(req);
		return;
	};
	var admin_token_param = '';
	var image_id_param = '';
	if (jrsp && jrsp.admin_token && jrsp.id) {
		admin_token_param = jrsp.admin_token;
		image_id_param = jrsp.id;
	} else {
		s3sg.upload.errorUpload(req);
		return;
	}

	var send_post = new FormData();
        send_post.append('admin_token', admin_token_param);
        send_post.append('images[src_type]', 'file');
        send_post.append('images[src]', image_data.imgBlob, s3sg.utils.defaultFileName(image_data) + "." + image_data.formatImageExt);

	req.open("POST", "http://api.share.pho.to/v1/photosets/" + image_id_param, true);
/*
	req.setRequestHeader("Content-type", "multipart/form-data; boundary=" + boundStr);
	req.setRequestHeader("Content-Length", length);
	req.setRequestHeader("Connection", "close");
	req.overrideMimeType('text/xml');
*/
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				s3sg.Upload_PhoToS3.okUpload(req, image_data);
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

	req.site_title = image_data.site_title;
	req.site_description = image_data.site_description;
	req.site_url = image_data.site_url;
	req.only_pho_to = only_pho_to;

	req.send(send_post);
}
//------------------------------------------------------------------------------
s3sg.Upload_PhoToS3.okUpload = function(req, image_data) {
	var jrsp = null;
	try {
		jrsp = JSON.parse(req.responseText);
	} catch (e) {
		s3sg.upload.errorUpload(req);
		return;
	};

//	{"id":"1iri0","mode":0,"comments_enabled":true,"created_at":"2014-02-10 08:06:53","page_views":0,
//		"links":{
//			"self":"http:\/\/api.share.pho.to\/v1\/photosets\/1iri0",
//			"web_page":"http:\/\/pho.to\/1iri0",
//			"delete_page":"http:\/\/share.pho.to\/delete\/1iri0.799686.e87bfc3590eb814bf3f82a402d06e47483968783",
//			"admin_page":"http:\/\/share.pho.to\/1iri0\/auth?token=1iri0.799686.e87bfc3590eb814bf3f82a402d06e47483968783"
//		},
//		"admin_token":"1iri0.799686.e87bfc3590eb814bf3f82a402d06e47483968783",
//		"images":[
//			{"id":"yc","name":"1a5c2c71","comments_enabled":true,"created_at":"2014-02-10 08:06:54","page_views":0,"avg_color":"#f2f3f4","aspect_ratio":0.50199,
//			"format":"jpeg","width":126,"height":251,"size":4409,"set_id":"1iri0","order":0,
//			"links":{"self":"http:\/\/api.share.pho.to\/v1\/photosets\/1iri0\/yc","original":"http:\/\/i.share.pho.to\/1a5c2c71_o.jpeg","large":"http:\/\/i.share.pho.to\/1a5c2c71_o.jpeg","medium":"http:\/\/i.share.pho.to\/1a5c2c71_o.jpeg","small_square":"http:\/\/i.share.pho.to\/1a5c2c71_ss.jpeg","web_page":"http:\/\/pho.to\/1iri0\/yc","delete_page":"http:\/\/share.pho.to\/delete\/yc\/1iri0.655364.6fbc583d4117982cbfdd27ab432aa98a995613cf"}
//			}
//		]
//	}

//	if (jrsp && (Object.prototype.toString.call(jrsp) === "[object Array]") && jrsp[0].admin_token) {
	if (jrsp && jrsp.admin_token) {
		s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_done'));
		if (req.only_pho_to) {
			chrome.tabs.create({ url: jrsp.links.admin_page, active: true, 'index' : image_data.tab_index });
		} else {
			s3sg.utils.postData('http://www.s3blog.org/screengrab/create.html', { json : req.responseText, title : req.site_title, descr : req.site_description, url : req.site_url, 'tab_index' : image_data.tab_index });
		}
		s3sg.upload.copyUploadLink(jrsp.images[0].links.original);
		s3sg.action.end_action(image_data.tabdata);
		return 1;
	}
	s3sg.upload.errorUpload(req);
}
//------------------------------------------------------------------------------
