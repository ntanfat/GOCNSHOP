var url = 'https://rawcdn.githack.com/ntanfat/taobao/50ef30397d359e8a9982c304042f832e3be3446a/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);