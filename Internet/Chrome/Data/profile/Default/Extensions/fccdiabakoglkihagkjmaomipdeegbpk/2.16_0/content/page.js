//------------------------------------------------------------------------------
if (! window.screengrab) {
	window.screengrab = {};
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.screengrab.capture_start = function(selection) {
	chrome.runtime.sendMessage({ action: 'capture_page_start' }, function(response) {});

	//------------------------------------------------------------------------
	window.screengrab.selection = selection;
	//------------------------------------------------------------------------
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	window.screengrab.supportsDrawWindow = !!ctx.drawWindow;
	if (window.screengrab.supportsDrawWindow) {
		window.screengrab.capture_start_drawWindow(selection);
		return;
	}

	//------------------------------------------------------------------------
	window.screengrab.original_scrollX = document.body.scrollLeft || window.scrollX || 0;
	window.screengrab.original_scrollY = document.body.scrollTop || window.scrollY || 0;
	//------------------------------------------------------------------------
	if (selection && selection.disable_autoscroll) {
		window.screengrab.disable_autoscroll = true;
	} else {
		window.screengrab.disable_autoscroll = false;
		window.scrollTo(0, 0);
	}
	//------------------------------------------------------------------------
	window.screengrab.fixed_elements(false);
	if (window.screengrab.capture_force) {
		window.screengrab.fixed_elements(false, true);
	}
	//------------------------------------------------------------------------
	var body = document.body;
	var html = document.documentElement;
	var region_zoom = window.devicePixelRatio || 1;
	var page_width = Math.max(body.scrollWidth, body.offsetWidth, html.scrollWidth, html.offsetWidth, html.clientWidth);
	var page_height = Math.max(body.scrollHeight, body.offsetHeight, html.scrollHeight, html.offsetHeight, html.clientHeight);

	var win_width = window.innerWidth;
	var win_height = Math.ceil(window.innerHeight * 90 / 100);
	//------------------------------------------------------------------------
	if (page_width <= (win_width + 1)) {
		page_width = win_width;
	}
	//------------------------------------------------------------------------
	window.screengrab.capture_screen_list = [];

	//------------------------------------------------------------------------
	if (window.screengrab.selection) {
		if (window.screengrab.disable_autoscroll) {
			window.screengrab.capture_screen_list.push([ selection.startX, selection.startY ]);
		} else {
			var captureY = selection.startY / region_zoom;
			var max_y = (selection.height / region_zoom) + captureY;
			while (captureY < max_y) {
				var captureX = selection.startX / region_zoom;
				var max_x = (selection.width / region_zoom) + captureX;
				while (captureX < max_x) {
					window.screengrab.capture_screen_list.push([ captureX, captureY ]);
					var stepX = ((win_width-20) >0) ? (win_width-20) : win_width;
					if (page_width == win_width) {
						stepX = win_width;
					}
					captureX += stepX;
				}
				var stepY = ((win_height-20) >0) ? (win_height-20) : win_height;
				if (page_height == win_height) {
					stepY = win_height;
				}
				captureY += stepY;
			}
		}
	}
	//------------------------------------------------------------------------
	else {
		var captureY = 0;
		while (captureY < page_height) {
			var captureX = 0;
			while (captureX < page_width) {
				window.screengrab.capture_screen_list.push([ captureX, captureY ]);
				var stepX = ((win_width-20) >0) ? (win_width-20) : win_width;
				if (page_width == win_width) {
					stepX = win_width;
				}
				captureX += stepX;
			}
			var stepY = ((win_height-20) >0) ? (win_height-20) : win_height;
			if (page_height == win_height) {
				stepY = win_height;
			}
			captureY += stepY;
		}
	}

	//------------------------------------------------------------------------
	window.screengrab.page_width = (page_height == win_height) ? page_width : (page_width - 20);
	window.screengrab.page_height = (page_width == win_width) ? page_height : (page_height - 20);
	window.screengrab.capture_screen_list_total = window.screengrab.capture_screen_list.length;

	//------------------------------------------------------------------------
	try {
		window.screengrab.site_description = '';
		var metas = document.getElementsByTagName('META');
		var descr = metas.namedItem("description") || metas.namedItem("Description") || metas.namedItem("DESCRIPTION");
		if (descr) {
			window.screengrab.site_description = descr.content;
		}
	} catch(e) {
	}

	//------------------------------------------------------------------------
	if (window.screengrab.capture_screen_list.length > 0) {
		window.screengrab.capture_process();
	} else {
		window.screengrab.capture_end();
        }
}
//------------------------------------------------------------------------------
window.screengrab.capture_start_drawWindow = function(selection) {
	//------------------------------------------------------------------------
	if (selection && selection.disable_autoscroll) {
		window.screengrab.disable_autoscroll = true;
	} else {
		window.screengrab.disable_autoscroll = false;
	}
	window.screengrab.fixed_elements(false);
	if (window.screengrab.capture_force) {
		window.screengrab.fixed_elements(false, true);
	}
	window.screengrab.capture_start_drawWindow_go(selection);
}
//------------------------------------------------------------------------------
window.screengrab.capture_start_drawWindow_go = function(selection) {
	var body = document.body;
	var html = document.documentElement;

	//------------------------------------------------------------------------
	var page_width = Math.max(body.scrollWidth, body.offsetWidth, html.scrollWidth, html.offsetWidth, html.clientWidth);
	var page_height = Math.max(body.scrollHeight, body.offsetHeight, html.scrollHeight, html.offsetHeight, html.clientHeight);

	//------------------------------------------------------------------------
	var canvas = document.createElement('canvas');
	var region_x = 0;
	var region_y = 0;
	var region_zoom = window.devicePixelRatio || 1;
	var region_width = page_width;
	var region_height = page_height;
	//------------------------------------------------------------------------
	if (selection) {
		region_x = selection.startX / region_zoom;
		region_y = selection.startY / region_zoom;
		canvas.width = selection.width;
		canvas.height = selection.height;
		region_width = selection.width / region_zoom;
		region_height = selection.height / region_zoom;
	}
	//------------------------------------------------------------------------
	else {
		canvas.width = region_width * region_zoom;
		canvas.height = region_height * region_zoom;
	}

	//------------------------------------------------------------------------
	var context = canvas.getContext('2d');
	context.scale(region_zoom, region_zoom);
	context.drawWindow(window, region_x, region_y, region_width, region_height, '#ffffff');

	var data = {
		'action' : 'capture_page_drawWindow',
		'image_data' : canvas.toDataURL(),
		'width' : canvas.width,
		'height' : canvas.height,
		'complete' : 1,
		'site_description' : window.screengrab.site_description
        };

	window.setTimeout(function() {
		chrome.runtime.sendMessage(data, function(response) {
		});
	}, 10);
}
//------------------------------------------------------------------------------
window.screengrab.capture_process = function() {
	if (! window.screengrab.capture_screen_list.length) {
                return;
        }
	if (! window.screengrab.running) {
                return;
	}
	//------------------------------------------------------------------------
	var next = window.screengrab.capture_screen_list.shift();
	var captureX = next[0];
	var captureY = (next[1] < 0) ? 0 : next[1];

	if (! window.screengrab.disable_autoscroll) {
		window.scrollTo(captureX, captureY);
	}

	var data = {
		'action' : 'capture_page',
		'captureX' : window.scrollX,
		'captureY' : window.scrollY,
		'capture_width' : window.innerWidth,
		'capture_height' : window.innerHeight,
		'page_width' : window.screengrab.page_width,
		'page_height' : window.screengrab.page_height,
		'devicePixelRatio' : window.devicePixelRatio || 1,
		'complete' : (window.screengrab.capture_screen_list_total - window.screengrab.capture_screen_list.length) / window.screengrab.capture_screen_list_total,
		'site_description' : window.screengrab.site_description
        };

	window.setTimeout(function() {
//		window.screengrab.fixed_elements(false);
		chrome.runtime.sendMessage(data, function(response) {
			if (typeof(response) == 'undefined') {
				window.screengrab.capture_end();
			}
		});
	}, 100);
}
//------------------------------------------------------------------------------
window.screengrab.capture_end = function(is_cancel) {
	window.screengrab.running = false;
	window.screengrab.fixed_elements(true);
	if (! is_cancel && ! window.screengrab.supportsDrawWindow) {
		window.scrollTo(window.screengrab.original_scrollX || 0, window.screengrab.original_scrollY || 0);
	}
};
//------------------------------------------------------------------------------
window.screengrab.fixed_elements = function(is_restore, is_force) {
	if (window.screengrab.disable_autoscroll) {
		return true;
	}
	//------------------------------------------------------------------------
	if (! window.screengrab.fixed_elements_list) { window.screengrab.fixed_elements_list = []; }
	var style_map_list = [
		{ 'style_name' : 'position', 'style_prop' : 'fixed', 'style_new' : 'absolute' },
		{ 'style_name' : 'height', 'style_prop' : '100%', 'style_new' : 'initial' }
	];
	//------------------------------------------------------------------------
	if (is_restore) {
		for (var i = 0; i < window.screengrab.fixed_elements_list.length; i++) {
			var fix = window.screengrab.fixed_elements_list[i];
//			fix.el.style[fix.style_name] = fix.style_original;
			if ((fix.style_original == 'auto') || (fix.style_original == 'none')) {
				fix.el.style.removeProperty(fix.style_name);
			} else {
				fix.el.style.setProperty(fix.style_name, fix.style_original);
			}
			fix.el.screengrab_check_height = false;
			fix.el.screengrab_set_style = false;
       		}
		window.screengrab.fixed_elements_list = [];
	}
	//------------------------------------------------------------------------
	else {
		var node_list = document.createNodeIterator(document.documentElement, NodeFilter.SHOW_ELEMENT, null, false);
		var node_current;
		while (node_current = node_list.nextNode()) {
			//------------------------------------------------------------
			var node_style = document.defaultView.getComputedStyle(node_current, "");
			//------------------------------------------------------------
			var position_style = window.screengrab.get_style(node_current, 'position', node_style);
			if ((position_style.style1.indexOf('fixed') >= 0) || (position_style.style2.indexOf('fixed') >= 0)) {
				window.screengrab.fixed_elements_list.push({
					'el' : node_current,
					'style_name' : 'position',
					'style_original' : 'fixed'
				});
				node_current.style.setProperty('position', 'absolute', "important");
			}
			//------------------------------------------------------------
			var transition_style = window.screengrab.get_style(node_current, 'transition', node_style);
			if (transition_style.style1 || transition_style.style2) {
				window.screengrab.fixed_elements_list.push({
					'el' : node_current,
					'style_name' : 'transition',
					'style_original' : transition_style.style1 || transition_style.style2
				});
				node_current.style.setProperty('transition', 'initial', "important");
			}
			//------------------------------------------------------------
			var animation_style = window.screengrab.get_style(node_current, 'animationDuration', node_style);
			if ((animation_style.style1 && (animation_style.style1 != 'initial')) || (animation_style.style2 && (animation_style.style2 != 'initial'))) {
				window.screengrab.fixed_elements_list.push({
					'el' : node_current,
					'style_name' : 'animation-duration',
					'style_original' : animation_style.style1 || animation_style.style2
				});
				node_current.style.setProperty('animation-duration', '0ms', "important");
//				node_current.style.removeProperty('animation-name');
			}
			//------------------------------------------------------------
			if (window.screengrab.selection) { continue; }
			if (! window.screengrab.capture_force) { continue; }
			if (node_current.screengrab_check_height && !is_force && !node_current.screengrab_set_style) { continue; }
			//------------------------------------------------------------
			var node_scroll_height = node_current.scrollHeight;
			var node_client_height = node_current.clientHeight;
			//------------------------------------------------------------
			var display_style = node_current.style.display;
			if (!is_force && ! node_current.screengrab_set_style) {
				node_current.style.display = 'none';
			}
			//------------------------------------------------------------
			var height_style = node_style.getPropertyValue('height') || node_current.style.height;
			var height_max_style = node_style.getPropertyValue('max-height') || node_current.style.maxHeight;
			//------------------------------------------------------------
			if (!is_force && ! node_current.screengrab_set_style) {
				node_current.style.display = display_style;
			}
			//------------------------------------------------------------
			 if (((node_client_height > 0) && (node_scroll_height > (node_client_height + 20))) || (/\%/.test(height_style)) || (/\%/.test(height_max_style))) {
				//------------------------------------------------------------
				if (! node_current.screengrab_set_style) {
					window.screengrab.fixed_elements_list.push({
						'el' : node_current,
						'style_name' : 'height',
						'style_original' : height_style
					});
					window.screengrab.fixed_elements_list.push({
						'el' : node_current,
						'style_name' : 'max-height',
						'style_original' : height_max_style
					});
				}
				//------------------------------------------------------------
				var h_style = 'initial';
				if (node_scroll_height > (node_client_height + 20)) {
					h_style = node_scroll_height + 'px';
				}
				if ((position_style.style1 == 'absolute') || (position_style.style2 == 'absolute') || (position_style.style1 == 'fixed') || (position_style.style2 == 'fixed')) {
					h_style = 'initial';
				}

				if ((height_max_style == 'none') && (h_style == 'initi33al')) {
					node_current.style.removeProperty('height');
				} else {
					node_current.style.setProperty('height', h_style, "important");
				}
				if (height_style == 'auto') {
					node_current.style.removeProperty('max-height');
				} else {
					node_current.style.setProperty('max-height', h_style, "important");
				}

				//------------------------------------------------------------
				node_current.screengrab_set_style = true;
				node_current.screengrab_check_height = true;
			}
			//------------------------------------------------------------
			else if ((height_style == 'auto') && (height_max_style == 'none')) {
				node_current.screengrab_check_height = true;
			}
			//------------------------------------------------------------
			else if (node_scroll_height == 0) {
				node_current.screengrab_check_height = true;
			}
		}
	}
}
//------------------------------------------------------------------------------
window.screengrab.get_style = function(el, style_name, node_style) {
	//------------------------------------------------------------------------
	var node_style1 = '';
	var node_style2 = new String(el.style[style_name]);
	if (! node_style) {
		node_style = document.defaultView.getComputedStyle(el, "");
	}

	//------------------------------------------------------------------------
	try {
		node_style1 = new String(node_style.getPropertyValue(style_name));
		if (style_name == 'position') {
			var top = node_style.getPropertyValue('top');
			var right = node_style.getPropertyValue('right');
			var bottom = node_style.getPropertyValue('bottom');
			var left = node_style.getPropertyValue('left');
			if (/^\-/i.test(top) || /^\-/i.test(right) || /^\-/i.test(bottom) || /^\-/i.test(left)) {
				return { 'style1' : '', 'style2' : '' };
			}
		}
	} catch (e) {
	}
	//------------------------------------------------------------------------
	return { 'style1' : node_style1.toLowerCase(), 'style2' : node_style2.toLowerCase() };
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
if (! window.screengrab.is_listener) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.action == 'capture_end') {
			window.screengrab.capture_end();
			chrome.runtime.sendMessage({ action: 'capture_page_end' }, function(response) {});
			sendResponse({ 'success' : true });
		}
		else if (request.action == 'capture_cancel') {
			window.screengrab.capture_end(true);
		}
		else if (request.action == 'capture_process') {
			window.screengrab.capture_process();
			sendResponse({ 'success' : true });
		}
		else if (request.action == 'capture_start') {
			if (! window.screengrab.running) {
				window.screengrab.running = true;
				window.screengrab.capture_force = (request.target && (request.target == 'page_force')) ? true : false;
				window.screengrab.capture_start(request.selection);
			}
			sendResponse({ 'success' : true });
		}
	});
	window.screengrab.is_listener = true;
}
//------------------------------------------------------------------------------
