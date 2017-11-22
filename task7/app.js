import express from 'express';
const app = express();
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import citiesRouter from './routes/cities';
import { connection } from './db';

app.use(express.json());

connection.then((db) => {
  console.log('Connected to db');
});

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/cities', citiesRouter);

export default app;