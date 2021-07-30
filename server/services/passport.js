const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const { User } = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken: ', accessToken);
      // console.log('refreshToken: ', refreshToken);
      // console.log('profile: ', profile);
      // const existingUser = await User.findOne({ googleId: profile.id });
      // if (existingUser) {
      //   return done(null, existingUser);
      // }
      // const user = await new User({ googleId: profile.id }).save();
      // done(null, user);
    },
  ),
);
