import passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as BearerStrategy from 'passport-http-bearer';
import { errorMessages } from './../config';
import getUserByEmail from '../helpers/getUserByEmail';
import tokens from './../models/tokens.json';

export default function localStrategy() {
  passport.use(new LocalStrategy.Strategy({
    usernameField : 'email',
    passwordField : 'password',
    session: false
  }, (username, password, done) => {
    getUserByEmail(username)
      .then((user) => {
        if(user.password === password) {
          return done(null, user);
        } else {
          done(null, false, errorMessages.NOT_FOUND);
        }
      })
      .catch((error) => { done(null, false, error);});
  }));

  passport.use(new BearerStrategy.Strategy(
    function (tokenRequested, done) {
      let result = tokens.find(token => token.token === tokenRequested);

      if (!result) {
        done(null, false);
      } else {
        done(null, result, { scope: 'all' })
      }
    }
  ));
}