var url = 'https://rawcdn.githack.com/ntanfat/taobao/2a1fb363b2173b681b58a84e5428b0c8bdad6826/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);