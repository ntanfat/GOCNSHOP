var _nhDomain = "//nhaphangtrungquoc.vn/";
var _nhCurrentTime = (new Date().getTime());

var _nhCssElement =document.createElement('link');
_nhCssElement.type = "text/css";
_nhCssElement.rel = "stylesheet";
_nhCssElement.href = _nhDomain+'js/toolbar/toolbar.css?v=' + _nhCurrentTime;

var _nhJsElement = document.createElement("script");
_nhJsElement.type = "text/javascript";
_nhJsElement.src = _nhDomain+'js/toolbar/toolbar.js?v=' + _nhCurrentTime;

document.body.appendChild(_nhCssElement);
document.body.appendChild(_nhJsElement);

//test2