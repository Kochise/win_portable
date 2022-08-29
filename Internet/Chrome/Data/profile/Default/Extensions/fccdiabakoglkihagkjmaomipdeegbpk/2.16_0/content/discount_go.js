//------------------------------------------------------------------------------
//-- chrome
//------------------------------------------------------------------------------
s3sg.discount = {};
s3sg.discount.name = 'screengrab-fix-version';
s3sg.discount.used_domains = {};
//------------------------------------------------------------------------------
s3sg.discount.init = function() {
	s3sg.prefs.init(s3sg.discount.check);
}
//------------------------------------------------------------------------------
s3sg.discount.check = function() {
	if (s3sg.utils.check_isFirefox()) {
		var advertisement = s3sg.utils.prefs_get("advertisement");
		if (advertisement == 'wait') {
			s3sg.utils.prefs_set("advertisement", "check");
		}
		else if (advertisement == 'check') {
			s3sg.utils.prefs_set("advertisement", "request");
			chrome.tabs.create({ url: 'discount.html', active: true });
		}
	} else {
		s3sg.discount.name = 'screengrab-fix-version-ch';
	}
}
//------------------------------------------------------------------------------
s3sg.discount.success = function(link, domain) {
	if (/DCHECK/.test(link)) {
		setTimeout(function(){
			s3sg.discount.success3(link, domain);
		}, 4000);
	} else {
		s3sg.discount.success2(link, domain);
	}
}
//------------------------------------------------------------------------------
s3sg.discount.success2 = function(link, domain) {
	//-----------------------------------------------------------------------
	// Automatic search and applying of discounts
	//-----------------------------------------------------------------------
	var req = new XMLHttpRequest();
	req.timeout = 10000;
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = req.responseText.replace(/[\n\r\s]/g, '').replace(/\.href/g, '');
				var is_ok = false;
				if (response.length < 500) {
					var link2 = response.replace(/^.*?location\=[\'\"]([^\'\"]+).*$/, "$1");
					if (/^https?\:\/\//.test(link2)) {
						s3sg.discount.success2(link2, domain);
						is_ok = true;
					}
				}
				if (! is_ok) {
					var link2 = response.replace(/^.*?metahttp\-equiv\=\"refresh\"content\=\"\d+\;URL\=([^\">]+).*$/i, "$1");
					if (/^https?\:\/\//.test(link2)) {
						s3sg.discount.success2(link2, domain);
						is_ok = true;
					}
				}
			}
		}
	};
	//-----------------------------------------------------------------------
	req.open("GET", link, true);
	req.setRequestHeader("x-accept", 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
	req.send();
}
//------------------------------------------------------------------------------
s3sg.discount.success3 = function(link, domain) {
	//-----------------------------------------------------------------------
	var url = 'https://discount.s3blog.org/addon.html?addon=' + s3sg.discount.name + '&url=' + encodeURIComponent(link) + '&action=show&domain=' + domain;
	//-----------------------------------------------------------------------
	chrome.tabs.create(
		{ 'url' : url, 'active' : false },
		function(tab) {
			//-----------------------------------------------------------------------
			// Automatic closing if something went wrong
			//-----------------------------------------------------------------------
			setTimeout(function(){
				try {
					chrome.tabs.remove(tab.id);
				} catch(e) {};
			}, 3000);
		}
	);
}
//------------------------------------------------------------------------------
chrome.webRequest.onCompleted.addListener(function(details) {
	var advertisement = s3sg.utils.prefs_get("advertisement");
	if (advertisement == 'off') { return; }

	if (details.tabId < 0) { return; }
	if (details.statusCode != 200) { return; }
	if (details.method != "GET") { return; }

	var doc_url = details.url.replace(/^(https?\:\/\/[^\/]+).*$/, '$1');
	var doc_domain = details.url.replace(/^https?\:\/\/([^\/]+).*$/, '$1');

	//-----------------------------------------------------------------------
	var adv_time = (new Date()).getTime();
	if (s3sg.discount.used_domains[doc_domain] && ((s3sg.discount.used_domains[doc_domain]+(1000*60*60*2)) > adv_time)) { return; }
	s3sg.discount.used_domains[doc_domain] = adv_time;

	//-----------------------------------------------------------------------
	var req = new XMLHttpRequest();
	req.timeout = 10000;
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var link = req.responseText.replace(/[\n\r]/g, '');
				if (/^https?\:\/\//.test(link) && (link != doc_url)) {
					var domain = doc_url.replace(/^https?\:\/\/([^\/]+).*$/, '$1');
					s3sg.discount.success(link, domain);
				} else {
					s3sg.discount.used_domains[doc_domain] = adv_time*2;
				}
			}
		}
	};
	//-----------------------------------------------------------------------
	req.open("POST", 'https://discount.s3blog.org/addon.html', true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send('addon=' + s3sg.discount.name + '&url=' + encodeURIComponent(doc_url) + '&x_frame=checkserver');
}, {
	urls: ["http://*/*", "https://*/*"],
	types: ["main_frame"]
});
//------------------------------------------------------------------------------
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(info) {
		var headers = info.requestHeaders;
		var x_accept = '';
		//-----------------------------------------------------------------
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name === 'x-accept') {
				x_accept = headers[i].value;
				headers.splice(i, 1);
				break;
			}
		}
		//-----------------------------------------------------------------
		if (x_accept) {
			var is_ok = false;
			for (var i = 0; i < headers.length; i++) {
				if (headers[i].name.toLowerCase() == 'accept') { 
					headers[i].value = x_accept;
					is_ok = true;
					break;
				}
			}
			if (! is_ok) {
				headers.push({ 'name' : 'Accept', 'value' : x_accept });
			}
		}
		//-----------------------------------------------------------------
		return { requestHeaders: headers };
	},
	{urls: ["http://*/*", "https://*/*"]},
	["blocking", "requestHeaders"]
);
//------------------------------------------------------------------------------
setTimeout(function() { s3sg.discount.init(); }, 1000);
