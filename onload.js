var _nhDomain = "https://raw.githubusercontent.com/ntanfat/taobao/master/";
var _nhCurrentTime = (new Date().getTime());

var _nhCssElement = document.createElement('link');
_nhCssElement.type = "text/css";
_nhCssElement.rel = "stylesheet";
_nhCssElement.href = _nhDomain + 'toolbar.css?token=ACZYWCLYZLKGEKIRHJKZNOC6VCASO&v=' + _nhCurrentTime;

var _nhJsElement = document.createElement("script");
_nhJsElement.type = "text/javascript";
_nhJsElement.src = _nhDomain + 'toolbar.js?token=ACZYWCPKKL3SFRK32MOCEX26VCATC&v=' + _nhCurrentTime;

document.body.appendChild(_nhCssElement);
document.body.appendChild(_nhJsElement);