
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: 'js/content.js'});
	chrome.runtime.onMessage.addListener(function(componentObj, sender, sendResponse) {
		// chrome.tabs.create({url: "newtab.html"});
		// console.log(chrome);
		chrome.windows.create({type: 'detached_panel', width: 600, focused: true, url: 'newtab.html'}, function(window){
			


		})

		console.log(componentObj)
	})

})