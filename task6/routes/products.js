import express from 'express';
import { getProducts, addProduct, getProductById } from './../db/api/product';
import { getProductReviews } from './../db/api/review';

let router = express.Router();

router.get('/', (req, res) => {
  getProducts()
  .then(products => {
    res.json({data: products});
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  addProduct(req.body)
  .then(instance => {
    res.send(req.body);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  getProductById(req.params.id)
  .then(productObject => {
    res.json(productObject);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id/reviews', (req, res) => {
  getProductReviews(req.params.id)
  .then(reviews => {
    res.json({data: reviews});
  })
  .catch(function(err) {
    console.log(err);
  });
});

export default router;