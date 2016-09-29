/* global variables */
var userCustomizedName;
var template = '';
var css = '';


/* constructor function */
function TemplateCloner() {

	this.addEventListeners = function() {
		var document = getCurrentDocument();
		var elements = getAllElements(document.body);

		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener("mouseover", eMouseOver, false);
			elements[i].addEventListener("mouseout", eMouseOut, false);
			elements[i].addEventListener("mousedown", eMouseDown, false);
		}
	}

	this.removeEventListeners = function() {
		var document = getCurrentDocument();
		var elements = getAllElements(document.body);

		for (var i = 0; i < elements.length; i++) {
			elements[i].removeEventListener("mouseover", eMouseOver, false);
			elements[i].removeEventListener("mouseout", eMouseOut, false);
			elements[i].removeEventListener("mousedown", eMouseDown, false);
		}	
	}
}

/* eventListner */
function eMouseOver(e) {
	e.stopPropagation();
	this.style.outline = '1px dashed #f00';

	var self = this;
	setTimeout(function(){ self.style.outline = ''; }, 3000);
}

function eMouseOut(e) {
	e.stopPropagation();
	this.style.outline = '';
}

function eMouseDown(e) {
	e.stopPropagation();
	this.style.outline = '';
	
	template = '';
	css = '';
	userCustomizedName = '';
	
	template += getComponent(this);
	setTimeout(sendMessageToPopup, 500);
}


/* main functionalities */
//getting component of ONE element
function getComponent(element){
	var component = '';
	getUserCustomizedName();
	var className = `${userCustomizedName}-${Date.now()}-${element.tagName.toLowerCase()}-component-clone`;
	getComponentCSS(element, className);

	if ($(element).attr('src')) {
		var imageSrc = ` src="${window.location.href + $(element).attr('src')}"`;
	} else { var imageSrc = ''}

	component += `<${element.tagName.toLowerCase()} class="${className}"${imageSrc}>`;
	for (var i = 0; i < element.childNodes.length; i++) {
		if (element.childNodes[i].nodeType == 3) component += element.childNodes[i].nodeValue;
		else if (element.childNodes[i].nodeType == 1) {
			component += getComponent(element.childNodes[i]);
		}
	}
	component += `</${element.tagName.toLowerCase()}>`;
	return component;
}

function getUserCustomizedName() {
	if (!userCustomizedName) {userCustomizedName = prompt(`what is the name of this template?(Don't include '.,')`); }
	return userCustomizedName;
}

function sendMessageToPopup() {
	chrome.runtime.sendMessage({template: template, css: css})
}

function getComponentCSS(element, className) {
	var CSSComponent = element.tagName.toLowerCase() + '.' + className + ' {'
		+ getFontCSSProperty(element) 
		+ getTextCSSProperty(element)
		+ getColorBgCSSProperty(element)
		+ getBoxCSSProperty(element)
		+ getPositionCSSProperty(element)
		+ getTableCSSProperty(element)
		+ getListCSSProperty(element)
		+ getMiscCSSProperty(element)
		+ getEffectCSSProperty(element)
	  + '\n}\n\n';

	  css += CSSComponent;
}


/* retrieve CSS property from the element */
function getCSSProperty(element, property, condition) {
	if ($(element).css(property) != condition) return `${property}: ${$(element).css(property)}`;
}

function getFontCSSProperty(element) {
	var fontCSS = '';
	//font
	if (getCSSProperty(element, 'font-family')) fontCSS += '\n\t' + getCSSProperty(element, 'font-family') + ';';
	if (getCSSProperty(element, 'font-size')) fontCSS += '\n\t' + getCSSProperty(element, 'font-size') + ';';
	if (getCSSProperty(element, 'font-weight', '400')) fontCSS += '\n\t' + getCSSProperty(element, 'font-weight') + ';';
	if (getCSSProperty(element, 'font-variant', 'normal')) fontCSS += '\n\t' + getCSSProperty(element, 'font-variant') + ';';
	if (getCSSProperty(element, 'font-style', 'normal')) fontCSS += '\n\t' + getCSSProperty(element, 'font-style') + ';';
	return fontCSS;
}


function getTextCSSProperty(element) {
	var textCSS = '';
	//text
	if (getCSSProperty(element, 'letter-spacing', '0')) textCSS += '\n\t' + getCSSProperty(element, 'letter-spacing') + ';';
	if (getCSSProperty(element, 'line-height', 'normal')) textCSS += '\n\t' + getCSSProperty(element, 'line-height') + ';';
	if (getCSSProperty(element, 'text-decoration', 'none')) textCSS += '\n\t' + getCSSProperty(element, 'text-decoration') + ';';
	if (getCSSProperty(element, 'text-align', 'start')) textCSS += '\n\t' + getCSSProperty(element, 'text-align') + ';';
	if (getCSSProperty(element, 'text-indent', '0px')) textCSS += '\n\t' + getCSSProperty(element, 'text-indent') + ';';
	if (getCSSProperty(element, 'text-transform', 'none')) textCSS += '\n\t' + getCSSProperty(element, 'text-transform') + ';';
	if (getCSSProperty(element, 'vertical-align', 'baseline')) textCSS += '\n\t' + getCSSProperty(element, 'vertical-align') + ';';
	if (getCSSProperty(element, 'white-space', 'normal')) textCSS += '\n\t' + getCSSProperty(element, 'white-space') + ';';
	if (getCSSProperty(element, 'word-spacing', '0px')) textCSS += '\n\t' + getCSSProperty(element, 'word-spacing') + ';';
	return textCSS;
}

function getColorBgCSSProperty(element) {
	var colorBgCSS = '';
	//color & background
	if (getCSSProperty(element, 'color')) colorBgCSS += '\n\t' + getCSSProperty(element, 'color') + ';';
	if (getCSSProperty(element, 'background-color', 'rgba(0, 0, 0, 0)')) colorBgCSS += '\n\t' + getCSSProperty(element, 'background-color') + ';';
	if (getCSSProperty(element, 'background-attachment', 'scroll')) colorBgCSS += '\n\t' + getCSSProperty(element, 'background-attachment') + ';';
	if (getCSSProperty(element, 'background-image', 'none')) colorBgCSS += '\n\t' + getCSSProperty(element, 'background-image') + ';';
	if (getCSSProperty(element, 'background-position', '0% 0%')) colorBgCSS += '\n\t' + getCSSProperty(element, 'background-position') + ';';
	if (getCSSProperty(element, 'background-repeat', 'repeat')) colorBgCSS += '\n\t' + getCSSProperty(element, 'background-repeat') + ';';
	return colorBgCSS;
}

function getBoxCSSProperty(element) {
	var boxCSS = '';
	//height-width
	if (getCSSProperty(element, 'height', 'auto')) boxCSS += '\n\t' + getCSSProperty(element, 'height') + ';';
	if (getCSSProperty(element, 'width', 'auto')) boxCSS += '\n\t' + getCSSProperty(element, 'width') + ';';

	//border
	if (getCSSProperty(element, 'border-top-width', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-top-width') + ';';
	if (getCSSProperty(element, 'border-bottom-width', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-bottom-width') + ';';
	if (getCSSProperty(element, 'border-right-width', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-right-width') + ';';
	if (getCSSProperty(element, 'border-left-width', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-left-width') + ';';

	if (getCSSProperty(element, 'border-top-style', 'none')) boxCSS += '\n\t' + getCSSProperty(element, 'border-top-style') + ';';
	if (getCSSProperty(element, 'border-bottom-style', 'none')) boxCSS += '\n\t' + getCSSProperty(element, 'border-bottom-style') + ';';
	if (getCSSProperty(element, 'border-right-style', 'none')) boxCSS += '\n\t' + getCSSProperty(element, 'border-right-style') + ';';
	if (getCSSProperty(element, 'border-left-style', 'none')) boxCSS += '\n\t' + getCSSProperty(element, 'border-left-style') + ';';

	if (getCSSProperty(element, 'border-top-color', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-top-color') + ';';
	if (getCSSProperty(element, 'border-bottom-color', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-bottom-color') + ';';
	if (getCSSProperty(element, 'border-right-color', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-right-color') + ';';
	if (getCSSProperty(element, 'border-left-color', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'border-left-color') + ';';
	
	//margin
	if (getCSSProperty(element, 'margin-top', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'margin-top') + ';';
	if (getCSSProperty(element, 'margin-bottom', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'margin-bottom') + ';';
	if (getCSSProperty(element, 'margin-right', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'margin-right') + ';';
	if (getCSSProperty(element, 'margin-left', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'margin-left') + ';';

	//padding
	if (getCSSProperty(element, 'padding-top', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'padding-top') + ';';
	if (getCSSProperty(element, 'padding-bottom', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'padding-bottom') + ';';
	if (getCSSProperty(element, 'padding-right', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'padding-right') + ';';
	if (getCSSProperty(element, 'padding-left', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'padding-left') + ';';

	//max-min height-width
	if (getCSSProperty(element, 'min-height', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'min-height') + ';';
	if (getCSSProperty(element, 'min-width', '0px')) boxCSS += '\n\t' + getCSSProperty(element, 'min-width') + ';';
	if (getCSSProperty(element, 'max-height', 'none')) boxCSS += '\n\t' + getCSSProperty(element, 'max-height') + ';';
	if (getCSSProperty(element, 'max-width', 'none')) boxCSS += '\n\t' + getCSSProperty(element, 'max-width') + ';';
	return boxCSS;
}

function getPositionCSSProperty(element) {
	var positionCSS = '';
	//position
	if (getCSSProperty(element, 'position', 'static')) positionCSS += '\n\t' + getCSSProperty(element, 'position') + ';';
	if (getCSSProperty(element, 'top', 'auto')) positionCSS += '\n\t' + getCSSProperty(element, 'top') + ';';
	if (getCSSProperty(element, 'bottom', 'auto')) positionCSS += '\n\t' + getCSSProperty(element, 'bottom') + ';';
	if (getCSSProperty(element, 'right', 'auto')) positionCSS += '\n\t' + getCSSProperty(element, 'right') + ';';
	if (getCSSProperty(element, 'left', 'auto')) positionCSS += '\n\t' + getCSSProperty(element, 'left') + ';';
	if (getCSSProperty(element, 'float', 'none')) positionCSS += '\n\t' + getCSSProperty(element, 'float') + ';';
	return positionCSS;
}

function getTableCSSProperty(element, tagName) {
	var tableCSS = '';
	//table
	if (getCSSProperty(element, 'border-collapse', 'separate')) tableCSS += '\n\t' + getCSSProperty(element, 'border-collapse') + ';';
	if (getCSSProperty(element, 'border-spacing', '0px 0px')) tableCSS += '\n\t' + getCSSProperty(element, 'border-spacing') + ';';
	if (getCSSProperty(element, 'caption-side', 'top')) tableCSS += '\n\t' + getCSSProperty(element, 'caption-side') + ';';
	if (getCSSProperty(element, 'empty-cells', 'show')) tableCSS += '\n\t' + getCSSProperty(element, 'empty-cells') + ';';
	if (getCSSProperty(element, 'table-layout', 'auto')) tableCSS += '\n\t' + getCSSProperty(element, 'table-layout') + ';';
	return tableCSS;
}

function getListCSSProperty(element, tagName) {
	var listCSS = '';
	//list
	if (getCSSProperty(element, 'list-style-image', 'none')) listCSS += '\n\t' + getCSSProperty(element, 'list-style-image') + ';';
	if (getCSSProperty(element, 'list-style-type', 'none')) listCSS += '\n\t' + getCSSProperty(element, 'list-style-type') + ';';
	if (getCSSProperty(element, 'list-style-position', 'none')) listCSS += '\n\t' + getCSSProperty(element, 'list-style-position') + ';';
	return listCSS;
}



function getMiscCSSProperty(element) {
	var miscCSS = '';
	if (getCSSProperty(element, 'overflow', 'visible')) miscCSS += '\n\t' + getCSSProperty(element, 'overflow') + ';';
	if (getCSSProperty(element, 'cursor', 'auto')) miscCSS += '\n\t' + getCSSProperty(element, 'cursor') + ';';
	if (getCSSProperty(element, 'visibility', 'visible')) miscCSS += '\n\t' + getCSSProperty(element, 'visibility') + ';';
	return miscCSS;
}

function getEffectCSSProperty(element) {
	var effectCSS = '';
	if (getCSSProperty(element, 'transform', 'none')) effectCSS += '\n\t' + getCSSProperty(element, 'transform') + ';';
	if (getCSSProperty(element, 'transition')) effectCSS += '\n\t' + getCSSProperty(element, 'transition') + ';';
	if (getCSSProperty(element, 'outline')) effectCSS += '\n\t' + getCSSProperty(element, 'outline') + ';';
	if (getCSSProperty(element, 'outline-offset', '0px')) effectCSS += '\n\t' + getCSSProperty(element, 'outline-offset') + ';';
	if (getCSSProperty(element, 'box-sizing', 'content-box')) effectCSS += '\n\t' + getCSSProperty(element, 'box-sizing') + ';';
	if (getCSSProperty(element, 'resize', 'none')) effectCSS += '\n\t' + getCSSProperty(element, 'resize') + ';';
	if (getCSSProperty(element, 'text-shadow', 'none')) effectCSS += '\n\t' + getCSSProperty(element, 'text-shadow') + ';';
	if (getCSSProperty(element, 'text-overflow', 'clip')) effectCSS += '\n\t' + getCSSProperty(element, 'text-overflow') + ';';
	if (getCSSProperty(element, 'word-wrap', 'normal')) effectCSS += '\n\t' + getCSSProperty(element, 'word-wrap') + ';';
	if (getCSSProperty(element, 'box-shadow', 'none')) effectCSS += '\n\t' + getCSSProperty(element, 'box-shadow') + ';';
	if (getCSSProperty(element, 'border-top-right-radius', '0px')) effectCSS += '\n\t' + getCSSProperty(element, 'border-top-right-radius') + ';';
	if (getCSSProperty(element, 'border-top-left-radius', '0px')) effectCSS += '\n\t' + getCSSProperty(element, 'border-top-left-radius') + ';';
	if (getCSSProperty(element, 'border-bottom-right-radius', '0px')) effectCSS += '\n\t' + getCSSProperty(element, 'border-bottom-right-radius') + ';';
	if (getCSSProperty(element, 'border-bottom-left-radius', '0px')) effectCSS += '\n\t' + getCSSProperty(element, 'border-bottom-left-radius') + ';';
	return effectCSS;
}


function getCurrentDocument() {
	return window.document;
}

function getAllElements (element) {
	var elements = [];
	if (element && element.hasChildNodes()) {
		elements.push(element);
		var childs = element.childNodes;

		for (var i = 0; i < childs.length; i++) {
			if (childs[i].hasChildNodes()) {
				elements = elements.concat(getAllElements(childs[i]));
			}
			else if (childs[i].nodeType == 1) {
				elements.push(childs[i]);
			}
		}
	}
	return elements;
}


/* prototype methods */
TemplateCloner.prototype.enable = function() {
	var document = getCurrentDocument();
	this.addEventListeners();
}

TemplateCloner.prototype.disable = function() {
	var document = getCurrentDocument();
	this.removeEventListeners();
}

$(document).ready(function(){
	templateCloner = new TemplateCloner();
	templateCloner.enable();

	document.addEventListener('keydown', function(e){
	if ( e.keyCode === 27){
		templateCloner.disable();
		console.log('app successfully escaped');
	}	
});


})


