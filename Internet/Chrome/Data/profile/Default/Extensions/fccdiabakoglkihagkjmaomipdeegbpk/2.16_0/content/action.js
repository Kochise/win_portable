s3sg.action = {};
//------------------------------------------------------------------------------
s3sg.action.init = function(tab_data) {
	if ((tab_data.target == 'page') || (tab_data.target == 'page_force')) {
		chrome.tabs.sendMessage(tab_data.id, { 'action' : 'capture_start', 'target' : tab_data.target }, function(response) {
			if (chrome.runtime.lastError) {};
			var success = (response && response.success) ? true : false;
			if (! success) {
				chrome.tabs.executeScript(tab_data.id, { 'file': '/content/page.js' }, function(callback) {
					if (chrome.runtime.lastError) {};
					chrome.tabs.sendMessage(tab_data.id, { 'action' : 'capture_start', 'target' : tab_data.target }, function() {});
				});
			}
		});
	}
	//------------------------------------------------------------------------
	else if (tab_data.target == 'visible_portion') {
		chrome.tabs.captureVisibleTab(null, { 'format' : 'png', 'quality': 100}, function(dataURI) {
			if (dataURI) {
				var image = new Image();
				image.onload = function() {
					var canvas = document.createElement('canvas');
					var max_size = 32767;
					var max_area = 268435456;
					var width = Math.round(Math.min(image.width, max_size));
					var height = Math.round(Math.min(image.height, max_size));
					if (width * height < max_area) {
						canvas.width = width;
						canvas.height = height;
					} else {
						canvas.width = width;
						canvas.height = Math.floor(max_area / width);
					}
					tab_data.screenshot = {};
					tab_data.screenshot.canvas = canvas;
					tab_data.screenshot.ctx = canvas.getContext('2d');
					tab_data.screenshot.ctx.drawImage(image, 0, 0, image.width, image.height);
					s3sg.action.prepare_done(tab_data);
				}
				image.src = dataURI;
			}
		});
	}
	//------------------------------------------------------------------------
	else if (tab_data.target == 'selection') {
		chrome.tabs.executeScript(tab_data.id, { 'file': '/content/page_selection.js' }, function(callback) {
			if (chrome.runtime.lastError) {}
		});
	}
}
//------------------------------------------------------------------------------
s3sg.action.set_selection = function(tab_data, dimensions) {
	chrome.tabs.executeScript(tab_data.id, { 'file': '/content/page.js' }, function(callback) {
		if (chrome.runtime.lastError) {}
		tab_data.selection = dimensions;
		chrome.tabs.sendMessage(tab_data.id, { 'action' : 'capture_start', 'selection' : dimensions }, function() {});
	});
}
//------------------------------------------------------------------------------
s3sg.action.prepare_done = function(tab_data) {
	var insertText = s3sg.utils.prefs_get('insertTextInImage');
	if (insertText) {
		var region_width = tab_data.screenshot.canvas.width;
		var img_tmp = tab_data.screenshot.ctx.getImageData(0, 0, region_width, tab_data.screenshot.canvas.height);
		tab_data.screenshot.canvas.height += 20;
		tab_data.screenshot.ctx.height += 20;
		tab_data.screenshot.ctx.putImageData(img_tmp, 0, 20);

		tab_data.screenshot.ctx.fillStyle = "#E7FADE";
		tab_data.screenshot.ctx.clearRect(0, 0, region_width, 19);
		tab_data.screenshot.ctx.fillRect(0, 0, region_width, 19);
		tab_data.screenshot.ctx.fillStyle = "#CC0000";
		tab_data.screenshot.ctx.fillRect(0, 19, region_width, 1);
		tab_data.screenshot.ctx.fillStyle = "black";
		tab_data.screenshot.ctx.font = "16px monospace";
		tab_data.screenshot.ctx.fillText(s3sg.utils.createTemplateName('templateImageName', tab_data), 3, 15);
	}


	if (tab_data.method == 'upload') {
		s3sg.upload.init(tab_data);
	}
	//------------------------------------------------------------------------
	else if (tab_data.method == 'preview') {
		s3sg.preview.init(tab_data);
	}
	//------------------------------------------------------------------------
	else if (tab_data.method == 'save') {
		s3sg.save.init(tab_data);
	}
	//------------------------------------------------------------------------
	else if (tab_data.method == 'save_mhtml') {
		s3sg.save.init(tab_data, true);
	}
	//------------------------------------------------------------------------
	else if (tab_data.method == 'copy') {
		s3sg.copy.init(tab_data);
	}
	//------------------------------------------------------------------------
	else {
		s3sg.open_url(tab_data.screenshot.canvas.toDataURL('image/png'), tab_data.id, true);
	}
	s3sg.tab_list['tab' + tab_data.id] = {};
}
//------------------------------------------------------------------------------
s3sg.action.prepare_page = function(data) {
	var tab_data = s3sg.tab_list['tab' + data.tab_id];
	if (! tab_data.id) { return; }
	if (data.site_description) {
		tab_data.site_description = data.site_description;
	}
	//------------------------------------------------------------------------
	chrome.tabs.update(tab_data.id, { 'active' : true }, function() {
		chrome.tabs.captureVisibleTab(null, { 'format' : 'png', 'quality': 100}, function(dataURI) {
			if (dataURI) {
				var image = new Image();
				image.onload = function() {
					s3sg.action.prepare_page_part(data, image, tab_data);
				}
				image.src = dataURI;
			}
		});
	});
}
//------------------------------------------------------------------------------
s3sg.action.prepare_page_drawWindow = function(data) {
	var tab_data = s3sg.tab_list['tab' + data.tab_id];
	if (! tab_data.id) { return; }
	if (data.site_description) {
		tab_data.site_description = data.site_description;
	}
	//------------------------------------------------------------------------
	if (data.image_data) {
		var image = new Image();
		image.onload = function() {
			s3sg.action.prepare_page_drawWindow_end(data, image, tab_data);
		}
		image.src = data.image_data;
	}
}
//------------------------------------------------------------------------------
s3sg.action.prepare_page_drawWindow_end = function(data, image, tab_data) {
	if (! tab_data.id) { return; }
	//------------------------------------------------------------------------
	var canvas = document.createElement('canvas');
	var max_size = 32767;
	var max_area = 268435456;
	var width = Math.round(Math.min(data.width, max_size));
	var height = Math.round(Math.min(data.height, max_size));
	if (width * height < max_area) {
		canvas.width = width;
		canvas.height = height;
	} else {
		canvas.width = width;
		canvas.height = Math.floor(max_area / width);
	}
	tab_data.screenshot = {};
	tab_data.screenshot.canvas = canvas;
	tab_data.screenshot.ctx = canvas.getContext('2d');
	tab_data.screenshot.ctx.drawImage(image, 0, 0, image.width, image.height);
	tab_data.drawWindow = true;

	//------------------------------------------------------------------------
	chrome.tabs.sendMessage(data.tab_id, { 'action' : 'capture_end' }, function() {});
}
//------------------------------------------------------------------------------
s3sg.action.prepare_page_part = function(data, image, tab_data) {
	if (! tab_data.id) { return; }

	data.image = { 'width' : image.width, 'height' : image.height };
	//------------------------------------------------------------------------
	if (data.capture_width !== image.width) {
		var scale = image.width / data.capture_width;
		data.captureX *= scale;
		data.captureY *= scale;
		data.page_width *= scale;
		data.page_height *= scale;
	}
	//------------------------------------------------------------------------
	if (! tab_data.screenshot) {
		var canvas = document.createElement('canvas');
		var max_size = 32767;
		var max_area = 268435456;
		var width = Math.round(Math.min(data.page_width, max_size));
		var height = Math.round(Math.min(data.page_height, max_size));
		if (width * height < max_area) {
			canvas.width = width;
			canvas.height = height;
		} else {
			canvas.width = width;
			canvas.height = Math.floor(max_area / width);
		}
		tab_data.screenshot = {};
		tab_data.screenshot.canvas = canvas;
		tab_data.screenshot.ctx = canvas.getContext('2d');
	}
	//------------------------------------------------------------------------
	tab_data.screenshot.ctx.drawImage(image, data.captureX, data.captureY, image.width, image.height);

	//------------------------------------------------------------------------
	if (data.complete === 1) {
		chrome.tabs.sendMessage(data.tab_id, { 'action' : 'capture_end' }, function() {});
	} else {
		chrome.tabs.sendMessage(data.tab_id, { 'action' : 'capture_process' }, function() {});
	}
}
//------------------------------------------------------------------------------
s3sg.action.prepare_page_end = function(data) {
	var tab_data = s3sg.tab_list['tab' + data.tab_id];
	if (! tab_data.screenshot) { return; }

	if (tab_data.selection && ! tab_data.drawWindow) {
		var img_tmp = tab_data.screenshot.ctx.getImageData(tab_data.selection.startX, tab_data.selection.startY, tab_data.selection.width, tab_data.selection.height);
		tab_data.screenshot.canvas.width = tab_data.selection.width;
		tab_data.screenshot.canvas.height = tab_data.selection.height;
		tab_data.screenshot.ctx.width = tab_data.selection.width;
		tab_data.screenshot.ctx.height = tab_data.selection.height;
		tab_data.screenshot.ctx.putImageData(img_tmp, 0, 0);
	}

	s3sg.action.prepare_done(tab_data);
	chrome.tabs.update(tab_data.id, { 'active' : false }, function() {});
}
//------------------------------------------------------------------------------
s3sg.action.end_action = function(tab_data) {
	if (tab_data && tab_data.closetab) {
		setTimeout(function(){
			chrome.tabs.remove(tab_data.id, function() {});
		}, 1000);
	}
}
//------------------------------------------------------------------------------
