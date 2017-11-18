const Sequelize = require('sequelize');
import Product from './../db/models/product';
import Review from './../db/models/review';
import User from './../db/models/user';

export const sequelize = new Sequelize('postgres://postgres:4230294@localhost:5432/postgres');
const product = Product(sequelize, Sequelize);
const review = Review(sequelize, Sequelize);
const user = User(sequelize, Sequelize);

export function getProducts() {
  return product.findAll({raw: true});
}

export function addProduct(productToAdd) {
  return product.create(productToAdd);
}

export function getProductById(id) {
  return product.findOne({
    where: { productId: id },
    raw: true
  });
}

export function getProductReviews(productId) {
  return review.findAll({
    where: {productId: productId},
    raw: true
  });
}

export function getUsers() {
  return user.findAll({raw: true});
}