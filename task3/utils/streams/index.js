const minimist = require('minimist');
const inputOutput = require('./inputOutput');
const transformFile = require('./transformFile');
const transform = require('./transform');
const printHelpMessage = require('./printHelpMessage');
const cssBundler = require('./cssBundler');

function checkArguments(config) {
  if(config.action) {
    switch(config.action) {
      case 'io':
      case 'transform-file':
        return !!config.filePath;
      case 'transform':
        return true;
      case 'bundle-css':
        return !!config.dirPath;
      default:
        return false;
    }
  } else {
    return false;
  }
}

function main() {
  const argv = minimist(process.argv.slice(2));

  if(argv.h ||argv.help) {
    printHelpMessage();
  } else {
    const config = {
      action: argv.a || argv.action,
      filePath: argv.f || argv.file,
      dirPath: argv.p || argv.path,
      useOutput: argv.o || argv.output
    };

    if(checkArguments(config)) {
      switch(config.action) {
        case 'io':
          inputOutput(config.filePath);
          break;
        case 'transform-file':
          transformFile(config.filePath, config.useOutput);
          break;
        case 'transform':
          transform();
          break;
        case 'bundle-css':
          cssBundler(config.dirPath);
          break;
      }
    } else {
      printHelpMessage('Wrong input');
    }
  }
}

module.exports = {
  main
};

if(module.parent === null) {
  main();
}