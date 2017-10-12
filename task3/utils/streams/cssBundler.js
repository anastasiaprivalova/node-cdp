const path = require('path');
const fs = require('fs');
const request = require('request');

function cssBundler(dirPath) {
  const absolutePath = path.resolve(__dirname, dirPath);
  const bundleFileName = 'bundle.css';
  const remoteCssPath = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

  if(fs.existsSync(absolutePath)) {
    let filePromise = new Promise((resolve, reject) => {
      fs.readdir(absolutePath, (error, files) => {
        if(error) {
          reject(error);
        } else {
          resolve(files);
        }
      });
    });

    filePromise.then((files) => {
      let arrayOfPromises = files.filter(file => file !== bundleFileName).map(file => {
        return new Promise((resolve, reject) => {
          let result = '';
          let reader = fs.createReadStream(path.resolve(absolutePath, file));

          reader.on('data', (chunk) => {
            result += chunk.toString();
          }).on('end', () => {
            resolve(result);
          }).on('error', (error) => {
            reject(error);
          });
        });
      });

      return Promise.all(arrayOfPromises);
    }).then(data => {
      let writer = fs.createWriteStream(`${absolutePath}/${bundleFileName}`);
      writer.write(data.join('\n'));
      writer.write('\n');
      request(remoteCssPath).pipe(writer);
    }).catch(error => {
      console.error(error);
    });
  } else {
    console.error(`Not found ${absolutePath}`);
  }
}

module.exports = cssBundler;