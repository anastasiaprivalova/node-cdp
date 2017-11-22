import express from 'express';
import { cityApi } from './../api';

let router = express.Router();

router.get('/', (req, res) => {
  cityApi.getAll()
    .then(cities => {
      res.json(cities);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  cityApi.add(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  cityApi.updateOne(req.params.id, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  cityApi.deleteOne(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

export default router;