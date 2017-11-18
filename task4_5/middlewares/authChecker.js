import jwt from 'jsonwebtoken';
import { secretKey } from './../config';

export default function authChecker(req, res, next) {
  let token = req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if(err) {
        res.status(403).send({"message": "Wrong token. Please login again"});
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({"message": "Session expired. Please login again"});
  }
}