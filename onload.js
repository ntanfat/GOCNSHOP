var _nhDomain = "https://raw.githubusercontent.com/ntanfat/taobao/master/";
var _nhCurrentTime = (new Date().getTime());

var _nhCssElement = document.createElement('link');
_nhCssElement.type = "text/css";
_nhCssElement.rel = "stylesheet";
//_nhCssElement.href = _nhDomain + 'toolbar.css?v=' + _nhCurrentTime;
_nhCssElement.href = 'https://rawcdn.githack.com/ntanfat/taobao/7d1588136ffaf33c9c6092287a15420f807a5f87/toolbar.css';

var _nhJsElement = document.createElement("script");
_nhJsElement.type = "text/javascript";
//_nhJsElement.src = _nhDomain + 'toolbar.js?v=' + _nhCurrentTime;
_nhJsElement.src = 'https://rawcdn.githack.com/ntanfat/taobao/7d1588136ffaf33c9c6092287a15420f807a5f87/toolbar.js';

document.body.appendChild(_nhCssElement);
document.body.appendChild(_nhJsElement);