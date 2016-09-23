var css = '.popup-wrapper {background-color: #fff; border: 4px solid #f9f9f9; border-radius: 0; box-shadow: -1px 0px 28px 8px rgba(0,0,0,0.21); overflow: hidden; } .popup-title {padding: 10px 15px; background-color: #f9f9f9; border-bottom: 1px solid #f0f0f0; } .popup-title h3 {margin: 0; line-height: 1.5em; color: #333; } .popup-body {padding: 0; color: #555; } .popup-close {float: right; margin-top: 2px; padding: 0; font-size: 24px; line-height: 1; border: 0; background: transparent; color: #aaa; cursor: pointer; } .popup-close:hover {color: #333; } .intro {margin-top: 100px; text-align: center; } .intro h1 {color: #aaa; } .intro p {color: #444; } h3 {font-family: Verdana, Geneva, sans-serif;}';
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) { style.styleSheet.cssText = css; }
else { style.appendChild(document.createTextNode(css)); }
head.appendChild(style);