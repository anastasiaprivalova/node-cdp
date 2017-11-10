import express from 'express';
const app = express();
import session from 'express-session';
import passport from 'passport';

import { secretKey } from './config';

import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import authChecker from './middlewares/authChecker';
import isLoggedIn from './middlewares/isLoggedIn';

import localStrategy from './authStrategies/localStrategy';

import productsRouter from './routes/products';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authLocalRouter from './routes/auth-local';

app.use(express.json());
app.use(cookieParser);
app.use(queryParser);

//---Start of init session for passport, not needed for JWT
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
localStrategy();
app.use(passport.session());
//---End of init session for passport

app.get('/', function (req, res) {
  console.log(req.parsedCookies, req.parsedQuery);
});

app.use('/auth', authRouter);
app.use('/auth-local', authLocalRouter);

//Auth with JWT
//app.use('/products', authChecker, productsRouter);
//app.use('/users', authChecker, usersRouter);

//Auth with passport
app.use('/products', isLoggedIn, productsRouter);
app.use('/users', isLoggedIn, usersRouter);

export default app;