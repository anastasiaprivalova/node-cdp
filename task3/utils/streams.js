const minimist = require('minimist');

function inputOutput(filePath) {
  console.log('Input Output: ', filePath);
}

function transformFile(filePath, useOutput) {
  console.log('Transform File: ', filePath, useOutput);
}

function transform() {
  console.log('Transform');
}

function httpClient() {
  console.log('Http client');
}

function httpServer() {
  console.log('Http server');
}

function printHelpMessage(errorMessage) {
  const helpMessage =
`You may use the following options:
  -a, --action: performs an action. List of actions:
    -a=io, --file option is required: reads file and puts the result to process.stdout
    -a=transform: converts data from process.stdin to uppercase and puts the result to process.stdout
    -a=transform-file, --file option is required: converts data from csv file to json. If --output flag is set - puts the result to process.stdout, otherwise write data to new json
    -a=bundle-css, --path option is required: creates css bundle from the given directory
  -f, --file: sets path to file
  -h, --help: prints possible options
  -p, --path: sets directory`;

  if(errorMessage) {
    console.error(errorMessage);
  }
  console.log(helpMessage);
}

function cssBundler(dirPath) {
  console.log('Bundle CSS', dirPath);
}

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