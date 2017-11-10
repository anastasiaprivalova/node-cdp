import passport from 'passport';
import { Strategy } from 'passport-local';
import getUserByEmail from '../helpers/getUserByEmail';

export default function localStrategy() {
  let strategy = new Strategy({
    usernameField : 'email',
    passwordField : 'password',
  }, (username, password, done) => {
    let notFoundCallback = () => done(new Error('User not found'), null);
    let onSuccess = (user) => {
      if(user.password === password) {
        return done(null, user);
      } else {
        notFoundCallback();
      }
    };
    let onError = () => done(new Error('Wrong input'), null);

    getUserByEmail(username, onSuccess, onError, notFoundCallback);
  });

  passport.use('local', strategy);

  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    let notFoundCallback = () => done(new Error('User not found'), null);
    let onSuccess = user => done(null, user);
    let onError = () => done(new Error('Wrong input'), null);

    getUserByEmail(email, onSuccess, onError, notFoundCallback);
  });
}