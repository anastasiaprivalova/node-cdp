import express from 'express';
let router = express.Router();
import passport from 'passport';
import tokens from './../models/tokens.json';

router.post('/', passport.authenticate('local', { session: false }), function (req, res) {
  let token = tokens.find(token => token.id === req.user.id);
  res.json(token);
});

export default router;