import fs from 'fs';

export default function readHelper(filePath) {
  let data = '';
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on('data', (chunk) => {
        data += Buffer.from(chunk).toString();
      })
      .on('end', () => {
        resolve(JSON.parse(data));
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}