import { connection } from './../db';
import createApi from './apiCreator';
import productSchema from './../models/productSchema';

const Product = connection.model('product', productSchema);
let productApi = createApi(Product);

productApi.getProductReviews = productId => Product.findOne({ id: productId }).select({ reviews: 1 }).exec();

export default productApi;