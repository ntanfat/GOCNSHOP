var url = 'https://rawcdn.githack.com/ntanfat/taobao/fd7facd26143c270594be4385632da5d87c36ed8/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);