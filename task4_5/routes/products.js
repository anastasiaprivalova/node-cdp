import express from 'express';
import fs from 'fs';
let router = express.Router();
const filePath = './task4_5/models/products.json';

router.use(function(req, res, next) {
  let data = '';
  fs.createReadStream(filePath)
    .on('data', (chunk) => {
      data += Buffer.from(chunk).toString();
    })
    .on('end', () => {
      req.products = JSON.parse(data);
      next();
    });
});

router.get('/', (req, res) => {
  res.json(req.products);
});

router.post('/', (req, res) => {
  let products = req.products.data.concat([req.body]);
  const writer = fs.createWriteStream(filePath);
  writer.write(JSON.stringify({data: products}));
  writer.end();
  res.json(products);
});

router.get('/:id', (req, res) => {
  res.json(req.products.data.find(product => product.id === req.params.id));
});

router.get('/:id/reviews', (req, res) => {
  const product = req.products.data.find(product => product.id === req.params.id);

  if(product && product.reviews) {
    res.json({reviews: product.reviews})
  } else {
    res.json({});
  }
});

export default router;