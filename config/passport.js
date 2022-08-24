import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import passport from 'passport';
import { UserModel } from '../models/User.js';

const strategy = GoogleStrategy.Strategy;

export function startPassport(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      // async because dealing with mongoose
      async function (accessToken, refreshToken, profile, doneCB) {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await UserModel.findOne({ googleId: profile.id });
          // if user exists
          if (user) {
            doneCB(null, user);
            // if user doesn't exist
          } else {
            user = await UserModel.create(newUser);
            doneCB(null, user);
          }
        } catch (err) {
          console.log('💣💣💣 BANG BANG ERROR 💣💣💣');
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser(function (user, doneCB) {
    doneCB(null, user.id);
  });

  passport.deserializeUser(function (id, doneCB) {
    UserModel.findById(id, function (err, user) {
      doneCB(err, user);
    });
  });
}
