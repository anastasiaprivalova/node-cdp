import express from 'express';
const app = express();
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import productsRouter from './routes/products';
import usersRouter from './routes/users';

app.use(express.json());
app.use(cookieParser);
app.use(queryParser);

app.get('/', function (req, res) {
  console.log(req.parsedCookies, req.parsedQuery);
});

app.use('/products', productsRouter);
app.use('/users', usersRouter);

export default app;