import express from 'express';
const app = express();
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';

app.use(cookieParser);
app.use(queryParser);

app.get('/', function (req, res) {
  console.log(req.parsedCookies, req.parsedQuery);
  res.end('Hello world');
});

export default app;