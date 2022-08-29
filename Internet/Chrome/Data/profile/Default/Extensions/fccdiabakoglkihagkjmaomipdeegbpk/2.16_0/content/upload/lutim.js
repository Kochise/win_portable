s3sg.Upload_Lutim = {};
//------------------------------------------------------------------------------
s3sg.Upload_Lutim.doUpload = function(image_data) {
	var req = new XMLHttpRequest();
	//------------------------------------------------------------------
	var send_post = new FormData();
	send_post.append('format', 'json');
	send_post.append('first-view', '0');
	send_post.append('delete-day', '365');
	send_post.append('crypt', '0');
	send_post.append('keep-exif', '0');
	send_post.append('file', image_data.imgBlob, s3sg.utils.defaultFileName(image_data) + "." + image_data.formatImageExt);

	req.open("POST", 'https://lut.im/', true);

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				s3sg.Upload_Lutim.okUpload(req, image_data);
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
s3sg.Upload_Lutim.okUpload = function(req, image_data) {
	var jrsp = null;
	try {
		jrsp = JSON.parse(req.responseText);
	} catch (e) {
		s3sg.upload.errorUpload(req);
		return;
	};
	if (jrsp.success) {
		s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_done'));
		chrome.tabs.create(
			{ 'url': 'https://lut.im/', 'active': true, 'index' : image_data.tab_index },
			function(tab) {
				var handler = function(tabId, changeInfo) {
					if ((tabId === tab.id) && (changeInfo.status === "complete")) {
						chrome.tabs.onUpdated.removeListener(handler);
//						chrome.tabs.sendMessage(tabId, {url: url, data: data});
						chrome.tabs.executeScript(tab.id, { 'file': '/content/upload/lutim_page.js' }, function(callback) {
							if (chrome.runtime.lastError) {}
							chrome.tabs.sendMessage(tab.id, { 'action' : 'lutim_done', 'data' :  jrsp }, function() {});
						});
					}
				}
				chrome.tabs.onUpdated.addListener(handler);
			}
		);
		s3sg.upload.copyUploadLink('https://lut.im/' + jrsp.msg.short + '.' + jrsp.msg.ext);
		s3sg.action.end_action(image_data.tabdata);
		return 1;
	}		
	s3sg.upload.errorUpload(req);
}
//------------------------------------------------------------------------------
