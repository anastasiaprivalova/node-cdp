import mongoose from 'mongoose';

// Not mine, source: http://emailregex.com/
/* eslint-disable */
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'User id is required']
  },
  name: {
    type: String,
    required: [true, 'User name is required']
  },
  surname: {
    type: String,
    required: [true, 'User surname is required']
  },
  email: {
    type: String,
    validate: {
      validator: v => emailRegex.test(v),
      message: 'Invalid email'
    },
    required: [true, 'User email is required']
  },
  password: {
    type: String,
    required: [true, 'User password is required']
  },
  type: {
    type: String,
    required: [true, 'User type is required']
  },
  lastModifiedDate: {
    type: Date,
    required: false,
    default: Date.now()
  }
});

userSchema.pre('update', function() {
  this.update({},{ $set: { lastModifiedDate: new Date() } });
});

export default userSchema;