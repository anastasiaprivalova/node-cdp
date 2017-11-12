import express from 'express';
let router = express.Router();
import readHelper from './../helpers/readHelper';
const filePath = './task4_5/models/users.json';

router.get('/', (req, res) => {
  readHelper(filePath, (data) => {
    res.json(data);
  });
});

export default router;