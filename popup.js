document.addEventListener('DOMContentLoaded', function(){

	var bg = chrome.extension.getBackgroundPage();
	var template = bg.template;
	var css = bg.css;

	document.getElementById('template').textContent = template;
	document.getElementById('css').textContent = css;	

	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.type = 'text/css';

	if (style.styleSheet) { style.styleSheet.cssText = css; }
	else { style.appendChild(document.createTextNode(css)); }

	head.appendChild(style);

	var cloned = document.getElementsByClassName('cloned')[0];
	cloned.innerHTML = template;

	var codepenForm = $('#codepen-form');
	codepenForm.on('submit', function() {
		var dataInput = codepenForm.find('input[name=data]');
		dataInput.val(JSON.stringify({
			html: template,
			css: css
		}));
	});
	
})





