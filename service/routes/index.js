import express from 'express';
import authRoutes from "./authController";
import authService from "../services/authService";


let router = express.Router();

router.use('/auth', authRoutes);


/* health end point */
router.get("/ping", (req, res, next) => {
  res.send("pong");
  res.end();
});

router.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  authService.authenticate(token)
  .then(user => {
    res.locals.user=user;
    next();
  }).catch(err => {
    res.status(err.status || 500);
    res.json(err);
  });
});



// catch 404 and forward to error handler
router.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (router.get('env') === 'development') {
  router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


export default router;
