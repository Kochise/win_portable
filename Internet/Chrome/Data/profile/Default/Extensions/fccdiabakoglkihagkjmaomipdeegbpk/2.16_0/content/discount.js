var s3sg = {};
s3sg.from_settings = false;

//------------------------------------------------------------------------------
s3sg.init_0 = function() {
	setTimeout(function(){ s3sg.utils.i18n_parse(document); }, 100);
	s3sg.init();
}
//------------------------------------------------------------------------------
s3sg.init = function() {
	document.getElementById('adv_accept').addEventListener('click', function(){ s3sg.discount_on(); });
	document.getElementById('adv_cancel').addEventListener('click', function(){ s3sg.discount_off(); });
	s3sg.prefs.init(s3sg.dialog_init);
}
//------------------------------------------------------------------------------
s3sg.dialog_init = function() {
	if (/from\=opt/.test(window.location.href)) {
		s3sg.from_settings = true;
	}
}
//------------------------------------------------------------------------------
s3sg.discount_on = function() {
	s3sg.pref_save("advertisement", "on", s3sg.window_close);
}
//------------------------------------------------------------------------------
s3sg.discount_off = function() {
	s3sg.pref_save("advertisement", "off", s3sg.window_close);
}
//------------------------------------------------------------------------------
s3sg.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		s3sg.utils.prefs_set(pref_name, pref_value);
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
s3sg.window_close = function() {
	if (s3sg.from_settings) {
		window.location.replace('/content/options.html#s3sg_tab_discount');
	} else {
		chrome.runtime.sendMessage({ action: 'window_close' }, function(response) {});
	}
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3sg.init_0, false);
