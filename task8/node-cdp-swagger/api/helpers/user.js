import { connection } from './../db';
import createApi from './apiCreator';
import userSchema from '../models/userSchema';

const User = connection.model('user', userSchema);

export default createApi(User);