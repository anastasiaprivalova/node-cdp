import express from 'express';
let router = express.Router();

import getUserByEmail from './../helpers/getUserByEmail';
import jwt from 'jsonwebtoken';
import { secretKey } from './../config';

// JWT auth
router.post('/', (req, res) => {
  let notFoundCallback = () => {
    res.json({
      "code": 404,
      "message": "Not Found",
      "data": "error"
    });
  };

  let onSuccess = (user) => {
    if(user.password === req.body.password) {
      const token = jwt.sign({data: user.id + user.email}, secretKey, {
        expiresIn: '60000'
      });

      res.cookie('accessToken', token, { maxAge: 60000, httpOnly: true });
      res.json({
        "code": 200,
        "message": "OK",
        "data": {
          "user": {
            "email": user.email,
            "username": `${user.name} ${user.surname}`
          }
        },
        "token": token
      });
    } else {
      notFoundCallback();
    }
  };

  let onError = () => {
    res.json({"error": "Wrong input"});
  };

  getUserByEmail(req.body.email, onSuccess, onError, notFoundCallback);
});

export default router;