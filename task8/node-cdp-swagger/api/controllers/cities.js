import { cityApi } from './../helpers';

const getAllCities = (req, res) => {
  cityApi.getAll()
    .then(cities => {
      res.json(cities);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const createCity = (req, res) => {
  cityApi.add(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const updateCity = (req, res) => {
  cityApi.updateOne(req.params.id, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const deleteCity = (req, res) => {
  cityApi.deleteOne(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

export {
  getAllCities,
  createCity,
  updateCity,
  deleteCity
};