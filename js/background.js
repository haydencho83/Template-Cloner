
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: 'js/content.js'});
	chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
		console.log(response);
	})

})