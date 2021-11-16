// http://www.elated.com/articles/javascript-tabs/

var tabs = {};
tabs.tabLinks = new Array();
tabs.contentDivs = new Array();

tabs.init = function() {
	// Grab the tab links and content divs from the page
	var tabListItems = document.getElementById('tabs').childNodes;
	for ( var i = 0; i < tabListItems.length; i++ ) {
		if ( tabListItems[i].nodeName == "LI" ) {
			var tabLink = tabs.getFirstChildWithTagName( tabListItems[i], 'A' );
			var id = tabs.getHash( tabLink.getAttribute('href') );
			tabs.tabLinks[id] = tabLink;
			tabs.contentDivs[id] = document.getElementById( id );
		}
	}

	// Assign onclick events to the tab links, and
	// highlight the first tab
	var i = 0;

	for ( var id in tabs.tabLinks ) {
		tabs.tabLinks[id].onclick = tabs.showTab;
		tabs.tabLinks[id].onfocus = function() { this.blur() };
		if ( i == 0 ) tabs.tabLinks[id].className = 'selected';
		i++;
	}

	// Hide all content divs except the first
	var i = 0;

	for ( var id in tabs.contentDivs ) {
		if ( i != 0 ) tabs.contentDivs[id].className = 'tabContent hide';
		i++;
	}
	document.getElementById('tabsBox').width = document.getElementById('tabsBox').clientWidth + 'px';
}

tabs.showTab = function(event, href) {
	try {
		event.preventDefault();
		event.stopPropagation();
	} catch(e) {
	}

	var selectedId = tabs.getHash( href || this.getAttribute('href') );

	// Highlight the selected tab, and dim all others.
	// Also show the selected content div, and hide all others.
	for ( var id in tabs.contentDivs ) {
		if ( id == selectedId ) {
			tabs.tabLinks[id].className = 'selected';
			tabs.contentDivs[id].className = 'tabContent';
		} else {
			tabs.tabLinks[id].className = '';
			tabs.contentDivs[id].className = 'tabContent hide';
		}
	}
	window.location.replace(href || this.getAttribute('href'));
}

tabs.getFirstChildWithTagName = function( element, tagName ) {
	for ( var i = 0; i < element.childNodes.length; i++ ) {
		if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
	}
}

tabs.getHash = function( url ) {
	var hashPos = url.lastIndexOf ( '#' );
	return url.substring( hashPos + 1 );
}

window.addEventListener("load", tabs.init);
