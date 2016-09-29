var TPloaded = false;
var windowId = null;

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: 'js/content.js'});
	chrome.runtime.onMessage.addListener(function(componentObj) {
		window.template = componentObj.template;
		window.css = componentObj.css;

		if (!TPloaded) {
			chrome.windows.create({type: 'detached_panel', width: 800, focused: true, url: 'popup.html'}, function(window){ windowId = window.id});
			TPloaded = true;
		} else {
			chrome.windows.remove(windowId);
			chrome.windows.create({type: 'detached_panel', width: 800, focused: true, url: 'popup.html'}, function(window){ windowId = window.id});
		}
	})

});
