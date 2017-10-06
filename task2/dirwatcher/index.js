const fs = require('fs');
const pathLib = require('path');
const chokidar = require('chokidar');
const EventEmitter = require('events');

class DirWatcher {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  checkParams(path, delay) {
    return (typeof path === 'string' && typeof delay === 'number' && delay === delay && delay > 0);
  }

  watch(path, delay) {
    if(this.checkParams(path, delay)) {

      let timer = setTimeout(() => {
        fs.watch(path, (eventType, filename) => {
          let filePath = pathLib.resolve(path, filename);
          this.eventEmitter.emit('dirwatcher:changed', eventType, filePath);
        });

        clearTimeout(timer);
      }, delay);

    } else {
      throw new TypeError('Please, check passed arguments: path should be a string & delay should be a positive number');
    }
  }

  watchWithChokidar(path, delay) {
    if(typeof path === 'string' && typeof delay === 'number' && delay === delay && delay > 0) {

      let timer = setTimeout(() => {
        chokidar.watch(path, {
          ignoreInitial: true
        }).on('all', (event, path) => {
          this.eventEmitter.emit('dirwatcher:changed', event, path);
        });

        clearTimeout(timer);
      }, delay);

    } else {
      throw new TypeError('Please, check passed arguments: path should be a string & delay should be a positive number');
    }
  }
}

module.exports = new DirWatcher();