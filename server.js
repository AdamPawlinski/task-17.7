var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var app = express();
var googleProfile = {};

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
  res.render('./app_welcome');
});

app.get('/login', function(req, res) {
  res.render('./content');
});

app.listen(3000);
