//------------------------------------------------------------------------------
if (! window.screengrab) {
	window.screengrab = {};
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
if (! window.screengrab.is_hotkeys_init) {
	window.screengrab.is_hotkeys_init = true;
	window.screengrab.hotkeys_pause = 0;
	window.addEventListener('keydown', function(e) {
		window.screengrab.hotkeys_press(e);
	});
}
//------------------------------------------------------------------------------
window.screengrab.hotkeys_press = function(event) {
	var time = (new Date()).getTime();
	if (window.screengrab.hotkeys_pause < time-(1000*5)) {
		chrome.runtime.sendMessage({ action_prefs_get : true }, function(response) {
			if (response && response.prefs_list && response.prefs_list.hotkeys) {
				window.screengrab.hotkeys_check(event, response.prefs_list.hotkeys);
			}
		});
	}
}
//------------------------------------------------------------------------------
window.screengrab.hotkeys_check = function(event, hotkeys) {
	for (var i=0; i<hotkeys.length; i++) {
		var key = hotkeys[i];
		if ((key.shiftKey == event.shiftKey) && (key.ctrlKey == event.ctrlKey) && (key.altKey == event.altKey) && (key.keyCode == event.keyCode)) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			window.screengrab.hotkeys_pause = (new Date()).getTime();
			chrome.runtime.sendMessage({ 'action' : 'capture', 'method' : key.method, 'target' : key.target, 'closetab' : key.closetab }, function(response) {
				chrome.runtime.sendMessage({ 'action_prefs_set' : true, 'pref_name' : 'last_operation', 'pref_value' : { 'method' : key.method, 'target' : key.target } }, function(response) {});
			});
			break;
		}
	}
}
//------------------------------------------------------------------------------
