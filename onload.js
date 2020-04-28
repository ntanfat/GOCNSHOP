var _nhDomain = "https://raw.githubusercontent.com/ntanfat/taobao/master/";
var _nhCurrentTime = (new Date().getTime());

var _nhCssElement = document.createElement('link');
_nhCssElement.type = "text/css";
_nhCssElement.rel = "stylesheet";
//_nhCssElement.href = _nhDomain + 'toolbar.css?v=' + _nhCurrentTime;
_nhCssElement.href = 'https://rawcdn.githack.com/ntanfat/taobao/ee49d12dcab192cf9f4e58ff25f530817c071f5f/toolbar.css';

var _nhJsElement = document.createElement("script");
_nhJsElement.type = "text/javascript";
//_nhJsElement.src = _nhDomain + 'toolbar.js?v=' + _nhCurrentTime;
_nhJsElement.src = 'https://rawcdn.githack.com/ntanfat/taobao/ee49d12dcab192cf9f4e58ff25f530817c071f5f/toolbar.js';

document.body.appendChild(_nhCssElement);
document.body.appendChild(_nhJsElement);