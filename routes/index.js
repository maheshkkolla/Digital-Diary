var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.user = {name:"Mahesh"}
  res.render('index');
});

router.get('/journals', function(req, res, next) {
	res.locals.user = {name:"Mahesh"}
  	res.render('journals');
});

router.get('/search', function(req, res, next) {
	res.locals.user = {name:"Mahesh"}
  	res.render('search');
});

module.exports = router;
