var url = 'https://rawcdn.githack.com/ntanfat/taobao/2f209e0432e7afa6a27f528723ebd43aedac6412/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);