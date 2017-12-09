var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');
var DropboxOAuth2Strategy = require(config.libs.dropboxOauthStrategy).Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var journals = require('./routes/journals');
var contact = require('./routes/contact');
var usersModule  = require('./modules/usersModule');

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
app.use('/app-static', express.static(path.join(__dirname, 'dist')));
app.use('/app', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/', function(req, res) {
  res.redirect('/app');
});

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
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    usersModule.getById(id, done);
});

var authenticateUser = function(req, res, success) {
  passport.authenticate('dropbox-oauth2', function(authErr, user) {
      authErr && res.redirect('/app');
      user && req.login(user, function(err) {
        if(err) res.redirect('/app');
        else success();
      })
  })(req, res, success);
};

app.get('/auth/dropbox', passport.authenticate('dropbox-oauth2'));

app.get('/auth/dropbox-oauth2/callback', authenticateUser, function(req, res, next) {
  req.session.user = req.user;
  res.redirect('/app');
});

app.get('/login', function(req, res, next) {
  res.render('login' , {error: req.query.error});
});

app.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.locals.user = '';
  res.redirect('/login');
});

app.get('/ping', function(req, res, next) {
    res.send('pong');
    res.end();
});
app.use('/contact', contact);

app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.session.user;
    next();
  }
  else {
    res.status(401);
    res.send('Not Authorized !');
  }
});

app.use('/api', routes);
app.use('/users', users);
app.use('/journals', journals);

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
    console.error(err);
    console.error(err.stack);
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
