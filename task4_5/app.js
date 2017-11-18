import express from 'express';
const app = express();
import passport from 'passport';

import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import authChecker from './middlewares/authChecker';

import localStrategy from './authStrategies/localStrategy';

import productsRouter from './routes/products';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authLocalRouter from './routes/auth-local';

app.use(express.json());
app.use(cookieParser);
app.use(queryParser);

localStrategy();
app.use(passport.initialize());

app.get('/', function (req, res) {
  console.log(req.parsedCookies, req.parsedQuery);
});

app.use('/auth', authRouter);
app.use('/auth-local', authLocalRouter);

//Auth with JWT
//app.use('/products', authChecker, productsRouter);
//app.use('/users', authChecker, usersRouter);

//Auth with passport
app.use('/products', passport.authenticate('bearer', { session: false }), productsRouter);
app.use('/users', passport.authenticate('bearer', { session: false }), usersRouter);

export default app;