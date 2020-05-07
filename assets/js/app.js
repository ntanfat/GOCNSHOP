var url = 'https://rawcdn.githack.com/ntanfat/taobao/cda848779251b79f02c3e9412f762466df2ed95f/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);