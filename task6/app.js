import express from 'express';
const app = express();
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import { sequelize } from './db';

app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/products', productsRouter);
app.use('/users', usersRouter);

export default app;