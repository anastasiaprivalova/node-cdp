import { connection } from './../db';
import createApi from './apiCreator';
import citySchema from '../models/citySchema';

const City = connection.model('city', citySchema);

export default createApi(City);