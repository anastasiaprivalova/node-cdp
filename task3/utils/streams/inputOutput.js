const fs = require('fs');
const path = require('path');

function inputOutput(filePath) {
  const absolutePath = path.resolve(__dirname, filePath);

  if(fs.existsSync(absolutePath)) {
    const reader = fs.createReadStream(absolutePath);
    reader.pipe(process.stdout);
  } else {
    console.error(`Not found ${absolutePath}`);
  }
}

module.exports = inputOutput;