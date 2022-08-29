s3sg.upload = {};
//------------------------------------------------------------------------------
s3sg.upload.init = function(tab_data) {
	var image_data = {
		formatMimeType : s3sg.utils.formatMimeType(),
		formatImageExt : s3sg.utils.formatImageExt(),
		site_title : tab_data.site_title,
		site_description : tab_data.site_description,
		site_url : tab_data.site_url,
		tab_index : tab_data.index+1,
		tabdata : tab_data
	};
	s3sg.upload.doAction(image_data, tab_data);
}
//------------------------------------------------------------------------------
s3sg.upload.doAction = function(image_data, tab_data) {
	var dataUrl = tab_data.screenshot.canvas.toDataURL(image_data.formatMimeType, s3sg.utils.formatQuality(image_data.formatMimeType));
	image_data.imgBlob = s3sg.utils.img_to_blob(dataUrl, image_data.formatMimeType);

	//------------------------------------------------------------------------
	if (image_data.imgBlob.size > 10000000) {
		if (image_data.formatMimeType != 'image/jpeg') {
			if (confirm(s3sg.utils.get_string('upload_png_large'))) {
				image_data.formatMimeType = 'image/jpeg';
				image_data.formatImageExt = 'jpg';
				return s3sg.upload.doAction(image_data, tab_data);
			} else {
				return false;
			}
		}
		else {
			s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_is_big'));
			return 0;
		}
	}
	//------------------------------------------------------------------------
	var upload_storage = s3sg.utils.prefs_get('uploadStorage');
	if (upload_storage == 'share.pho.to') {
		s3sg.Upload_PhoToS3.doUpload(image_data, true);
	} else if (upload_storage == 'imgur.com') {
		s3sg.Upload_Imgur.doUpload(image_data);
	} else if (upload_storage == 'imagebam.com') {
		s3sg.Upload_Imagebam.doUpload(image_data);
	} else if (upload_storage == 'lut.im') {
		s3sg.Upload_Lutim.doUpload(image_data);
	} else if (upload_storage == 'snag.gy') {
		s3sg.Upload_Snaggy.doUpload(image_data);
	} else {
		s3sg.Upload_PhoToS3.doUpload(image_data);
	}
}
//------------------------------------------------------------------------------
s3sg.upload.errorUpload = function(req) {
	s3sg.utils.notification_box(s3sg.utils.get_string('upload_image_error'));
	return false;
};
//-------------------------------------------------------------------
s3sg.upload.copyUploadLink = function(link) {
	if (s3sg.utils.prefs_get('uploadLinkToClipboard')) {
		s3sg.utils.clipboard_copy(link);
	}
}
//-------------------------------------------------------------------
