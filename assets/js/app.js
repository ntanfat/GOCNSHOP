var domain = 'https://www.gocnshop.com/';
var path = 'extension/prod/';
var version = '?v=' + new Date().getTime();

//Append CSS
var css = document.createElement('link');
css.type = 'text/css';
css.rel = 'stylesheet';
css.href = domain + path + 'content.css' + version;
document.body.appendChild(css);

//Append JS
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = domain + path + 'content.js' + version;
document.body.appendChild(js);