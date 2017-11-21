import express from 'express';
import { productApi } from './../db';

let router = express.Router();

router.get('/', (req, res) => {
  productApi.getAll()
  .then(products => {
    res.json(products);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  productApi.add(req.body)
  .then((data) => {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  productApi.getOneById(req.params.id)
  .then(product => {
    res.json(product);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.put('/:id', (req, res) => {
  productApi.updateOne(req.params.id, req.body)
  .then(data => {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.delete('/:id', (req, res) => {
  productApi.deleteOne(req.params.id)
  .then(data => {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id/reviews', (req, res) => {
  productApi.getProductReviews(req.params.id)
  .then(reviews => {
    res.json(reviews);
  })
  .catch(function(err) {
    console.log(err);
  });
});

export default router;