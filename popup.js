// var template, css;
console.log('popup');
document.addEventListener('DOMContentLoaded', function(){
	var window = chrome.extension.getBackgroundPage();
	var document = window.document;
	
});


chrome.runtime.onMessage.addListener(function(componentObj, sender, sendResponse) {
	var component = componentObj;
	document.getElementById('template').textContent = component.template;
	document.getElementById('css').textContent = component.css;
})