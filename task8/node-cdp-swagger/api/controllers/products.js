import { productApi } from './../helpers';

const getAllProducts = (req, res) => {
  productApi.getAll()
  .then(products => {
    res.json(products);
  })
  .catch(function(err) {
    console.log(err);
  });
};

const createProduct = (req, res) => {
  productApi.add(req.body)
  .then((data) => {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
  });
};

const getProductById = (req, res) => {
  productApi.getOneById(req.params.id)
  .then(product => {
    res.json(product);
  })
  .catch(function(err) {
    console.log(err);
  });
};

const updateProduct = (req, res) => {
  productApi.updateOne(req.params.id, req.body)
  .then(data => {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
  });
};

const deleteProduct = (req, res) => {
  productApi.deleteOne(req.params.id)
  .then(data => {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
  });
};

const getProductReviews = (req, res) => {
  productApi.getProductReviews(req.params.id)
  .then(reviews => {
    res.json(reviews);
  })
  .catch(function(err) {
    console.log(err);
  });
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductReviews
};