import express from 'express';
import { getUsers, addUser, getUserById, updateUser, deleteUser } from './../db';

let router = express.Router();

router.get('/', (req, res) => {
  getUsers()
  .then(users => {
    res.json(users);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  getUserById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  addUser(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  updateUser(req.params.id, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  deleteUser(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

export default router;