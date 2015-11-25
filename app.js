var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var usersModule  = require('./modules/users');
var config = require('./config');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Digital Diary',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



// Dropbox oAuth
passport.use(new DropboxOAuth2Strategy({
    clientID: config.dropbox.clientID,
    clientSecret: config.dropbox.clientSecret,
    callbackURL: config.dropbox.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var userDetails = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      accessToken: accessToken
    };

    usersModule.findOrCreate(userDetails, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, {id: id});
});

var isAuthenticated = function(req, res, sucess) {
  passport.authenticate('dropbox-oauth2', function(authErr, user) {
      authErr && res.redirect('/login?error='+authErr);
      user && req.login(user, function(err) {
        if(err) res.redirect('/login?error='+err);
        else sucess();
      })
  })(req, res, sucess);
};

app.get('/auth/dropbox', passport.authenticate('dropbox-oauth2'));

app.get('/auth/dropbox-oauth2/callback', isAuthenticated, function(req, res, next) {
  req.session.user = req.user;
  req.locals.user = req.user;
  res.redirect('/');
});


app.get('/login', function(req, res, next) {
  res.render('login' , {error: req.query.error});
});

app.use(function (req, res, next) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
