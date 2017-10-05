const fs = require('fs');
const pathLib = require('path');
const chokidar = require('chokidar');
const EventEmitter = require('events');

class DirWatcher {
  watch(path, delay) {

    if(typeof path === 'string' && typeof delay === 'number' && delay === delay && delay > 0) {
      let eventEmitter = new EventEmitter();
      let timer = setTimeout(() => {
        fs.watch(path, (eventType, filename) => {
          let filePath = pathLib.resolve(path, filename);
          eventEmitter.emit('dirwatcher:changed', eventType, filePath);
        });
        clearTimeout(timer);
      }, delay);

      return eventEmitter;
    } else {
      throw new TypeError('Please, check passed arguments: path should be a string & delay should be a positive number');
    }

  }

  watchWithChokidar(path, delay) {

    if(typeof path === 'string' && typeof delay === 'number' && delay === delay && delay > 0) {
      let eventEmitter = new EventEmitter();

      let timer = setTimeout(() => {
        chokidar.watch(path, {
          ignoreInitial: true
        }).on('all', (event, path) => {
          eventEmitter.emit('dirwatcher:changed', event, path);
        });
        clearTimeout(timer);
      }, delay);

      return eventEmitter;
    } else {
      throw new TypeError('Please, check passed arguments: path should be a string & delay should be a positive number');
    }
  }

}

module.exports = DirWatcher;