
chrome.browserAction.onClicked.addListener(function(tab) {
	var template = '';
	var css = '';
	chrome.tabs.executeScript(tab.id, {file: 'js/content.js'});

	chrome.runtime.onMessage.addListener(function(componentObj, sender, sendResponse) {
		if (componentObj.component) { template += componentObj.component }
		if (componentObj.css) { css += componentObj.css }

		console.log(template);
		console.log(css);
		
		chrome.windows.create({type: 'detached_panel', width: 600, focused: true, url: 'newtab.html'}, function(window){
			chrome.runtime.sendMessage({template: template, css: css})
		})

	})

})