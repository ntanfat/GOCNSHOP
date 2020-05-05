var url = 'https://rawcdn.githack.com/ntanfat/taobao/7445494fdf2c60a91d6adc81961e164befd876e4/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);