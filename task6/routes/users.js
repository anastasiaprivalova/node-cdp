import express from 'express';
import { getUsers } from './../db';

let router = express.Router();

router.get('/', (req, res) => {
  getUsers()
  .then(users => {
    res.json({data: users});
  })
  .catch(function(err) {
    console.log(err);
  });
});

export default router;