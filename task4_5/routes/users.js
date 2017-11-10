import express from 'express';
import fs from 'fs';
let router = express.Router();

router.get('/', (req, res) => {
  fs.createReadStream('./task4_5/models/users.json')
    .on('data', (chunk) => {
      res.write(Buffer.from(chunk).toString());
    })
    .on('end', () => {
      res.end();
    });
});

export default router;