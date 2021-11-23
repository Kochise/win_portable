(function() {
	/** Pop-up fade-in/-out delay */
	var FADE_DURATION = 250;
	
	/**
	 * Load the stylesheet that will pick the correct font for the user's OS
	 */
	function loadOSStyles() {
		var osStyle = document.createElement('link');
		osStyle.rel = 'stylesheet';
		osStyle.type = 'text/css';
		cssPath = 'css/ext/';
		if(navigator.userAgent.indexOf('Windows') !== -1) {
			osStyle.href = cssPath + 'options-win.css';
		} else if(navigator.userAgent.indexOf('Macintosh') !== -1) {
			osStyle.href = cssPath + 'options-mac.css';
		} else if(navigator.userAgent.indexOf('CrOS') !== -1) {
			osStyle.href = cssPath + 'options-cros.css';
			// Change the “Chrome” label to “Chrome OS” on CrOS.
			document.querySelector('.sideBar h1').innerText = 'Chrome OS';
		} else {
			osStyle.href = cssPath + 'options-linux.css';
		}
		document.head.appendChild(osStyle);
	}
	
	/**
	 * Change any chrome:// link to use the goToPage function
	 */
	function setUpChromeLinks() {
		// Get the list of <a>s.
		var links = document.getElementsByTagName('a');
		// For each link,
		for(var i = 0; i < links.length; i++) {
			// if the URL begins with “chrome://”,
			if(links[i].href.indexOf('chrome://') === 0) {
				// tell it to goToPage onclick.
				links[i].onclick = goToPage;
			}
		}
	}
	
	/**
	 * Use chrome.tabs.update to open a link Chrome will not open normally
	 */
	function goToPage(e) {
		// Prevent the browser from following the link.
		e.preventDefault();
		chrome.tabs.update({ url: e.target.href });
	}
	
	
	// Load OS styles and set up chrome:// links when the page loads.
	window.addEventListener('load', function() {
		loadOSStyles();
		setUpChromeLinks();
	}, false);
})();