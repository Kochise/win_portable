s3sg.copy = {};
//------------------------------------------------------------------------------
s3sg.copy.init = function(tab_data) {
	var image_data = {
		formatMimeType : s3sg.utils.formatMimeType(),
		formatImageExt : s3sg.utils.formatImageExt(),
		site_title : tab_data.site_title,
		site_description : tab_data.site_description,
		site_url : tab_data.site_url
	};
	//------------------------------------------------------------------------
	if (image_data.formatMimeType == 'image/bmp') {
		image_data.formatMimeType = 'image/png';
		image_data.formatImageExt = 'png';
	}
	//------------------------------------------------------------------------
	else if (image_data.formatMimeType == 'image/webp') {
		image_data.formatMimeType = 'image/png';
		image_data.formatImageExt = 'png';
	}
	//------------------------------------------------------------------------
	else if (image_data.formatImageExt == 'jpg') {
		image_data.formatImageExt = 'jpeg';
	}

	//------------------------------------------------------------------------
	s3sg.copy.doAction(image_data, tab_data);
}
//------------------------------------------------------------------------------
s3sg.copy.doAction = function(image_data, tab_data) {
	if (s3sg.utils.clipboard_image_not_copy()) { return; }
	var dataUrl = tab_data.screenshot.canvas.toDataURL(image_data.formatMimeType, s3sg.utils.formatQuality(image_data.formatMimeType));
	var buffer = s3sg.utils.img_to_ArrayBuffer(dataUrl);
	try {
		chrome.clipboard.setImageData(buffer, image_data.formatImageExt);
		if (s3sg.utils.prefs_get('showCopyNotification')) {
			setTimeout(function() {
				s3sg.utils.notification_box(s3sg.utils.get_string('copy_image_done'));
			}, 100);
		}
		s3sg.action.end_action(tab_data);
	} catch (e) {};
}
//------------------------------------------------------------------------------
