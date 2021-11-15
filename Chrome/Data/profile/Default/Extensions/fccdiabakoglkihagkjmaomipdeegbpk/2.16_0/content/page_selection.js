//------------------------------------------------------------------------------
if (! window.screengrab) {
	window.screengrab = {};
}
//------------------------------------------------------------------------------
window.screengrab.selection = {
	BACKGROUND_DIV : "screengrabBackgroundDiv",
	DRAW_DIV : "screengrabDrawDiv",
	BOX_DIV : "screengrabBoxDiv",
	IDLE_IMAGE : "url('chrome://screengrab/skin/idle.png') 0 no-repeat",
	SNAP_IMAGE : "url('chrome://screengrab/skin/snap.png') 0 no-repeat",
	TOOL_TEXT : "Grab/Cancel",
	oldText : null,
	fast_selection : false,
	save_selection_timer : {},
	draw_type : '',
	originX : null,
	originY : null,
	mouseX : null,
	mouseY : null,
	offsetX : null,
	offsetY : null
};
//------------------------------------------------------------------------------
window.screengrab.selection.init = function() {
	chrome.runtime.sendMessage({ action_prefs_get : true }, function(response) {
		window.screengrab.selection.prefs = response.prefs_list;
		var string_list = {
			'selection.savePosition' : '',
			'selection.ok' : '',
			'selection.cancel' : '', 
			'selection.esc.exit' : '',
			'selection.fast_mode' : '',
			'selection.fast_mode.temp' : '',
			'selection.fast_mode.always' : '' 
		};
		chrome.runtime.sendMessage({ action_get_strings : true, 'string_list' : string_list }, function(response) {
			window.screengrab.selection.string_list = response.string_list;
			window.screengrab.selection.toggleDraw();
		});
	});
}
//------------------------------------------------------------------------------
window.screengrab.selection.toggleDraw = function() {
	if (window.screengrab.drawing) {
		window.screengrab.selection.disableDrawAndGrabIfRequired();
	} else {
		window.screengrab.selection.enableDraw();
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.insertHeaderElements = function() {
	var pageHead = document.getElementsByTagName("head")[0];
    
	if (pageHead == null) { // if page head doesn't exist, create one
		var pageBody = document.getElementsByTagName("html")[0];
		pageHead = document.createElement("head");
		pageBody.appendChild(pageHead);
		pageHead = document.getElementsByTagName("head")[0];
	}
    
	var cssCheck = document.getElementById("screengrab_css");
	if (cssCheck == null) { // insert stylesheet reference
		var css = document.createElement("link");
		css.setAttribute("id", "screengrab_css");
		css.setAttribute("rel", "stylesheet");
		css.setAttribute("type", "text/css");
		css.setAttribute("href", chrome.extension.getURL("/skin/selection.css"));
    
		pageHead.appendChild(css);
	}
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.screengrab.selection.beginBoxDraw = function(event) {
	window.screengrab.selection.fast_selection = window.screengrab.selection.fast_selection || event.shiftKey || event.ctrlKey;
	window.screengrab.selection.screengrab_bar_hint_hide();
	window.screengrab.selection.fastModeTextHide();

	var boxDiv = document.getElementById(window.screengrab.selection.BOX_DIV);
	if (boxDiv == null) {
		boxDiv = window.screengrab.selection.createBoxDraw();
	}

	boxDiv.style.left = event.pageX + "px";
	boxDiv.style.top = event.pageY + "px";

	window.screengrab.selection.originX = event.pageX;
	window.screengrab.selection.originY = event.pageY;

	window.screengrab.selection.mouseX = event.pageX;
	window.screengrab.selection.mouseY = event.pageY;

	window.screengrab.selection.draw_type = 'start';

	window.screengrab.selection.boxDrawing_left_right(event);
	window.screengrab.selection.boxDrawing_up_down(event);
	window.screengrab.selection.screengrab_bar_hint_hide();
	window.screengrab.selection.boxDrawing_text_size();
}
//------------------------------------------------------------------------------
window.screengrab.selection.restoreBoxDraw = function() {
	var boxDiv = document.getElementById(window.screengrab.selection.BOX_DIV);
	if (boxDiv == null) {
		boxDiv = window.screengrab.selection.createBoxDraw();
	}

	var startX = window.screengrab.selection.prefs['selection.startX'];
	var startY = window.screengrab.selection.prefs['selection.startY'];
	var selection_width = window.screengrab.selection.prefs['selection.width'];
	var selection_height = window.screengrab.selection.prefs['selection.height'];

	//-----------------------------------------------------------------------
	window.screengrab.selection.getClientSize();
	//-----------------------------------------------------------------------
	if ((startX + selection_width) > window.screengrab.selection.scrollWidth) {
		startX = 0;
	}
	if ((startY + selection_height) > window.screengrab.selection.scrollHeight) {
		startY = 0;
	}
	//-----------------------------------------------------------------------
	boxDiv.style.left = startX + "px";
	boxDiv.style.top = startY + "px";

	window.screengrab.selection.originX = startX;
	window.screengrab.selection.originY = startY;

//	window.screengrab.selection.winDoc.scrollTop = window.screengrab.selection.prefs['selection.scrollY'];
//	window.screengrab.selection.winDoc.scrollLeft = window.screengrab.selection.prefs['selection.scrollX'];
	window.scrollTo(window.screengrab.selection.prefs['selection.scrollX'], window.screengrab.selection.prefs['selection.scrollY']);

	window.screengrab.selection.boxDrawing_left_right({ 'pageX' : selection_width + startX, 'view' : window });
	window.screengrab.selection.boxDrawing_up_down({ 'pageY' : selection_height + startY, 'view' : window });
	window.screengrab.selection.screengrab_bar_hint_hide();
	window.screengrab.selection.boxDrawing_text_size();
}
//------------------------------------------------------------------------------
window.screengrab.selection.createBoxDraw = function() {
	var boxDiv = document.createElement("div");
	boxDiv.setAttribute("id", window.screengrab.selection.BOX_DIV);
	boxDiv.setAttribute("class", "boxOverlay");
	boxDiv.addEventListener("mousedown", window.screengrab.selection.boxDrawing_move, true);
	var body = document.getElementsByTagName("html")[0];
	body.appendChild(boxDiv);

	//-----------------------------------------------------------------------
	var bar_line = document.createElement("div");
	bar_line.id = 'screengrabBoxDiv_bar_line';
	boxDiv.appendChild(bar_line);

	if (! window.screengrab.selection.fast_selection) {
		var bar_line_savePosition = document.createElement("input");
		bar_line_savePosition.id = 'screengrabBoxDiv_bar_line_savePosition';
		bar_line_savePosition.setAttribute('type', 'checkbox');
		bar_line_savePosition.addEventListener("click", window.screengrab.selection.boxDrawing_savePosition, true);
		bar_line.appendChild(bar_line_savePosition);
		bar_line_savePosition.checked = window.screengrab.selection.prefs['selection.savePosition'];
		bar_line_savePosition.setAttribute('title', window.screengrab.selection.string_list['selection.savePosition']);
	}

	var bar_line_text_size = document.createElement("span");
	bar_line_text_size.id = 'screengrabBoxDiv_bar_line_text_size';
	bar_line.appendChild(bar_line_text_size);

	if (! window.screengrab.selection.fast_selection) {
		var bar_line_ok = document.createElement("div");
		bar_line_ok.id = 'screengrabBoxDiv_bar_line_ok';
		bar_line_ok.addEventListener("click", window.screengrab.selection.OnMouseUpHandlerThatHasToExistForSomeReason, true);
		bar_line.appendChild(bar_line_ok);
		bar_line_ok.setAttribute('title', window.screengrab.selection.string_list['selection.ok']);

		var bar_line_cancel = document.createElement("div");
		bar_line_cancel.id = 'screengrabBoxDiv_bar_line_cancel';
		bar_line_cancel.addEventListener("click", window.screengrab.selection.disableDraw, true);
		bar_line.appendChild(bar_line_cancel);
		bar_line_cancel.setAttribute('title', window.screengrab.selection.string_list['selection.cancel']);
	}

	//-----------------------------------------------------------------------
	var resize_up_line = document.createElement("div");
	resize_up_line.id = 'screengrabBoxDiv_up_line';
	resize_up_line.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up_line);
	
	var resize_down_line = document.createElement("div");
	resize_down_line.id = 'screengrabBoxDiv_down_line';
	resize_down_line.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down_line);
	
	var resize_left_line = document.createElement("div");
	resize_left_line.id = 'screengrabBoxDiv_left_line';
	resize_left_line.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_left_line);
	
	var resize_right_line = document.createElement("div");
	resize_right_line.id = 'screengrabBoxDiv_right_line';
	resize_right_line.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_right_line);
	
	var resize_up = document.createElement("div");
	resize_up.id = 'screengrabBoxDiv_up';
	resize_up.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up);
	
	var resize_up_left = document.createElement("div");
	resize_up_left.id = 'screengrabBoxDiv_up_left';
	resize_up_left.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up_left);
	
	var resize_up_right = document.createElement("div");
	resize_up_right.id = 'screengrabBoxDiv_up_right';
	resize_up_right.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up_right);
	
	var resize_left = document.createElement("div");
	resize_left.id = 'screengrabBoxDiv_left';
	resize_left.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_left);
	
	var resize_right = document.createElement("div");
	resize_right.id = 'screengrabBoxDiv_right';
	resize_right.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_right);
	
	var resize_down = document.createElement("div");
	resize_down.id = 'screengrabBoxDiv_down';
	resize_down.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down);
	
	var resize_down_left = document.createElement("div");
	resize_down_left.id = 'screengrabBoxDiv_down_left';
	resize_down_left.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down_left);
	
	var resize_down_right = document.createElement("div");
	resize_down_right.id = 'screengrabBoxDiv_down_right';
	resize_down_right.addEventListener("mousedown", window.screengrab.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down_right);

	return boxDiv;
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing_move = function(event) {
	window.screengrab.selection.draw_type = 'move';
	window.screengrab.selection.originX = event.pageX;
	window.screengrab.selection.originY = event.pageY;
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing_custom = function(event) {
	var resize_div = event.target;
	var boxDiv = document.getElementById(window.screengrab.selection.BOX_DIV);

	if (resize_div.id == 'screengrabBoxDiv_up_line') {
		window.screengrab.selection.draw_type = 'up_down';
		window.screengrab.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_down_line') {
		window.screengrab.selection.draw_type = 'up_down';
		window.screengrab.selection.originY = boxDiv.top_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_left_line') {
		window.screengrab.selection.draw_type = 'left_right';
		window.screengrab.selection.originX = boxDiv.left_box + boxDiv.width_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_right_line') {
		window.screengrab.selection.draw_type = 'left_right';
		window.screengrab.selection.originX = boxDiv.left_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_up') {
		window.screengrab.selection.draw_type = 'up_down';
		window.screengrab.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_up_left') {
		window.screengrab.selection.draw_type = 'both';
		window.screengrab.selection.originX = boxDiv.left_box + boxDiv.width_box;
		window.screengrab.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_up_right') {
		window.screengrab.selection.draw_type = 'both';
		window.screengrab.selection.originX = boxDiv.left_box;
		window.screengrab.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_left') {
		window.screengrab.selection.draw_type = 'left_right';
		window.screengrab.selection.originX = boxDiv.left_box + boxDiv.width_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_right') {
		window.screengrab.selection.draw_type = 'left_right';
		window.screengrab.selection.originX = boxDiv.left_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_down') {
		window.screengrab.selection.draw_type = 'up_down';
		window.screengrab.selection.originY = boxDiv.top_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_down_left') {
		window.screengrab.selection.draw_type = 'both';
		window.screengrab.selection.originX = boxDiv.left_box + boxDiv.width_box;
		window.screengrab.selection.originY = boxDiv.top_box;
	}
	else if (resize_div.id == 'screengrabBoxDiv_down_right') {
		window.screengrab.selection.draw_type = 'both';
		window.screengrab.selection.originX = boxDiv.left_box;
		window.screengrab.selection.originY = boxDiv.top_box;
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing = function(event) {
	if ((window.screengrab.selection.draw_type == 'both') || (window.screengrab.selection.draw_type == 'start')) {
		window.screengrab.selection.boxDrawing_up_down(event);
		window.screengrab.selection.boxDrawing_left_right(event);
	}
	else if (window.screengrab.selection.draw_type == 'up_down') {
		window.screengrab.selection.boxDrawing_up_down(event);
	}
	else if (window.screengrab.selection.draw_type == 'left_right') {
		window.screengrab.selection.boxDrawing_left_right(event);
	}
	else if (window.screengrab.selection.draw_type == 'move') {
		window.screengrab.selection.boxDrawing_move_start(event);
	}
	window.screengrab.selection.boxDrawing_text_size();
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing_left_right = function(event) {
	var boxDiv = document.getElementById(window.screengrab.selection.BOX_DIV);

	window.screengrab.selection.mouseX = event.view ? event.pageX : window.screengrab.selection.mouseX;
	var left_tmp = window.screengrab.selection.mouseX < window.screengrab.selection.originX ? window.screengrab.selection.mouseX : window.screengrab.selection.originX;
	var left = (left_tmp < 0) ? 0 : left_tmp;
	var width = (left_tmp < 0) ? window.screengrab.selection.originX : Math.abs(window.screengrab.selection.mouseX - window.screengrab.selection.originX);

	//------------------------------------------------------------------------------------
	var doc_width = window.screengrab.selection.getDocumentWidth();
	if ((left +  width + 5) >= doc_width) {
		boxDiv.setAttribute('is_hide_right_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_right_border');
	}
	if ((left +  width + 2) >= doc_width) {
		width = doc_width - left - 2;
	}

	//------------------------------------------------------------------------------------
	boxDiv.style.display = "none";
	boxDiv.style.left = left + "px";
	boxDiv.left_box = left;
	window.screengrab.selection.setPrefs('selection.startX', left);

	if (width >= 0) {
		boxDiv.style.width = width + "px";
		boxDiv.width_box = width;
		window.screengrab.selection.setPrefs('selection.width', width);
	}
	boxDiv.style.display = "inline";

	//------------------------------------------------------------------------------------
	try {
		if (! window.screengrab.selection.check_disable_autoscroll()) {
			var scrollX = (window.screengrab.selection.clientWidth + window.scrollX);
			window.screengrab.selection.setPrefs('selection.scrollX', window.scrollX);
			if ((window.screengrab.selection.scrollWidth > window.screengrab.selection.mouseX) && (window.screengrab.selection.mouseX > (scrollX - 50))) {
				scrollBy(1, 0);
			} else if ((window.scrollX > 0) && (window.screengrab.selection.mouseX < (window.scrollX + 50))) {
				scrollBy(-1, 0);
			}
		}
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing_up_down = function(event) {
	var boxDiv = document.getElementById(window.screengrab.selection.BOX_DIV);

	window.screengrab.selection.mouseY = event.view ? event.pageY : window.screengrab.selection.mouseY;
	var top_tmp = window.screengrab.selection.mouseY < window.screengrab.selection.originY ? window.screengrab.selection.mouseY : window.screengrab.selection.originY;
	var top = (top_tmp < 0) ? 0 : top_tmp;
	var height = (top_tmp < 0) ? window.screengrab.selection.originY : Math.abs(window.screengrab.selection.mouseY - window.screengrab.selection.originY);

	//------------------------------------------------------------------------------------
	var doc_height = window.screengrab.selection.getDocumentHeight();
	if ((top +  height + 5) >= doc_height) {
		boxDiv.setAttribute('is_hide_bottom_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_bottom_border');
	}
	if ((top +  height + 2) >= doc_height) {
		height = doc_height - top - 2;
	}

	//------------------------------------------------------------------------------------
	boxDiv.style.display = "none";
	boxDiv.style.top = top + "px";
	boxDiv.top_box = top;
	window.screengrab.selection.setPrefs('selection.startY', top);

	if (height >= 0) {
		boxDiv.style.height = height + "px";
		boxDiv.height_box = height;
		window.screengrab.selection.setPrefs('selection.height', height);
	}
	boxDiv.style.display = "inline";
	//------------------------------------------------------------------------------------
	try {
		if (! window.screengrab.selection.check_disable_autoscroll()) {
			window.screengrab.selection.getClientSize();
			var scrollY = (window.screengrab.selection.clientHeight + window.scrollY);
			window.screengrab.selection.setPrefs('selection.scrollY', window.scrollY);
			if ((window.screengrab.selection.scrollHeight > window.screengrab.selection.mouseY) && (window.screengrab.selection.mouseY > (scrollY - 50))) {
				scrollBy(0, 1);
			} else if ((window.scrollY > 0) && (window.screengrab.selection.mouseY < (window.scrollY + 50))) {
				scrollBy(0, -1);
			}
		}
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing_move_start = function(event) {
	var boxDiv = document.getElementById(window.screengrab.selection.BOX_DIV);

	window.screengrab.selection.mouseX = event.view ? event.pageX : window.screengrab.selection.mouseX;
	window.screengrab.selection.mouseY = event.view ? event.pageY : window.screengrab.selection.mouseY;
	boxDiv.left_box += window.screengrab.selection.mouseX - window.screengrab.selection.originX;
	boxDiv.top_box += window.screengrab.selection.mouseY - window.screengrab.selection.originY;

	//------------------------------------------------------------------------------------
	var doc_width = window.screengrab.selection.getDocumentWidth();
	if ((boxDiv.left_box +  boxDiv.clientWidth + 5) >= doc_width) {
		boxDiv.setAttribute('is_hide_right_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_right_border');
	}
	if ((boxDiv.left_box +  boxDiv.clientWidth + 2) >= doc_width) { boxDiv.left_box = doc_width - boxDiv.clientWidth - 2; }
	if (boxDiv.left_box < 0) { boxDiv.left_box = 0; }

	//------------------------------------------------------------------------------------
	var doc_height = window.screengrab.selection.getDocumentHeight();
	if ((boxDiv.top_box +  boxDiv.clientHeight + 5) >= doc_height) {
		boxDiv.setAttribute('is_hide_bottom_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_bottom_border');
	}
	if ((boxDiv.top_box +  boxDiv.clientHeight + 2) >= doc_height) { boxDiv.top_box = doc_height - boxDiv.clientHeight - 2; }
	if (boxDiv.top_box < 0) { boxDiv.top_box = 0; }

	//------------------------------------------------------------------------------------
	window.screengrab.selection.setPrefs('selection.startX', boxDiv.left_box);
	window.screengrab.selection.setPrefs('selection.startY', boxDiv.top_box);

	boxDiv.style.display = "none";
	boxDiv.style.left = boxDiv.left_box + "px";
	boxDiv.style.top = boxDiv.top_box + "px";
	boxDiv.style.display = "inline";

	window.screengrab.selection.originX = event.view ? event.pageX : window.screengrab.selection.originX;
	window.screengrab.selection.originY = event.view ? event.pageY : window.screengrab.selection.originY;

	//------------------------------------------------------------------------------------
	try {
		if (! window.screengrab.selection.check_disable_autoscroll()) {
			window.screengrab.selection.getClientSize();
			var scrollX = (window.screengrab.selection.clientWidth + window.scrollX);
			window.screengrab.selection.setPrefs('selection.scrollX', window.scrollX);
			if ((window.screengrab.selection.scrollWidth > window.screengrab.selection.mouseX) && (window.screengrab.selection.mouseX > (scrollX - 50))) {
				scrollBy(1, 0);
			} else if ((window.scrollX > 0) && (window.screengrab.selection.mouseX < (window.scrollX + 50))) {
				scrollBy(-1, 0);
			}
	
			var scrollY = (window.screengrab.selection.clientHeight + window.scrollY);
			window.screengrab.selection.setPrefs('selection.scrollY', window.scrollY);
			if ((window.screengrab.selection.scrollHeight > window.screengrab.selection.mouseY) && (window.screengrab.selection.mouseY > (scrollY - 50))) {
				scrollBy(0, 1);
			} else if ((window.scrollY > 0) && (window.screengrab.selection.mouseY < (window.scrollY + 50))) {
				scrollBy(0, -1);
			}
		}
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing_text_size = function() {
	var boxDiv = document.getElementById(window.screengrab.selection.BOX_DIV);
	if (! boxDiv) { return; }

	var bar_line = document.getElementById('screengrabBoxDiv_bar_line');
	var bar_line_text_size = document.getElementById('screengrabBoxDiv_bar_line_text_size');
	var bar_line_ok = document.getElementById('screengrabBoxDiv_bar_line_ok');
	var bar_line_cancel = document.getElementById('screengrabBoxDiv_bar_line_cancel');
	window.screengrab.selection.getClientSize();

	//------------------------------------------------------------------------
	var zoom_font = window.devicePixelRatio || 1;
	var zoom = zoom_font;

	var doc_width = window.screengrab.selection.getDocumentWidth();

	bar_line_text_size.textContent = Math.round(boxDiv.width_box*zoom) + ' x ' + Math.round(boxDiv.height_box*zoom);
	bar_line_text_size.style.fontSize = Math.round(14 / zoom_font) + 'px';
	if (bar_line_ok) {
		bar_line_ok.style.width = bar_line_ok.style.height = Math.round(14 / zoom_font) + 'px';
	}
	if (bar_line_cancel) {
		bar_line_cancel.style.width = bar_line_cancel.style.height = Math.round(14 / zoom_font) + 'px';
	}

	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	var pos_top = boxDiv.top_box - window.scrollY - bar_line.clientHeight - 5;
	if (pos_top > window.screengrab.selection.clientHeight - bar_line.clientHeight) {
		pos_top = window.screengrab.selection.clientHeight - bar_line.clientHeight;
	}
	if (pos_top < 5) {
		pos_top = 5;
	}
	bar_line.style.top = pos_top + 'px';

	//------------------------------------------------------------------------
	var box_left = boxDiv.left_box + 3;
	if (boxDiv.width_box > bar_line.clientWidth+5) {
		box_left = boxDiv.left_box + boxDiv.width_box - bar_line.clientWidth - 3;
	}
	var pos_left = box_left - window.scrollX;
	if (pos_left > window.screengrab.selection.clientWidth - bar_line.clientWidth) {
		pos_left = window.screengrab.selection.clientWidth - bar_line.clientWidth;
	}
	if (pos_left < 3) {
		pos_left = 3;
	}
	bar_line.style.left = pos_left + 'px';
}
//------------------------------------------------------------------------------
window.screengrab.selection.getClientSize = function() {
	var winDoc = null;
	try {
		winDoc = (document.documentElement) ? document.documentElement : document.body;
		window.screengrab.selection.winDoc = winDoc;
	} catch(e) {
	}

	if (winDoc) {
		window.screengrab.selection.clientWidth = winDoc.clientWidth - 2;
		window.screengrab.selection.clientHeight = winDoc.clientHeight - 2;
		window.screengrab.selection.scrollWidth = (winDoc.scrollWidth > winDoc.offsetWidth) ? winDoc.scrollWidth : winDoc.offsetWidth;
		window.screengrab.selection.scrollHeight = (winDoc.scrollHeight > winDoc.offsetHeight) ? winDoc.scrollHeight : winDoc.offsetHeight;
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.boxDrawing_savePosition = function(event) {
	window.screengrab.selection.setPrefs('selection.savePosition', event.target.checked);
}
//------------------------------------------------------------------------------
window.screengrab.selection.scrollBoxDraw = function(event) {
	var event2 = new window.MouseEvent('mousemove', { 'view': null, 'bubbles': true, 'cancelable': true });
	document.dispatchEvent(event2);
}
//------------------------------------------------------------------------------
window.screengrab.selection.endBoxDraw = function(event) {
	if (window.screengrab.selection.draw_type == 'start') {
		var backgroundDiv = document.getElementById(window.screengrab.selection.BACKGROUND_DIV);
		backgroundDiv.removeEventListener("mousedown", window.screengrab.selection.beginBoxDraw);
		backgroundDiv.removeAttribute('is_start');
		if (window.screengrab.selection.fast_selection) {
			window.screengrab.selection.OnMouseUpHandlerThatHasToExistForSomeReason(event);
		}
	}
	window.screengrab.selection.draw_type = '';
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.screengrab.selection.enableDraw = function() {
	window.screengrab.selection.fast_selection = window.screengrab.selection.prefs['selection.fastMode'];

	var screengrabBar = window.document.getElementById("screengrab_bar");
	if (screengrabBar != null) {
		screengrabBar.style.background = window.screengrab.selection.SNAP_IMAGE;
		window.screengrab.selection.oldText = screengrabBar.tooltiptext;
		screengrabBar.tooltiptext = window.screengrab.selection.TOOL_TEXT;
    	}
    
	window.screengrab.selection.insertHeaderElements();
    
	var body = document.getElementsByTagName("html")[0];
        
	var drawDiv = document.createElement("div");
	drawDiv.setAttribute("id", window.screengrab.selection.DRAW_DIV);
        
	var backgroundDiv = document.createElement("div");
	backgroundDiv.setAttribute("id",  window.screengrab.selection.BACKGROUND_DIV);
	backgroundDiv.setAttribute("class", "backgroundOverlay");
	drawDiv.appendChild(backgroundDiv);
	body.appendChild(drawDiv);

	//------------------------------------------------------------------------
	var hide_hint_text = window.screengrab.selection.prefs['selection.hide_hint_text'];
	var screengrab_bar_hint = document.createElement("div");
	screengrab_bar_hint.id = 'screengrab_bar_hint';
	backgroundDiv.appendChild(screengrab_bar_hint);
	//------------------------------------------------------------------------
	if (! hide_hint_text) {
		var screengrab_bar_hint_esc = document.createElement("div");
		screengrab_bar_hint_esc.id = 'screengrab_esc_text';
		screengrab_bar_hint_esc.textContent = window.screengrab.selection.string_list['selection.esc.exit'];
		screengrab_bar_hint.appendChild(screengrab_bar_hint_esc);

		if (! window.screengrab.selection.fast_selection) {
			var screengrab_bar_hint_fast_mode = document.createElement("div");
			screengrab_bar_hint_fast_mode.id = 'screengrab_bar_fx_fast_mode_descr';
			screengrab_bar_hint.appendChild(screengrab_bar_hint_fast_mode);
	
			var fast_mode_descr = document.createElement("div");
			fast_mode_descr.id = 'screengrab_fast_mode_text';
			screengrab_bar_hint_fast_mode.appendChild(fast_mode_descr);
	
			fast_mode_descr.appendChild(document.createTextNode(window.screengrab.selection.string_list['selection.fast_mode']));
			fast_mode_descr.appendChild(document.createElement("br"));
			fast_mode_descr.appendChild(document.createTextNode(window.screengrab.selection.string_list['selection.fast_mode.temp']));
			fast_mode_descr.appendChild(document.createElement("br"));
			fast_mode_descr.appendChild(document.createTextNode(window.screengrab.selection.string_list['selection.fast_mode.always']));
		}
	}
	//------------------------------------------------------------------------
        
	document.addEventListener("mousemove", window.screengrab.selection.boxDrawing, true);
	document.addEventListener("mouseup", window.screengrab.selection.endBoxDraw, true);
	document.addEventListener("scroll", window.screengrab.selection.scrollBoxDraw, true);
	document.addEventListener("keydown", window.screengrab.selection.OnKeyDownHandler, true);

	window.screengrab.selection.offsetX = pageXOffset || window.scrollX;
	window.screengrab.selection.offsetY = pageYOffset || window.scrollY;

	//------------------------------------------------------------------------
	window.screengrab.selection.getClientSize();
	window.screengrab.drawing = true;

	//------------------------------------------------------------------------
	var savePosition = window.screengrab.selection.prefs['selection.savePosition'];
	if (savePosition && (! window.screengrab.selection.fast_selection)) {
		window.screengrab.selection.fastModeTextHide();
		window.screengrab.selection.restoreBoxDraw();
	} else {
		backgroundDiv.setAttribute('is_start', true);
		backgroundDiv.addEventListener("mousedown", window.screengrab.selection.beginBoxDraw);
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.disableDrawAndGrabIfRequired = function(event) {
	var result = window.screengrab.selection.disableDraw(event);
	if (result.box != null && event != null) {
		setTimeout(function(){
			chrome.runtime.sendMessage({ 'action' : 'capture_set_selection', 'dimensions': result.dimBox }, function(response) {});
		}, 10);
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.OnMouseUpHandlerThatHasToExistForSomeReason = function(event) {
	if (event.target.id == 'screengrab_esc_text') {
		window.screengrab.selection.disableDraw(event);
	} else {
		window.screengrab.selection.disableDrawAndGrabIfRequired(event);
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.OnKeyDownHandler = function(event) {
	if (event.keyCode === 27 ) {
		window.screengrab.selection.disableDraw(event);
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.disableDraw = function(event) {
	try {
		document.removeEventListener("mousemove", window.screengrab.selection.boxDrawing, true);
		document.removeEventListener("mouseup", window.screengrab.selection.endBoxDraw, true);
		document.removeEventListener("scroll", window.screengrab.selection.scrollBoxDraw, true);
		document.removeEventListener("keydown", window.screengrab.selection.OnKeyDownHandler, true);
	} catch (error) {
	}
	var box = null;
	var dimBox = null;
	try {
		var body = document.getElementsByTagName("html")[0];

		// create a box to hold the dimensions of the box
		box = document.getElementById( window.screengrab.selection.BOX_DIV);
		if (box && (box != null)) {
//			dimBox = new screengrab.Box(box.offsetLeft, box.offsetTop, box.clientWidth, box.clientHeight)

			var zoom = window.devicePixelRatio || 1;
			dimBox = { 'startX' : Math.floor(box.offsetLeft * zoom), 'startY' : Math.floor(box.offsetTop * zoom), 'width' : Math.floor(box.clientWidth * zoom), 'height' : Math.floor(box.clientHeight * zoom) };
			// remove the box div
			body.removeChild(box);
		}
		var newDiv = document.getElementById(window.screengrab.selection.DRAW_DIV);
		if (newDiv) {
			body.removeChild(newDiv);
		}
	    	
		// restore the styling to the screengrab bar
		var screengrabBar = window.document.getElementById("screengrab_bar");
		if (screengrabBar != null) {
			screengrabBar.style.background = window.screengrab.selection.IDLE_IMAGE;
			screengrabBar.tooltiptext = window.screengrab.selection.oldText;
		}

		window.screengrab.drawing = false;

		//--------------------------------------------------------------
		// check scrolling page
		//--------------------------------------------------------------
		if (dimBox) {
			dimBox.disable_autoscroll = window.screengrab.selection.check_disable_autoscroll();

			var zoom = window.devicePixelRatio || 1;
			if ((dimBox.startY >= window.scrollY*zoom) && ((dimBox.startY + dimBox.height) <= (window.scrollY*zoom + window.screengrab.selection.winDoc.clientHeight*zoom))) {
				if ((dimBox.startX >= window.scrollX*zoom) && ((dimBox.startX + dimBox.width) <= (window.scrollX*zoom + window.screengrab.selection.winDoc.clientWidth*zoom))) {
					dimBox.disable_autoscroll = true;
				}
			}
		}
	    } catch (error) {
//		screengrab.error(error);
	}
	return { 'box' : box, 'dimBox' : dimBox };
}
//------------------------------------------------------------------------------
window.screengrab.selection.screengrab_bar_hint_hide = function() {
	var screengrab_bar_hint = document.getElementById('screengrab_bar_hint');
	if (screengrab_bar_hint) {
		screengrab_bar_hint.parentNode.removeChild(screengrab_bar_hint);
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.fastModeTextHide = function() {
	var screengrab_bar_hint_fast_mode = document.getElementById('screengrab_bar_hint_fast_mode_descr');
	if (screengrab_bar_hint_fast_mode) {
		screengrab_bar_hint_fast_mode.parentNode.removeChild(screengrab_bar_hint_fast_mode);
	}
}
//------------------------------------------------------------------------------
window.screengrab.selection.getDocumentHeight = function() {
	var height = (document.documentElement.scrollHeight > document.documentElement.offsetHeight) ? document.documentElement.scrollHeight : document.documentElement.offsetHeight;

	if (document && document.body) {
		var body_height = (document.body.scrollHeight > document.body.offsetHeight) ? document.body.scrollHeight : document.body.offsetHeight;
		if (body_height > height) {
			height = body_height;
		}
//		height = document.body.clientHeight;
	}
	return height;
}
//------------------------------------------------------------------------------
window.screengrab.selection.getDocumentWidth = function() {
//	return (document.body.scrollWidth > document.body.offsetWidth) ? document.body.scrollWidth : document.body.offsetWidth;
	var width = (document.documentElement.scrollWidth > document.documentElement.offsetWidth) ? document.documentElement.scrollWidth : document.documentElement.offsetWidth;
	if (width <= 0) {
		if (document && document.body) {
			width = document.body.clientWidth;
		}
	}
	return width;
}
//------------------------------------------------------------------------------
window.screengrab.selection.setPrefs = function(name, value) {
	try {
		clearTimeout(window.screengrab.selection.save_selection_timer[name]);
	} catch(e) {};
	window.screengrab.selection.save_selection_timer[name] = setTimeout(function(){
		chrome.runtime.sendMessage({ action_prefs_set : true, 'pref_name' : name, 'pref_value' : value }, function(response) {});
	}, 200);
	window.screengrab.selection.prefs[name] = value;
}
//------------------------------------------------------------------------------
window.screengrab.selection.check_disable_autoscroll = function() {
	var result = false;

	if (window.document.location.host == 'twitter.com') {
		var body = window.document.getElementsByTagName("body")[0];
		if (/overlay\-enabled/.test(body.className)) {
			result = true;
		}
		else if (/gallery\-enabled/.test(body.className)) {
			result = true;
		}
	}
	if ((window.scrollY == 0) && (window.screengrab.selection.winDoc.clientHeight == window.screengrab.selection.winDoc.scrollHeight)) {
		if ((window.scrollX == 0) && (window.screengrab.selection.winDoc.clientWidth == window.screengrab.selection.winDoc.scrollWidth)) {
			result = true;
		}
	}

	return result;
}
//------------------------------------------------------------------------------
if (! window.screengrab.is_listener_selection) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.action == 'capture_cancel') {
			window.screengrab.selection.disableDrawAndGrabIfRequired();
		}
	});
	window.screengrab.is_listener_selection = true;
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.screengrab.selection.init();
