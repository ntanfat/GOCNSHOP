var url = 'https://rawcdn.githack.com/ntanfat/taobao/7279bead210fa656a876dcd2f8c078cfb614a43d/assets/js/content.js';
var version = '?v=' + new Date().getTime();
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = url + version;
document.body.appendChild(js);