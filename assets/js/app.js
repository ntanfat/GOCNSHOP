var timestamp = new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = 'https://raw.githack.com/ntanfat/taobao/master/assets/js/content.js' + '?v=' + timestamp;
document.body.appendChild(js);