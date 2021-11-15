s3sg.prefs = {};
s3sg.prefs.list = {};

//------------------------------------------------------------------------------
s3sg.prefs.init = function(callback) {
	chrome.storage.local.get(function(items) {
		s3sg.prefs.list = items;

		if (s3sg.i18n) {
			s3sg.i18n.init(items.current_locale);
		}

		s3sg.prefs.check_defaults();
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
s3sg.prefs.set = function(pref) {
	var pref_hash = {};
	pref_hash[pref.name] = pref.value;
	chrome.storage.local.set(pref_hash);
	s3sg.prefs.list[pref.name] = pref.value;
}
//------------------------------------------------------------------------------
s3sg.prefs.get = function(pref_name) {
	return s3sg.prefs.list[pref_name];
}
//------------------------------------------------------------------------------
s3sg.prefs.check_defaults = function() {
	var defaults = s3sg.utils.clone_object(s3sg.prefs.defaults);

	for (var pref_name in defaults) {
		if (s3sg.prefs.list[pref_name] === undefined) {
			s3sg.prefs.list[pref_name] = defaults[pref_name];
		}
		else if (typeof(s3sg.prefs.list[pref_name]) != typeof(defaults[pref_name])) {
			s3sg.prefs.list[pref_name] = defaults[pref_name];
		}
	}
}
//------------------------------------------------------------------------------
s3sg.prefs.reset_defaults = function(callback) {
	chrome.storage.local.clear(function() {
		s3sg.prefs.list = {};
		s3sg.prefs.check_defaults();
		if (s3sg.i18n) {
			s3sg.i18n.init();
		}
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
s3sg.prefs.defaults = {
	'current_version' : '0',
	'not_open_contribute_page' : false,
	'show_page_timer' : 0, 
	'advertisement' : 'wait',		// wait, check, on, off

	'templateFileName' : '{#TITLE#} - {#YYYY#}-{#MM#}-{#DD#}_{#H#}.{#M#}.{#S#}',
	'templateImageName' : '{#URL#}',
	
	'convertumlaute' : false,
	'onlyascii' : false,
	'replaceCharInFilename' : "_",
	
	'imageFormat' : 'png', // png, jpg, bmp, webp
	'jpgImageQuality' : 70,
	'webpImageQuality' : 70,
	'insertTextInImage' : false,
	'uploadLinkToClipboard' : false,
	'uploadStorage' : 's3blog.org',
	'uploadDisable' : false,
	'onlyPageForce' : false,

	'defaultSavePath' : 'ScreenGrab',
	'quicklySave' : false,

	'showInContextMenu' : true,
	'showCopyNotification' : true,

	'buttonClickIconGeneral' : 'menu',
	'buttonClickIconAdditional' : 'visible_portion',

	'hotkeys' : [{ shiftKey:true, ctrlKey:true, altKey:false, keyCode:49, key:'!', method:'preview', target: 'visible_portion' , closetab: false }],

	'selection.savePosition' : false,
	'selection.startX' : 0,
	'selection.startY' : 0,
	'selection.width' : 0,
	'selection.height' : 0,
	'selection.scrollX' : 0,
	'selection.scrollY' : 0,
	'selection.fastMode' : false,
	'selection.hide_hint_text' : false,

	'last_operation' : { 'method' : 'save', 'target' : 'page' },

	'_end' : '_end'
};
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3sg.prefs.init();
