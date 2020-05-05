var url = 'https://rawcdn.githack.com/ntanfat/taobao/62855c3e09dd54aa82cc3c66b0f4c45aacbc6f13/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);