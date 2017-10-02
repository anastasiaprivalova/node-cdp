const chokidar = require('chokidar');
const EventEmitter = require('events');

class DirWatcher {
  watch(path, delay) {

    if(typeof path === 'string' && typeof delay === 'number' && delay === delay && delay > 0) {
      let eventEmitter = new EventEmitter();

      chokidar.watch(path, {
        ignoreInitial: true,
        usePolling: true,
        interval: delay
      }).on('all', (event, path) => {
        eventEmitter.emit('dirwatcher:changed', event, path);
      });

      return eventEmitter;
    } else {
      throw new TypeError('Please, check passed arguments: path should be a string & delay should be a positive number');
    }

  }
}

module.exports = DirWatcher;