var s3sg = {};
s3sg.action_canceled = false;

//------------------------------------------------------------------------------
s3sg.init_0 = function() {
	chrome.runtime.sendMessage({ action_check_mhtml : true }, function(response) {
		if (response && response.saveAsMHTML) {
		} else {
			document.getElementById('s3sg_save_mhtml_block').style.display = 'none';
		}
		s3sg.init_pre();
	});
}
//------------------------------------------------------------------------------
s3sg.init_pre = function() {
	document.getElementById('s3sg_save_visible_portion').addEventListener("click", function() { s3sg.action('save', 'visible_portion'); });
	document.getElementById('s3sg_save_mhtml_visible_portion').addEventListener("click", function() { s3sg.action('save_mhtml', 'visible_portion'); });
	document.getElementById('s3sg_copy_visible_portion').addEventListener("click", function() { s3sg.action('copy', 'visible_portion'); });
	document.getElementById('s3sg_upload_visible_portion').addEventListener("click", function() { s3sg.action('upload', 'visible_portion'); });
	document.getElementById('s3sg_preview_visible_portion').addEventListener("click", function() { s3sg.action('preview', 'visible_portion'); });
	document.getElementById('s3sg_settings').addEventListener("click", s3sg.open_options_window);

	document.getElementById('s3sg_action_prepare_cancel').addEventListener("click", function() { s3sg.prepare_cancel(); });

	setTimeout(function(){ s3sg.utils.i18n_parse(document); }, 100);
	s3sg.init();
	//------------------------------------------------------------------------
	if (s3sg.utils.clipboard_image_not_copy()) {
		document.getElementById('s3sg_copy_block').style.display = 'none';
	}
}
//------------------------------------------------------------------------------
s3sg.init = function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		var tab = tabs[0];
		chrome.tabs.executeScript(tab.id, { 'file': '/content/check_tab.js', 'runAt' : 'document_start' }, function(callback) {
			var last_operation = s3sg.utils.prefs_get('last_operation');
			var last_operation_inactive = false;
			//-----------------------------------------------------------
			if (chrome.runtime.lastError) {
				document.getElementById('s3sg_save_page').setAttribute('is_inactive', true);
				document.getElementById('s3sg_save_page_force').setAttribute('is_inactive', true);
				document.getElementById('s3sg_save_selection').setAttribute('is_inactive', true);
				document.getElementById('s3sg_save_mhtml_page').setAttribute('is_inactive', true);
				document.getElementById('s3sg_save_mhtml_page_force').setAttribute('is_inactive', true);
				document.getElementById('s3sg_save_mhtml_selection').setAttribute('is_inactive', true);
				document.getElementById('s3sg_copy_page').setAttribute('is_inactive', true);
				document.getElementById('s3sg_copy_page_force').setAttribute('is_inactive', true);
				document.getElementById('s3sg_copy_selection').setAttribute('is_inactive', true);
				document.getElementById('s3sg_upload_page').setAttribute('is_inactive', true);
				document.getElementById('s3sg_upload_page_force').setAttribute('is_inactive', true);
				document.getElementById('s3sg_upload_selection').setAttribute('is_inactive', true);
				document.getElementById('s3sg_preview_page').setAttribute('is_inactive', true);
				document.getElementById('s3sg_preview_page_force').setAttribute('is_inactive', true);
				document.getElementById('s3sg_preview_selection').setAttribute('is_inactive', true);
				last_operation_inactive = true;
			}
			//-----------------------------------------------------------
			else {
				document.getElementById('s3sg_save_page').addEventListener("click", function() { s3sg.action('save', 'page'); });
				document.getElementById('s3sg_save_page_force').addEventListener("click", function() { s3sg.action('save', 'page_force'); });
				document.getElementById('s3sg_save_selection').addEventListener("click", function() { s3sg.action('save', 'selection'); });
				document.getElementById('s3sg_save_mhtml_page').addEventListener("click", function() { s3sg.action('save_mhtml', 'page'); });
				document.getElementById('s3sg_save_mhtml_page_force').addEventListener("click", function() { s3sg.action('save_mhtml', 'page_force'); });
				document.getElementById('s3sg_save_mhtml_selection').addEventListener("click", function() { s3sg.action('save_mhtml', 'selection'); });
				document.getElementById('s3sg_copy_page').addEventListener("click", function() { s3sg.action('copy', 'page'); });
				document.getElementById('s3sg_copy_page_force').addEventListener("click", function() { s3sg.action('copy', 'page_force'); });
				document.getElementById('s3sg_copy_selection').addEventListener("click", function() { s3sg.action('copy', 'selection'); });
				document.getElementById('s3sg_upload_page').addEventListener("click", function() { s3sg.action('upload', 'page'); });
				document.getElementById('s3sg_upload_page_force').addEventListener("click", function() { s3sg.action('upload', 'page_force'); });
				document.getElementById('s3sg_upload_selection').addEventListener("click", function() { s3sg.action('upload', 'selection'); });
				document.getElementById('s3sg_preview_page').addEventListener("click", function() { s3sg.action('preview', 'page'); });
				document.getElementById('s3sg_preview_page_force').addEventListener("click", function() { s3sg.action('preview', 'page_force'); });
				document.getElementById('s3sg_preview_selection').addEventListener("click", function() { s3sg.action('preview', 'selection'); });
			}
			//-----------------------------------------------------------
			if (last_operation_inactive && (last_operation.target != 'visible_portion')) {
				document.getElementById('s3sg_last_operation').setAttribute('is_inactive', true);
			} else {
				document.getElementById('s3sg_last_operation').addEventListener("click", function() { s3sg.action(last_operation.method, last_operation.target); });
			}
			//-----------------------------------------------------------
			s3sg.utils.HTMLDOM_value(document.getElementById('s3sg_last_operation_method'), s3sg.utils.get_string(last_operation.method + '_operation'));
			s3sg.utils.HTMLDOM_value(document.getElementById('s3sg_last_operation_target'), s3sg.utils.get_string(last_operation.target));

			//-----------------------------------------------------------
			//-----------------------------------------------------------
			var buttonClickIconGeneral = s3sg.utils.prefs_get('buttonClickIconGeneral');
			var buttonClickIconAdditional = s3sg.utils.prefs_get('buttonClickIconAdditional');
			if (buttonClickIconGeneral != 'menu') {
				var run_action = true;
				if (last_operation_inactive && (buttonClickIconAdditional != 'visible_portion')) {
					run_action = false;
				}
				if (run_action) {
					s3sg.action(buttonClickIconGeneral, buttonClickIconAdditional);
				}
			}
			//-----------------------------------------------------------
			if (s3sg.utils.prefs_get('uploadDisable')) {
				document.getElementById('s3sg_upload_block').style.display = 'none';
			}
			//-----------------------------------------------------------
			if (s3sg.utils.prefs_get('onlyPageForce')) {
				document.getElementById('s3sg_save_page').style.display = 'none';
				document.getElementById('s3sg_save_mhtml_page').style.display = 'none';
				document.getElementById('s3sg_copy_page').style.display = 'none';
				document.getElementById('s3sg_upload_page').style.display = 'none';
				document.getElementById('s3sg_preview_page').style.display = 'none';
			}
		});
	});
}
//------------------------------------------------------------------------------
s3sg.action = function(method, target) {
	s3sg.action_canceled = false;
	chrome.runtime.sendMessage({ 'action' : 'capture', 'method' : method, 'target' : target }, function(response) {
		chrome.runtime.sendMessage({ 'action_prefs_set' : true, 'pref_name' : 'last_operation', 'pref_value' : { 'method' : method, 'target' : target } }, function(response) {});
		if ((target !== 'page') && (target !== 'page_force')) {
			window.close();
		}
	});
}
//------------------------------------------------------------------------------
s3sg.prepare_cancel = function() {
	chrome.runtime.sendMessage({ 'action' : 'capture_cancel' }, function(response) {});
	s3sg.action_canceled = true;
	s3sg.prepare_end_text();
}
//------------------------------------------------------------------------------
s3sg.prepare_start_text = function() {
	document.getElementById('s3sg_action_list').setAttribute('is_hidden', true);
	document.getElementById('s3sg_action_prepare').removeAttribute('is_hidden');
	document.getElementById('s3sg_action_prepare_percent').textContent = '0%';
}
//------------------------------------------------------------------------------
s3sg.prepare_end_text = function() {
	document.getElementById('s3sg_action_list').removeAttribute('is_hidden');
	document.getElementById('s3sg_action_prepare').setAttribute('is_hidden', true);
}
//------------------------------------------------------------------------------
s3sg.open_options_window = function() {
	chrome.runtime.openOptionsPage();
	window.close();
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//------------------------------------------------------------------
		if (! request) { return; }
		if (! request.action) { return; }

		//------------------------------------------------------------------
		if (request.action == 'capture_page_start') {
			s3sg.prepare_start_text();
		}
		//------------------------------------------------------------------
		else if ((request.action == 'capture_page') || (request.action == 'capture_page_drawWindow')) {
			if (! s3sg.action_canceled) {
				s3sg.prepare_start_text();
				document.getElementById('s3sg_action_prepare_percent').textContent = parseInt(request.complete * 100) + '%';
			}
		}
		//------------------------------------------------------------------
		else if (request.action == 'capture_page_end') {
			window.close();
		}
	}
);
//------------------------------------------------------------------------------
window.addEventListener("load", s3sg.init_0);
