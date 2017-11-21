import express from 'express';
import { getProducts, addProduct, getProductById, getProductReviews, updateProduct, deleteProduct } from './../db';

let router = express.Router();

router.get('/', (req, res) => {
  getProducts()
  .then(products => {
    res.json(products);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  addProduct(req.body)
  .then((data) => {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  getProductById(req.params.id)
  .then(product => {
    res.json(product);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.put('/:id', (req, res) => {
  updateProduct(req.params.id, req.body)
  .then(data => {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.delete('/:id', (req, res) => {
  deleteProduct(req.params.id)
  .then(data => {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id/reviews', (req, res) => {
  getProductReviews(req.params.id)
  .then(reviews => {
    res.json(reviews);
  })
  .catch(function(err) {
    console.log(err);
  });
});

export default router;