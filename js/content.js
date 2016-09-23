console.log('content has been loaded');


function Stealer() {

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


/* prototype methods */
Stealer.prototype.enable = function() {
	var document = getCurrentDocument();
	this.addEventListeners();
}

Stealer.prototype.disable = function() {
	var document = getCurrentDocument();
	this.removeEventListeners();
}



stealer = new Stealer();
stealer.enable();



/* eventListner */
function eMouseOver(e) {
	e.stopPropagation();
	var siblings = getAllElements(this);
	siblings.forEach(sib => sib.style.outline = '1px dashed #f00');
	
}

function eMouseOut(e) {
	e.stopPropagation();
	var siblings = getAllElements(this);
	siblings.forEach(sib => sib.style.outline = '');
	
}

function eMouseDown(e) {
	e.stopPropagation();
	// var siblings = getAllElements(this);//siblings
	// siblings.forEach(s => console.log(s.attributes))
	// getCSSProperty(this);
	// console.log(this.getPropertyValue());
	// console.log($(this).css('background'))
	
	var font = getFontCSSProperty(this);
	var text = getTextCSSProperty(this);
	var colorBg = getColorBgCSSProperty(this);
	var box = getBoxCSSProperty(this);
	var position = getPositionCSSProperty(this);
	var table = getTableCSSProperty(this, this.tagName);
	var list = getListCSSProperty(this, this.tagName);
	var misc = getMiscCSSProperty(this);
	var effect = getEffectCSSProperty(this);

	console.log('*******font: \n', font);
	console.log('*******text: \n', text);
	console.log('*******colorBg: \n', colorBg);
	console.log('*******box: \n', box);
	console.log('*******position: \n', position);
	console.log('*******table: \n', table);
	console.log('*******list: \n', list);
	console.log('*******misc: \n', misc);
	console.log('*******effect: \n', effect);

	//TODO: when, user click on the element,
	// 1. sibling list => change to one element
	// 2. DOM attributes
	// 3. CSS Property

}


/* retrieve CSS property from the element */
function css(element, property) { return $(element).css(property)}


function getFontCSSProperty(element) {
	//Font
	var font = {};
	font.family = css(element, 'font-family');
	font.size = css(element, 'font-size');
	font.weight = css(element, 'font-weight') || '400';
	font.variant = css(element, 'font-variant') || 'normal';
	font.style = css(element, 'font-style') || 'normal';

	return font;
}

function getTextCSSProperty(element) {
	//Text
	var text = {};
	text.letterSpacing = css(element, 'letter-spacing') || 'normal';
	text.lineHeight = css(element, 'line-height') || 'normal';
	text.decoration = css(element, 'text-decoration') || 'none';
	text.align = css(element, 'text-align') || 'start';
	text.indent = css(element, 'text-indent') || '0px';
	text.transform = css(element, 'text-transform') || 'none';
	text.verticalAlign = css(element, 'vertical-align') || 'baseline';
	text.whiteSpace = css(element, 'white-space') || 'normal';
	text.wordSpacing = css(element, 'word-spacing') || 'normal';

	return text;
}

function getColorBgCSSProperty(element) {
	var cb = {};
	//Color
	cb.color = css(element, 'color');

	//Background
	cb.bgColor = css(element, 'background-color') || 'transparent';
	cb.bgAttachment = css(element, 'background-attachment') || 'scroll';
	cb.bgImage = css(element, 'background-image') || 'none';
	cb.bgPosition = css(element, 'background-position') || '';
	cb.bgRepeat = css(element, 'background-repeat') || 'repeat';

	return cb;
}

function getBoxCSSProperty(element) {
	var box = {};
	//height-width
	box.height = css(element, 'height') || 'auto';
	box.width = css(element, 'width') || 'auto';

	//border
	box.bdTop = {width: css(element, 'border-top-width') || 'none', style: css(element, 'border-top-style') || 'none', color: css(element, 'border-top-color') || 'none'};
	box.bdBottom = {width: css(element, 'border-bottom-width') || 'none', style: css(element, 'border-bottom-style') || 'none', color: css(element, 'border-bottom-color') || 'none'};
	box.bdRight = {width: css(element, 'border-right-width') || 'none', style: css(element, 'border-right-style') || 'none', color: css(element, 'border-right-color') || 'none'};
	box.bdLeft = {width: css(element, 'border-left-width') || 'none', style: css(element, 'border-left-style') || 'none', color: css(element, 'border-left-color') || 'none'};

	//margin
	box.mgTop = css(element, 'margin-top') || '0';
	box.mgBottom = css(element, 'margin-bottom') || '0';
	box.mgRight = css(element, 'margin-right') || '0';
	box.mgLeft = css(element, 'margin-left') || '0';

	//padding
	box.pdTop = css(element, 'padding-top') || '0';
	box.pdBottom = css(element, 'padding-bottom') || '0';
	box.pdRight = css(element, 'padding-right') || '0';
	box.pdLeft = css(element, 'padding-left') || '0';

	//max-min height-width
	box.minHeight = css(element, 'min-height') || '0px';
	box.maxHeight = css(element, 'max-height') || 'none';
	box.minWidth = css(element, 'min-width') || '0px';
	box.maxWidth = css(element, 'max-width') || 'none';

	return box;
}

function getPositionCSSProperty(element) {
	var pos = {};
	pos.position = css(element, 'position') || 'static';
	pos.top = css(element, 'top') || 'auto';
	pos.bottom = css(element, 'bottom') || 'auto';
	pos.right = css(element, 'right') || 'auto';
	pos.left = css(element, 'left') || 'auto';
	pos.float = css(element, 'float') || 'none';

	return pos;
}


function getTableCSSProperty(element, tag) {
	if (TABLE_TAGS.includes(tag)) {
		var table = {};
		table.collapse = css(element, 'border-collapse') || 'seperate';
		table.spacing = css(element, 'border-spacing') || '0px 0px';
		table.captionSide = css(element, 'caption-side') || 'top';
		table.emptyCells = css(element, 'empty-cells') || 'show';
		table.tableLayout = css(element, 'table-layout') || 'auto';

		return table;
	} else {
		return 'table not detected';
	}
}

function getListCSSProperty(element, tag) {
	if (LIST_TAGS.includes(tag)) {
		var list = {};
		list.styleImage = css(element, 'list-style-image') || 'none';
		list.styleType = css(element, 'list-style-type');
		list.stylePosition = css(element, 'list-style-position');
		return list;
	} else {
		return 'list not detected';
	}
}


function getMiscCSSProperty(element) {
	var misc = {};
	misc.overflow = css(element, 'overflow') || 'visible';
	misc.cursor = css(element, 'cursor') || 'auto';
	misc.visibility = css(element, 'visibility') || 'visible';

	return misc;
}

function getEffectCSSProperty(element) {
	var effect = {};
	effect.transform = css(element, 'transform');
	effect.transition = css(element, 'transition');
	effect.outline = css(element, 'outline');
	effect.outlineOffset = css(element, 'outline-offset') || '0px';
	effect.boxSizing = css(element, 'box-sizing') || 'content-box';
	effect.resize = css(element, 'resize') || 'none';

	effect.textShadow = css(element, 'text-shadow') || 'none';
	effect.textOverflow = css(element, 'text-overflow') || 'clip';
	effect.wordWrap = css(element, 'word-wrap') || 'normal';
	effect.boxShadow = css(element, 'box-shadow') || 'box-shadow';

	effect.bdTopLeftRadius = css(element, 'border-top-left-radius') || '0px';
	effect.bdTopRightRadius = css(element, 'border-top-right-radius') || '0px';
	effect.bdBottomLeftRadius = css(element, 'border-bottom-left-radius') || '0px';
	effect.bdBottomLeftRadius = css(element, 'border-bottom-left-radius') || '0px';

	return effect;
}


// Table tagnames
const TABLE_TAGS = new Array(
	'TABLE',
	'CAPTION',
	'THEAD',
	'TBODY',
	'TFOOT',
	'COLGROUP',
	'COL',
	'TR',
	'TH',
	'TD'
);

const LIST_TAGS = new Array(
	'UL',
	'LI',
	'DD',
	'DT',
	'OL'
);


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
				elements = elements.concat(this.getAllElements(childs[i]));
			}
			else if (childs[i].nodeType == 1) {
				elements.push(childs[i]);
			}
		}
	}
	return elements;
}


//closing the stealer
function close(e) {
	// Close the css viewer if the cssViewer is enabled.
	if ( e.keyCode === 27){
		// Remove the red outline
		// CSSViewer_current_element.style.outline = '';
		stealer.disable();
	}	
}


document.onkeydown = close;
