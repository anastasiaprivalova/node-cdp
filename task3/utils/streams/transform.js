const through = require('through2');

function transform() {
  const transformStream = through(write, end);
  process.stdin.pipe(transformStream).pipe(process.stdout);

  function write(buffer, encoding, next) {
    this.push(buffer.toString().toUpperCase());
    next();
  }

  function end(done) {
    done();
  }
}

module.exports = transform;