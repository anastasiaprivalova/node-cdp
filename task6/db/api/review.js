import { sequelize } from './../connection';
import Review from './../models/review';

const Sequelize = require('sequelize');
const review = Review(sequelize, Sequelize);

export function getProductReviews(productId) {
  return review.findAll({
    where: { productId: productId },
    raw: true
  });
}