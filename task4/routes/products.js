import express from 'express';
import fs from 'fs';
let router = express.Router();
import readHelper from './../helpers/readHelper';
const filePath = './task4/models/products.json';

router.get('/', (req, res) => {
  readHelper(filePath, (data) => {
    res.json(data);
  });
});

router.post('/', (req, res) => {
  readHelper(filePath, (data) => {
    let products = data.data.concat([req.body]);
    const writer = fs.createWriteStream(filePath);
    writer.write(JSON.stringify({data: products}));
    writer.end();
    res.json(products);
  });
});

router.get('/:id', (req, res) => {
  readHelper(filePath, (data) => {
    res.json(data.data.find(product => product.id === req.params.id) || {});
  });
});

router.get('/:id/reviews', (req, res) => {
  readHelper(filePath, (data) => {
    const product = data.data.find(product => product.id === req.params.id);

    if(product && product.reviews) {
      res.json({reviews: product.reviews});
    } else {
      res.json({});
    }
  });
});

export default router;