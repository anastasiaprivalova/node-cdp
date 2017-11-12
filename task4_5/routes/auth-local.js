import express from 'express';
let router = express.Router();
import passport from 'passport';

router.post('/', passport.authenticate('local', {}), (req, res) => {
  res.json({
    "code": 200,
    "message": "OK"
  });
});

export default router;