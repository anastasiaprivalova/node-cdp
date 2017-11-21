import express from 'express';
import { userApi } from './../db';

let router = express.Router();

router.get('/', (req, res) => {
  userApi.getAll()
  .then(users => {
    res.json(users);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  userApi.getOneById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  userApi.add(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  userApi.updateOne(req.params.id, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  userApi.deleteOne(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

export default router;