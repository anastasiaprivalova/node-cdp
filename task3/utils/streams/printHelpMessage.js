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

module.exports = printHelpMessage;