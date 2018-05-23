const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./views/config');
let app = express();
let googleProfile = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    googleProfile = {
      id: profile.id,
      displayName: profile.displayName
    };
    cb(null, profile);
  }
));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('app_welcome', {user: req.user});
});

app.get('/logged', function(req, res) {
  res.render('./content', {user: googleProfile});
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/logged',
    failureRedirect: '/'
  }));

app.listen(3000);
