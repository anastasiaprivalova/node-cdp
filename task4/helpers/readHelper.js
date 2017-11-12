import fs from 'fs';

export default function readHelper(filePath, onEnd) {
  let data = '';
  fs.createReadStream(filePath)
    .on('data', (chunk) => {
      data += Buffer.from(chunk).toString();
    })
    .on('end', () => {
      onEnd(JSON.parse(data));
    });
}