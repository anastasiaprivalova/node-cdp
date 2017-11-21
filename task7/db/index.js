import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import createApi from './apiCreator';
import productSchema from './productSchema';
import userSchema from './userSchema';
import citySchema from './citySchema';

const connection = mongoose.createConnection('mongodb://localhost:27017/node-cdp', {
  useMongoClient: true
});

const mongooseConnect = () => connection;

const Product = connection.model('product', productSchema);
const User = connection.model('user', userSchema);
const City = connection.model('city', citySchema);

let productApi = createApi(Product);
productApi.getProductReviews = productId => Product.findOne({ id: productId }).select({ reviews: 1 }).exec();

let userApi = createApi(User);

let cityApi = createApi(City);

export {
  mongooseConnect,
  productApi,
  userApi,
  cityApi
}