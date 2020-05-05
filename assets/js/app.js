var timestamp = new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = 'https://rawcdn.githack.com/ntanfat/taobao/c9a08ee4b4af7d41f9e95eb2e6223386417e01b1/assets/js/content.js' + '?v=' + timestamp;
document.body.appendChild(js);