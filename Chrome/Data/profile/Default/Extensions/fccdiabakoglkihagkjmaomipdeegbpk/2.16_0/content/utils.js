s3sg.utils = {};

//------------------------------------------------------------------------------
s3sg.utils.console_log = function(msg) {
	console.log('%O', msg);
}
//------------------------------------------------------------------------------
s3sg.utils.prefs_get = function(pref_name) {
	return s3sg.prefs.get(pref_name);
}
//------------------------------------------------------------------------------
s3sg.utils.prefs_set = function(pref_name, pref_value) {
	s3sg.prefs.set({ 'name' : pref_name, 'value' : pref_value });
	return true;
}
//------------------------------------------------------------------------------
s3sg.utils.get_string = function(name, params) {
	var result = '';
	if (! params) { params = [] }

	try {
		result = s3sg.i18n.get_string(name, params);
	} catch(e) {
		result = name + e;
	}
	return result || name;
}
//------------------------------------------------------------------------------
s3sg.utils.clone_object = function(object) {
	return JSON.parse(JSON.stringify(object));
}
//------------------------------------------------------------------------------
s3sg.utils.get_element = function(parent, search_id) {
	if (parent == null) { return null; };

	for (var i=0; i<parent.childNodes.length; i++) {
		var el = parent.childNodes[i];
		if (el.id == search_id) {
			return el;
		}
		if (el.hasChildNodes()) {
			var res = s3sg.utils.get_element(el, search_id);
			if (res != null) {
				return res;
			}
		}
	}
	return null;
}
//------------------------------------------------------------------------------
s3sg.utils.HTMLDOM_value = function(html_element, value) {
	var tagName = html_element.tagName.toUpperCase();
	var is_input_tag = ((tagName == 'INPUT') || (tagName == 'TEXTAREA')) ? true : false;

	if (value === undefined) {
		return (is_input_tag) ? html_element.value : html_element.textContent;
	} else {
		if (is_input_tag) {
			html_element.value = value;
		} else {
			html_element.textContent = value;
		}
		return;
	}
}
//------------------------------------------------------------------------------
s3sg.utils.i18n_parse = function(doc) {
	s3sg.i18n.parse_html(doc);
}
//-------------------------------------------------------------------------------------------
s3sg.utils.formatMimeType = function() {
	var formatMimeType = s3sg.utils.prefs_get('imageFormat');
	if (formatMimeType == 'png') {
		return "image/png";
	} else if (formatMimeType == 'bmp') {
		return "image/bmp";
	} else if (formatMimeType == 'webp') {
		return "image/webp";
	} else {
		return "image/jpeg";
	}
}
//-------------------------------------------------------------------------------------------
s3sg.utils.formatImageExt = function() {
	var formatMimeType = s3sg.utils.prefs_get('imageFormat');
	if (formatMimeType == 'png') {
		return "png";
	} else if (formatMimeType == 'bmp') {
		return "bmp";
	} else if (formatMimeType == 'webp') {
		return "webp";
	} else {
		return "jpg";
	}
}
//-------------------------------------------------------------------------------------------
s3sg.utils.formatQuality = function(mimeType) {
	if (mimeType == "image/jpeg") {
		return s3sg.utils.prefs_get('jpgImageQuality') / 100;
	}
	else if (mimeType == "image/webp") {
		return s3sg.utils.prefs_get('webpImageQuality') / 100;
	}
	return "";
}
//-------------------------------------------------------------------------------------------
s3sg.utils.canvas_toDataURL = function(canvas, formatMimeType, formatQuality) {
	if (formatMimeType == 'image/bmp') {
		return s3sg.CanvasToBMP.toDataURL(canvas);
	} else {
		return canvas.toDataURL(formatMimeType, formatQuality);
	}
}
//-------------------------------------------------------------------------------------------
s3sg.utils.img_to_blob = function(dataURI, mimeType) {
	var ab = s3sg.utils.img_to_ArrayBuffer(dataURI);
	var blob = new Blob([ab], { type: mimeType });
	return blob;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.img_to_ArrayBuffer = function(dataURI) {
	var byteString = atob(dataURI.split(',')[1]);

// this is slow...
//	var imageData = Uint8Array.from(byteString, c => c.charCodeAt(0)).buffer;
//	return imageData;

// this is faster...
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return ab;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.notification_box = function(msg, title) {
	if (! title) {
		title = s3sg.utils.get_string('extension_name');
	}
	//-------------------------------------------------------------------------------------
	var params = {
		'type' : 'basic',
		'isClickable' : false,
		'iconUrl' : '/skin/screengrab_80_icon.png',
		'title' : title,
		'message' : String(msg)
	};
//	chrome.notifications.create(title + " notification." + Math.random(), params, function(notificationId){
	chrome.notifications.create(title + " notification", params, function(notificationId){
		setTimeout(function() {  chrome.notifications.clear(notificationId); }, 2000);
	});
}
//-------------------------------------------------------------------------------------------
s3sg.utils.urlencode = function(str) {
	str = (str + '').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
//-------------------------------------------------------------------------------------------
s3sg.utils.getReplaceCharInFilename = function() {
	var char = s3sg.utils.prefs_get('replaceCharInFilename');
	if ((char != "_") && (char != "-") && (char != ".") && (char != " ")) {
		char = "_";
	}
	return char;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.sanitiseName = function(name) {
	var replaceChar = s3sg.utils.getReplaceCharInFilename();
//	return name.replace(/[\/\\\:\*\?\'\"\<\>\|\s]/g, replaceChar).replace(new RegExp("\\" + replaceChar + "+",'g'), replaceChar);
	return name.replace(/[\/\\\:\*\?\<\>\|\s]/g, replaceChar).replace(new RegExp("\\" + replaceChar + "+",'g'), replaceChar);
}
//-------------------------------------------------------------------------------------------
s3sg.utils.defaultFileName = function(tab_data) {
	return s3sg.utils.sanitiseName(s3sg.utils.createTemplateName('templateFileName', tab_data).replace(/https?\:\/\//g, ''));
}
//-------------------------------------------------------------------------------------------
s3sg.utils.getWindowDomain = function(url, without_www) {
	var domain = url.replace(/^https?\:\/\/([^\/\#\?]+).*$/, '$1');
	if (without_www) {
		domain = domain.replace(/^www\./i, '');
	}
	return domain;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.check_2_digits = function(number) {
	return  ((number < 10)  ? "0" : "")  + number;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.createTemplateName = function(pref_name, tab_data) {
	var result_name = s3sg.utils.prefs_get(pref_name) || '{#SG#}';
	//-------------------------------------------------------------------------------------
	function crop_title(str, p1) {
		var title = tab_data.site_title;
		if (title.length > p1) {
			return title.substr(0, p1) + '...';
		}
		return title;
	}

	//-------------------------------------------------------------------------------------
	result_name = result_name.replace(/\{\#SG\#\}/ig, 'Screengrab');
	result_name = result_name.replace(/\{\#TITLE\#\}/ig, tab_data.site_title);
	result_name = result_name.replace(/\{\#TITLE(\d+)\#\}/ig, crop_title);
	result_name = result_name.replace(/\{\#URL\#\}/ig, tab_data.site_url);
	result_name = result_name.replace(/\{\#DOMAIN\#\}/ig, s3sg.utils.getWindowDomain(tab_data.site_url));
	result_name = result_name.replace(/\{\#DOMAIN\!WWW\#\}/ig, s3sg.utils.getWindowDomain(tab_data.site_url, true));

	var dt = new Date();
	var options = { month: 'long', weekday: 'long', day:'numeric' };
	var date_locale = s3sg.i18n.current_locale;
	if ((date_locale == 'ja-JP') || (date_locale == 'zh-CN') || (date_locale == 'zh-TW')) {
		date_locale = 'en-US';
	}
	var date_text = dt.toLocaleString(date_locale, options);
	var week_text = date_text.replace(/^([^\s\,]+).*$/, '$1');
	var month_text = date_text.replace(/\s*\d+\s*$/, '').replace(/^.*?(\S+)\s*$/, '$1');

	result_name = result_name.replace(/\{\#YYYY\#\}/ig, dt.getFullYear());

	var template_short_yy = dt.getFullYear() + '';
	template_short_yy = template_short_yy.replace(/^\d\d/, '');
	result_name = result_name.replace(/\{\#YY\#\}/ig, template_short_yy);

	result_name = result_name.replace(/\{\#MM\#\}/ig, s3sg.utils.check_2_digits(dt.getMonth()+1));
	result_name = result_name.replace(/\{\#DD\#\}/ig, s3sg.utils.check_2_digits(dt.getDate()));

	result_name = result_name.replace(/\{\#MONTH\#\}/ig, month_text);
	result_name = result_name.replace(/\{\#WEEKDAY\#\}/ig, week_text);

	result_name = result_name.replace(/\{\#H\#\}/ig, s3sg.utils.check_2_digits(dt.getHours()));
	result_name = result_name.replace(/\{\#M\#\}/ig, s3sg.utils.check_2_digits(dt.getMinutes()));
	result_name = result_name.replace(/\{\#S\#\}/ig, s3sg.utils.check_2_digits(dt.getSeconds()));
	result_name = result_name.replace(/\{\#UT\#\}/ig, dt.getTime());

	if (s3sg.utils.prefs_get('convertumlaute')) {
		// convert german umlaute
		var RegEx_ae = new RegExp('[ä]', 'g');
		var RegEx_oe = new RegExp('[ö]', 'g');
		var RegEx_ue = new RegExp('[ü]', 'g');
		var RegEx_Ae = new RegExp('[Ä]', 'g');
		var RegEx_Ue = new RegExp('[Ü]', 'g');
		var RegEx_Oe = new RegExp('[Ö]', 'g');
		var RegEx_ss = new RegExp('[ß]', 'g');
		result_name = result_name.replace(RegEx_ae, "ae");
		result_name = result_name.replace(RegEx_oe, "oe");
		result_name = result_name.replace(RegEx_ue, "ue");
		result_name = result_name.replace(RegEx_Ae, "Ae");
		result_name = result_name.replace(RegEx_Ue, "Ue");
		result_name = result_name.replace(RegEx_Oe, "Oe");
		result_name = result_name.replace(RegEx_ss, "ss");
	}

	if (pref_name != 'templateImageName') {
		var replaceChar = s3sg.utils.getReplaceCharInFilename();
		if (s3sg.utils.prefs_get('onlyascii')) {
			// only ascii: (a-zA-Z0-9_ -)
			result_name = result_name.replace(/[^a-zA-Z0-9_ -]/g, replaceChar);
		}
		// replace more than one _, (___ -> _)
		result_name = result_name.replace(new RegExp("\\s*\\" + replaceChar + "+\\s*",'g'), replaceChar);
	}

	result_name = result_name.replace(/\#/g, '');

	//-------------------------------------------------------------------------------------
	if (result_name.length > 250) {
		result_name = result_name.substr(0, 250);
	}

	return result_name;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.postData = function(url, data) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			chrome.tabs.create({ url: req.responseURL, 'active': true, 'index' : data.tab_index }, function(tab) {});
		}
	};
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	var params = [];

	for(var key in data) {
		params.push(key + '=' + s3sg.utils.urlencode(data[key]));
	}
	req.send(params.join('&'));
/*
	chrome.tabs.create(
		{ url: chrome.runtime.getURL("/content/post.html"), 'active': true },
		function(tab) {
			var handler = function(tabId, changeInfo) {
				if ((tabId === tab.id) && (changeInfo.status === "complete")) {
					chrome.tabs.onUpdated.removeListener(handler);
					chrome.tabs.sendMessage(tabId, {url: url, data: data});
				}
			}
			chrome.tabs.onUpdated.addListener(handler);
			chrome.tabs.sendMessage(tab.id, {url: url, data: data});
		}
	);
*/
}
//------------------------------------------------------------------------------
s3sg.utils.clipboard_copy = function(str, mimetype) {
	if (! mimetype) {
		mimetype = 'text/plain';
	}
	var old_handler = document.oncopy;
	var handler = function(event) {
		event.clipboardData.setData(mimetype, str);
		event.preventDefault();
		document.oncopy = old_handler;
	};
	document.oncopy = handler;
	document.execCommand("copy", false, null);
}
//-------------------------------------------------------------------------------------------
s3sg.utils.clipboard_image_not_copy = function() {
	try {
		return (chrome.clipboard && chrome.clipboard.setImageData) ? false : true;
	} catch (e) {};
	return true;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.random_string = function(size) {
	var a = 'qwertyuiopasdfghjklzxcvbnm0123456789';
	var result = '';
	for (var i=0; i<size; i++) {
		result += a.substr(Math.floor(Math.random() * a.length), 1);
	}
	return result;
}
//-------------------------------------------------------------------------------------------
s3sg.utils.check_isFirefox = function() {
	var text = window.navigator.userAgent;
	return (text.indexOf("Firefox") >=0) ? true : false;
}
//-------------------------------------------------------------------------------------------
