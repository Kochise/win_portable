var s3sg = {};
s3sg.form = null;
s3sg.engines = {};

//------------------------------------------------------------------------------
s3sg.init_0 = function() {
	chrome.runtime.sendMessage({ action_check_mhtml : true }, function(response) {
		if (response && response.saveAsMHTML) {
		} else {
			document.getElementById('button_click_save_mhtml').style.display = 'none';
			document.getElementById('hotkey_save_mhtml').style.display = 'none';
		}
		s3sg.init_pre();
	});
}
//------------------------------------------------------------------------------
s3sg.init_pre = function() {
	setTimeout(function(){ s3sg.utils.i18n_parse(document); }, 100);
	s3sg.form = document.getElementById('s3sg_form');
	//------------------------------------------------------------------------
	var current_locale = document.getElementById('current_locale');
	for (var i=0; i<s3sg.I18N_SUPPORTED.length; i++) {
		var el_lang = s3sg.I18N_SUPPORTED[i];
		var option = document.createElement("option");
		option.text = el_lang.name;
		option.value = el_lang.lang;
		current_locale.options.add(option);
	}
	//------------------------------------------------------------------------
	if (s3sg.utils.clipboard_image_not_copy()) {
		document.getElementById('button_click_copy').style.display = 'none';
		document.getElementById('hotkey_copy').style.display = 'none';
		document.getElementById('showCopyNotification_box').style.display = 'none';
	}

	//------------------------------------------------------------------------
	if (document.createElement('canvas').toDataURL('image/webp').substring(5, 15) != 'image/webp') {
		document.getElementById('webpImageQuality_block').style.display = 'none';
	}

	//------------------------------------------------------------------------
	s3sg.init_events();
	s3sg.init();
}
//------------------------------------------------------------------------------
s3sg.init = function() {
	s3sg.init_prefs();
	document.getElementById('jpgImageQuality_label').textContent = document.getElementById('jpgImageQuality').value + '%';
	document.getElementById('webpImageQuality_label').textContent = document.getElementById('webpImageQuality').value + '%';
	s3sg.uploadDisable();
	s3sg.onlyPageForce();
	s3sg.hotkeys_init();
	s3sg.discount_status();

	if (document.getElementById('buttonClickIconGeneral').value == 'menu') {
		document.getElementById("buttonClickIconAdditional").setAttribute('disabled', true);
	} else {
		document.getElementById("buttonClickIconAdditional").removeAttribute('disabled');
	}
	//------------------------------------------------------------------------
	if (! /^on|off$/.test(s3sg.prefs.list.advertisement)) {
		document.getElementById("s3sg_tab_discount_label").style.display = 'none';
		document.getElementById("s3sg_tab_discount").style.display = 'none';
	}
	//------------------------------------------------------------------------
	var show_tab = window.location.hash || '';
	if (show_tab) {
		tabs.showTab(null, show_tab);
	}
}
//------------------------------------------------------------------------------
s3sg.init_events = function() {
	s3sg.form.addEventListener('submit', function(event){
		event.stopPropagation();
		event.preventDefault();
	});

	var input_list = document.getElementsByTagName('input');
	for (var i=0; i<input_list.length; i++) {
		if (input_list[i].getAttribute('clickSelectsAll')) {
			input_list[i].addEventListener('click', function(event){
				this.select();
			});
		}
	}

	document.getElementById('templateFileName_label').addEventListener('click', function(){ s3sg.setDefaultFileName(); });
	document.getElementById('templateImageName_label').addEventListener('click', function(){ s3sg.setDefaultImageName(); });
	document.getElementById('jpgImageQuality').addEventListener('change', function(event){ s3sg.changeJpgImageQuality(event.target.value); });
	document.getElementById("jpgImageQuality_reset").addEventListener('click', function(){ s3sg.changeJpgImageQuality(70); });
	document.getElementById('webpImageQuality').addEventListener('change', function(event){ s3sg.changeWebpImageQuality(event.target.value); });
	document.getElementById("webpImageQuality_reset").addEventListener('click', function(){ s3sg.changeWebpImageQuality(70); });
	document.getElementById("prefs_button_plus").addEventListener('click', function(){ s3sg.hotkey_plus(); });

	document.getElementById('buttonClickIconGeneral').addEventListener('change', function(){
		if (document.getElementById('buttonClickIconGeneral').value == 'menu') {
			document.getElementById("buttonClickIconAdditional").setAttribute('disabled', true);
		} else {
			document.getElementById("buttonClickIconAdditional").removeAttribute('disabled');
		}
	});

	document.getElementById('reset_settings').addEventListener('click', function(){ s3sg.reset_settings(); });
	document.getElementById('close_settings').addEventListener('click', function(){ s3sg.window_close(); });
	document.getElementById("discount_change_status").addEventListener('click', function(){ s3sg.discount_change_status(); });
}
//------------------------------------------------------------------------------
s3sg.window_close = function() {
	chrome.runtime.sendMessage({ action: 'window_close' }, function(response) {});
}
//------------------------------------------------------------------------------
s3sg.init_prefs = function() {
	for (var pref_name in s3sg.prefs.list) {
		var pref_value = s3sg.prefs.list[pref_name];
		var pref_el = s3sg.form[pref_name];
		if (pref_el) {
			if (pref_el.type && (pref_el.type == 'checkbox')) {
				pref_el.checked = pref_value;
			} else {
				pref_el.value = pref_value;
			}
		}
	}
	//------------------------------------------------------------------------
	s3sg.form.addEventListener('change', function(event){
		var pref_el = event.target;
		if (! pref_el.name) { return; }
		if (s3sg.prefs.list[pref_el.name] === undefined) { return; }
		//-----------------------------------------------------
		var callback = null;
		var pref_value = pref_el.value;
		//-----------------------------------------------------
		if (pref_el.type && (pref_el.type == 'checkbox')) {
			pref_value = pref_el.checked;
		}
		//-----------------------------------------------------
		if (pref_el.name == 'current_locale') {
			callback = function() {
				s3sg.i18n.init(pref_value);
				s3sg.utils.i18n_parse(document);
			}
		}
		//-----------------------------------------------------
		else if (pref_el.name == 'jpgImageQuality') {
			pref_value = parseInt(pref_el.value);
		}
		//-----------------------------------------------------
		else if (pref_el.name == 'webpImageQuality') {
			pref_value = parseInt(pref_el.value);
		}
		//-----------------------------------------------------
		s3sg.pref_save(pref_el.name, pref_value, callback);
		pref_el.blur();
	});
}
//------------------------------------------------------------------------------
s3sg.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		s3sg.utils.prefs_set(pref_name, pref_value);
		if (callback) {
			callback();
		}
		s3sg.save_settings_message();
		s3sg.uploadDisable();
		s3sg.onlyPageForce();
	});
}
//------------------------------------------------------------------------------
s3sg.reset_settings = function() {
	if (confirm(s3sg.utils.get_string('confirm_warning'))) {
		chrome.runtime.sendMessage({ 'action_reset_defaults': true }, function(response) {
			s3sg.prefs.reset_defaults(function(){
				s3sg.utils.i18n_parse(document);
				s3sg.init();
				s3sg.save_settings_message();
				window.location.reload();
			});
		});
	}
}
//------------------------------------------------------------------------------
s3sg.save_settings_message = function() {
	document.getElementById("settings_saved").removeAttribute('is_hidden');
	setTimeout(function(){
		document.getElementById("settings_saved").setAttribute('is_hidden', true);
	}, 500);
}
//------------------------------------------------------------------------------
s3sg.setDefaultFileName = function() {
	if (confirm(s3sg.utils.get_string('reset_to_default'))) {
		document.getElementById('templateFileName').value = '{#TITLE#} - {#YYYY#}-{#MM#}-{#DD#}_{#H#}.{#M#}.{#S#}';
		s3sg.pref_save('templateFileName', '{#TITLE#} - {#YYYY#}-{#MM#}-{#DD#}_{#H#}.{#M#}.{#S#}');
	}
}
//------------------------------------------------------------------------------
s3sg.setDefaultImageName = function() {
	if (confirm(s3sg.utils.get_string('reset_to_default'))) {
		document.getElementById('templateImageName').value = '{#URL#}';
		s3sg.pref_save('templateImageName', '{#URL#}');
	}
}
//------------------------------------------------------------------------------
s3sg.changeJpgImageQuality = function(value) {
	document.getElementById('jpgImageQuality_label').textContent = value + '%';
	document.getElementById('jpgImageQuality').value = value;
	s3sg.pref_save('jpgImageQuality', parseInt(value));
}
//------------------------------------------------------------------------------
s3sg.changeWebpImageQuality = function(value) {
	document.getElementById('webpImageQuality_label').textContent = value + '%';
	document.getElementById('webpImageQuality').value = value;
	s3sg.pref_save('webpImageQuality', parseInt(value));
}
//------------------------------------------------------------------------------
s3sg.uploadDisable = function() {
	if (s3sg.prefs.list.uploadDisable) {
		document.getElementById('uploadStorageLabel').setAttribute("disabled", true);
		document.getElementById('uploadStorage_s3blog').setAttribute("disabled", true);
		document.getElementById('uploadStorage_share_pho_to').setAttribute("disabled", true);
		document.getElementById('uploadStorage_imgur').setAttribute("disabled", true);
		document.getElementById('uploadStorage_imagebam').setAttribute("disabled", true);
		document.getElementById('uploadStorage_lut_im').setAttribute("disabled", true);
		document.getElementById('uploadStorage_snag_gy').setAttribute("disabled", true);
		document.getElementById('uploadClipboardLink').setAttribute("disabled", true);

		document.getElementById('button_click_upload').style.display = 'none';
		document.getElementById('hotkey_upload').style.display = 'none';
	} else {
		document.getElementById('uploadStorageLabel').removeAttribute("disabled");
		document.getElementById('uploadStorage_s3blog').removeAttribute("disabled");
		document.getElementById('uploadStorage_share_pho_to').removeAttribute("disabled");
		document.getElementById('uploadStorage_imgur').removeAttribute("disabled");
		document.getElementById('uploadStorage_imagebam').removeAttribute("disabled");
		document.getElementById('uploadStorage_lut_im').removeAttribute("disabled");
		document.getElementById('uploadStorage_snag_gy').removeAttribute("disabled");
		document.getElementById('uploadClipboardLink').removeAttribute("disabled");

		document.getElementById('button_click_upload').style.display = '';
		document.getElementById('hotkey_upload').style.display = '';
	}
}
//------------------------------------------------------------------------------
s3sg.onlyPageForce = function() {
	if (s3sg.prefs.list.onlyPageForce) {
		document.getElementById('button_click_capture_page').style.display = 'none';
		document.getElementById('hotkey_capture_page').style.display = 'none';
	} else {
		document.getElementById('button_click_capture_page').style.display = '';
		document.getElementById('hotkey_capture_page').style.display = '';
	}
}
//------------------------------------------------------------------------------
s3sg.hotkeys_init = function() {
	for (var i=0; i<s3sg.prefs.list.hotkeys.length; i++) {
		var key = s3sg.prefs.list.hotkeys[i];
		var hotkeys_box = s3sg.hotkey_plus();
		hotkeys_box.s3sg_key = key;
		s3sg.utils.get_element(hotkeys_box, 'hotkeys_textbox').value = s3sg.hotkeys_string(key);
		s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_method').value = key.method;
		s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_target').value = key.target;
		s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_closetab').checked = key.closetab;
	}
}
//------------------------------------------------------------------------------
s3sg.hotkey_plus = function() {
	var hotkeys_box = document.getElementById('hotkeys_box').cloneNode(true);
	var table = document.getElementById('hotkeys_list');
	var row = table.insertRow(table.rows.length);
	var cell = row.insertCell(0);
	cell.appendChild(hotkeys_box);

	s3sg.utils.get_element(hotkeys_box, 'prefs_button_minus').addEventListener('click', function() {
		s3sg.hotkey_minus(this);
	});
	s3sg.utils.get_element(hotkeys_box, 'hotkeys_textbox').addEventListener('click', function() {
		this.select();
	});
	s3sg.utils.get_element(hotkeys_box, 'hotkeys_textbox').addEventListener('keydown', function(event) {
		s3sg.hotkey_input(event, this);
	});
	s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_method').addEventListener('click', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.s3sg_key) {
			hotkeys_box.s3sg_key.method = this.value;
			s3sg.hotkey_save();
		}
	});
	s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_method').addEventListener('change', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.s3sg_key) {
			hotkeys_box.s3sg_key.method = this.value;
			s3sg.hotkey_save();
		}
	});
	s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_target').addEventListener('click', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.s3sg_key) {
			hotkeys_box.s3sg_key.target = this.value;
			s3sg.hotkey_save();
		}
	});
	s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_target').addEventListener('change', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.s3sg_key) {
			hotkeys_box.s3sg_key.target = this.value;
			s3sg.hotkey_save();
		}
	});
	s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_closetab').addEventListener('click', function(event) {
		var hotkeys_box = this.parentNode.parentNode;
		if (hotkeys_box.s3sg_key) {
			hotkeys_box.s3sg_key.closetab = this.checked;
			s3sg.hotkey_save();
		}
	});

	return hotkeys_box;
}
//------------------------------------------------------------------------------
s3sg.hotkey_minus = function(el) {
	el.parentNode.s3sg_key = null;
	el.parentNode.style.display = 'none';
	s3sg.hotkey_save();
}
//------------------------------------------------------------------------------
s3sg.hotkey_input = function(event, el) {
	event.preventDefault();
	event.stopPropagation();
	event.stopImmediatePropagation();

	var hotkeys_box = el.parentNode;
	var key = {};

	key.shiftKey = event.shiftKey;
	key.ctrlKey = event.ctrlKey;
	key.altKey = event.altKey;
	key.keyCode = event.keyCode;
	key.key = event.key;
	key.method = s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_method').value;
	key.target = s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_target').value;
	key.closetab = s3sg.utils.get_element(hotkeys_box, 'hotkeys_list_closetab').checked;

	if (key.ctrlKey || key.altKey) {
		if ((key.keyCode != 16) && (key.keyCode != 17) && (key.keyCode != 18)) {
			s3sg.utils.get_element(hotkeys_box, 'hotkeys_textbox').value = s3sg.hotkeys_string(key);
			hotkeys_box.s3sg_key = key;
			s3sg.hotkey_save();
		}
	}
}
//------------------------------------------------------------------------------
s3sg.hotkeys_string = function(key) {
	var str = [];

	if (key.ctrlKey) { str.push('Ctrl'); }
	if (key.altKey) { str.push('Alt'); }
	if (key.shiftKey) { str.push('Shift'); }

	if (key.key.length > 1) {
		str.push(key.key);
	}
	else if ((key.keyCode >= 32) && (key.keyCode < 127)) {
		str.push(String.fromCharCode(key.keyCode).toUpperCase());
	} 
	else if (key.key) {
		str.push(key.key.toUpperCase());
	}

	return str.join(' + ');
}
//------------------------------------------------------------------------------
s3sg.hotkey_save = function() {
	var table = document.getElementById('hotkeys_list');
	var hotkeys = [];

	for (var i=0; i<table.rows.length; i++) {
		var hotkeys_box = s3sg.utils.get_element(table.rows[i], 'hotkeys_box');
		if (hotkeys_box.s3sg_key) {
			hotkeys.push(hotkeys_box.s3sg_key);
		}
	}

	s3sg.pref_save('hotkeys', hotkeys);
}
//-------------------------------------------------------------------------------------------
s3sg.discount_change_status = function() {
	window.location.replace('/content/discount.html?from=opt');
}
//-------------------------------------------------------------------------------------------
s3sg.discount_status = function() {
	if (s3sg.prefs.list.advertisement == 'off') {
		document.getElementById('discount_is_enabled').hidden = true;
		document.getElementById('discount_is_disabled').hidden = false;
	} else {
		document.getElementById('discount_is_enabled').hidden = false;
		document.getElementById('discount_is_disabled').hidden = true;
	}
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.addEventListener("load", function(){
	s3sg.prefs.init(s3sg.init_0);
});
