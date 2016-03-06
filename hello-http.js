var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<HTML><BODY BGCOLOR=BLUE>');
    res.write('<FONT COLOR="WHITE">Hello, Red Hat Developers World! Host: ' + process.env.HOSTNAME  + '\n</FONT>');
    res.end('</BODY></HTML>');
}).listen(8000, '0.0.0.0');
console.log('Server running at http://127.0.0.1:8000/');
