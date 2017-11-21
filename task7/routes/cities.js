import express from 'express';
import { getCities, addCity, updateCity, deleteCity } from './../db';

let router = express.Router();

router.get('/', (req, res) => {
  getCities()
    .then(cities => {
      res.json(cities);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  addCity(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  updateCity(req.params.id, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  deleteCity(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

export default router;