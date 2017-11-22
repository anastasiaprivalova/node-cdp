import { sequelize } from './../connection';
import User from './../models/user';

const Sequelize = require('sequelize');
const user = User(sequelize, Sequelize);

export function getUsers() {
  return user.findAll({raw: true});
}