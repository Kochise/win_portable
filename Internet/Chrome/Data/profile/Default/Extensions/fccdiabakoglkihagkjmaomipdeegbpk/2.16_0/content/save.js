s3sg.save = {};
//------------------------------------------------------------------------------
s3sg.save.init = function(tab_data, save_mhtml) {
	var image_data = {
		formatMimeType : s3sg.utils.formatMimeType(),
		formatImageExt : s3sg.utils.formatImageExt(),
		site_title : tab_data.site_title,
		site_description : tab_data.site_description,
		site_url : tab_data.site_url
	};

	s3sg.save.doAction(image_data, tab_data, save_mhtml);
}
//------------------------------------------------------------------------------
s3sg.save.doAction = function(image_data, tab_data, save_mhtml) {
	var dataUrl = s3sg.utils.canvas_toDataURL(tab_data.screenshot.canvas, image_data.formatMimeType, s3sg.utils.formatQuality(image_data.formatMimeType));
	image_data.imgBlob = s3sg.utils.img_to_blob(dataUrl, image_data.formatMimeType);
	image_data.file_name = s3sg.utils.defaultFileName(image_data) + "." + image_data.formatImageExt;

	var image_url = URL.createObjectURL(image_data.imgBlob);
	var filename_path = '/' + s3sg.utils.prefs_get('defaultSavePath') + '/' + image_data.file_name;
	filename_path = filename_path.replace(/\/\.+\//g, '/').replace(/\/+/g, '/').replace(/^\/+/g, '');

	chrome.downloads.download({
		url: image_url,
		filename: filename_path,
		saveAs: ! s3sg.utils.prefs_get('quicklySave')
	}, function (downloadId) {
		if (s3sg.utils.prefs_get('quicklySave')) {
			s3sg.utils.notification_box(s3sg.utils.get_string('save_image_done'));
		}
		if (save_mhtml && chrome.pageCapture && chrome.pageCapture.saveAsMHTML) {
			s3sg.save.doAction_mhtml(tab_data, filename_path);
		} else {
			s3sg.action.end_action(tab_data);
		}
	});
}
//------------------------------------------------------------------------------
s3sg.save.doAction_mhtml = function(tab_data, filename_path) {
	chrome.pageCapture.saveAsMHTML({ tabId: tab_data.id }, function(mhtmlData){
		var mhtml_url = URL.createObjectURL(mhtmlData);
		filename_path = filename_path.replace(/[^\.]+$/, 'mht');  // Google Chrome painfully reacts to the file "*.mhtml"
	
		chrome.downloads.download({
			url: mhtml_url,
			filename: filename_path,
			saveAs: ! s3sg.utils.prefs_get('quicklySave')
		}, function (downloadId) {
			s3sg.action.end_action(tab_data);
		});
	});
}
//------------------------------------------------------------------------------
