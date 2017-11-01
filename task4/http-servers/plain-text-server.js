const http = require('http');

http.createServer()
    .on('request', (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end('Hello World');
    })
    .listen(5000);