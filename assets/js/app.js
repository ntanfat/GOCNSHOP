var url = 'https://rawcdn.githack.com/ntanfat/taobao/12adf484a7147da2569eeb67a8575a0f9e9bae58/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);