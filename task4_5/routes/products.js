import express from 'express';
import fs from 'fs';
let router = express.Router();
import readHelper from './../helpers/readHelper';
const filePath = './task4_5/models/products.json';

router.get('/', (req, res) => {
  readHelper(filePath)
    .then((data) => {res.json(data);})
    .catch((error) => {res.json({"error": error.message})});
});

router.post('/', (req, res) => {
  readHelper(filePath)
    .then((data) => {
      let products = data.data.concat([req.body]);
      const writer = fs.createWriteStream(filePath);
      writer.write(JSON.stringify({data: products}));
      writer.end();
      res.json(products);
    })
    .catch((error) => {res.json({"error": error.message})});
});

router.get('/:id', (req, res) => {
  readHelper(filePath)
    .then((data) => {
      res.json(data.data.find(product => product.id === req.params.id) || {});
    })
    .catch((error) => {res.json({"error": error.message})});
});

router.get('/:id/reviews', (req, res) => {
  readHelper(filePath)
    .then((data) => {
      const product = data.data.find(product => product.id === req.params.id);

      if(product && product.reviews) {
        res.json({reviews: product.reviews});
      } else {
        res.json({});
      }
    })
    .catch((error) => {res.json({"error": error.message})});
});

export default router;