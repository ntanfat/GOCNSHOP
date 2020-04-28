var _nhDomain = "https://raw.githubusercontent.com/ntanfat/taobao/master/";
var _nhCurrentTime = (new Date().getTime());

var _nhCssElement = document.createElement('link');
_nhCssElement.type = "text/css";
_nhCssElement.rel = "stylesheet";
//_nhCssElement.href = _nhDomain + 'toolbar.css?v=' + _nhCurrentTime;
_nhCssElement.href = 'https://rawcdn.githack.com/ntanfat/taobao/e0654a5f6da4dab1c65c95916c40cd03963d08cc/toolbar.css';

var _nhJsElement = document.createElement("script");
_nhJsElement.type = "text/javascript";
//_nhJsElement.src = _nhDomain + 'toolbar.js?v=' + _nhCurrentTime;
_nhJsElement.src = 'https://rawcdn.githack.com/ntanfat/taobao/e0654a5f6da4dab1c65c95916c40cd03963d08cc/toolbar.js';

document.body.appendChild(_nhCssElement);
document.body.appendChild(_nhJsElement);