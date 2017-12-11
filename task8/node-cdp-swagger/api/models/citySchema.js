import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  lat: {
    type: String,
    required: [true, 'Latitude is required']
  },
  long: {
    type: String,
    required: [true, 'Longitude is required']
  }
});

export const citySchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'City id is required']
  },
  name: {
    type: String,
    required: [true, 'City name is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  capital: {
    type: Boolean,
    required: false,
    default: false
  },
  location: {
    type: locationSchema,
    required: [true, 'Latitude & Longitude are required']
  },
  lastModifiedDate: {
    type: Date,
    required: false,
    default: Date.now()
  }
});

citySchema.pre('update', function() {
  this.update({},{ $set: { lastModifiedDate: new Date() } });
});

export default citySchema;