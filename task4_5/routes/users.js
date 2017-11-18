import express from 'express';
let router = express.Router();
import readHelper from './../helpers/readHelper';
const filePath = './task4_5/models/users.json';

router.get('/', (req, res) => {
  readHelper(filePath)
    .then((data) => {res.json(data);})
    .catch((error) => {res.json({"error": error.message})});
});

export default router;