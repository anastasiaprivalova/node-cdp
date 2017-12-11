import { userApi } from './../helpers';

const getAllUsers = (req, res) => {
  userApi.getAll()
  .then(users => {
    res.json(users);
  })
  .catch(function(err) {
    console.log(err);
  });
};

const createUser = (req, res) => {
  userApi.add(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const getUserById = (req, res) => {
  userApi.getOneById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const updateUser = (req, res) => {
  userApi.updateOne(req.params.id, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const deleteUser = (req, res) => {
  userApi.deleteOne(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};