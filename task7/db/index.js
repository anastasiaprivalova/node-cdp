import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import productSchema from './productSchema';
import userSchema from './userSchema';
import citySchema from './citySchema';

const connection = mongoose.createConnection('mongodb://localhost:27017/node-cdp', {
  useMongoClient: true
});

const Product = connection.model('product', productSchema);
const User = connection.model('user', userSchema);
const City = connection.model('city', citySchema);

export function mongooseConnect() {
  return connection;
}


export function getProducts() {
  return Product.find();
}

export function getProductById(productId){
  return Product.findOne({ id: productId });
}

export function addProduct(product) {
  const newProduct = new Product(product);
  return newProduct.save();
}

export function updateProduct(productId, product) {
  return Product.update({ id: productId }, { $set: product}, { upsert: true });
}

export function deleteProduct(productId) {
  return Product.deleteOne({ id: productId });
}

export function getProductReviews(productId){
  return Product.findOne({ id: productId }).select({ reviews: 1 }).exec();
}


export function getUsers() {
  return User.find();
}

export function getUserById(userId){
  return User.findOne({ id: userId });
}

export function addUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

export function updateUser(userId, user) {
  return User.update({ id: userId }, { $set: user}, { upsert: true });
}

export function deleteUser(userId) {
  return User.deleteOne({ id: userId });
}


export function getCities() {
  return City.find();
}

export function addCity(city) {
  const newCity = new City(city);
  return newCity.save();
}

export function updateCity(cityId, city) {
  return City.update({ id: cityId }, { $set: city}, { upsert: true });
}

export function deleteCity(cityId) {
  return City.deleteOne({ id: cityId });
}