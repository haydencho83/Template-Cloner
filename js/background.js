chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: 'js/content.js'});
	chrome.runtime.onMessage.addListener(function(componentObj, sender, sendResponse) {
		chrome.windows.create({type: 'detached_panel', width: 800, focused: true, url: 'popup.html'}, function(window){});
	})
})
