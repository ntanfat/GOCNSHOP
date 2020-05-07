var domain = 'https://demo3.netsoftsolution.net/gocnshop/';
var path = 'chrome-extension/';
var version = '?v=' + new Date().getTime();

var css = document.createElement('link');
css.type = 'text/css';
css.rel = 'stylesheet';
css.href = domain + path + 'content.css' + version;
document.body.appendChild(css);

var js = document.createElement('script');
js.type = 'text/javascript';
js.src = domain + path + 'content.js' + version;
document.body.appendChild(js);