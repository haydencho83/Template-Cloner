chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file: 'js/content.js'});
	// chrome.windows.create({type: 'detached_panel', width: 600, focused: true, url: 'popup.html'}, function(window){})
	console.log(chrome.windows);
})



chrome.runtime.onMessage.addListener(function(componentObj, sender, sendResponse) {

	
})






// 	if (componentObj.component) { template += componentObj.component }
// 	if (componentObj.css) { css += componentObj.css }

// 	// chrome.windows.create({type: 'detached_panel', width: 600, focused: true, url: 'popup.html'}, function(window){
// 	// 	chrome.runtime.sendMessage({template: template, css: css})
// 	// })

