const http = require('http');
const fs = require('fs');

http.createServer()
  .on('request', (req, res) => {
    const message = 'Hello from HTML';
    const filePath = './task4/http-servers/index.html';
    const strToReplace = '{message}';

    /*
    With SYNC reading

    let responseHTML = '';
    const responseHTML = Buffer.from(fs.readFileSync(filePath)).toString().replace(strToReplace, message);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
    res.end(responseHTML);

    */

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });

    const reader = fs.createReadStream(filePath)
      .on('data', (chunk) => {
        res.write(Buffer.from(chunk).toString().replace(strToReplace, message));
      })
      .on('end', () => {
        res.end();
      });
  })
  .listen(5001);