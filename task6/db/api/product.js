import { sequelize } from './../connection';
import Product from './../models/product';

const Sequelize = require('sequelize');
const product = Product(sequelize, Sequelize);

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