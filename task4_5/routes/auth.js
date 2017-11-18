import express from 'express';
let router = express.Router();

import getUserByEmail from './../helpers/getUserByEmail';
import jwt from 'jsonwebtoken';
import { secretKey, errorMessages } from './../config';

// JWT auth
router.post('/', (req, res) => {
  getUserByEmail(req.body.email)
    .then((user) => {
      if(user.password === req.body.password) {
        const token = jwt.sign({data: user.id + user.email}, secretKey, {
          expiresIn: '60000'
        });

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
        res.json({
          "data": "error",
          "message": errorMessages.NOT_FOUND
        });
      }
    })
    .catch((error) => {
      res.json({
        "data": "error",
        "message": error
      });
    });
});

export default router;