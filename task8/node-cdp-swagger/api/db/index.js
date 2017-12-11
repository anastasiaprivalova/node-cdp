import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

export const connection = mongoose.createConnection('mongodb://localhost:27017/node-cdp', {
  useMongoClient: true
});