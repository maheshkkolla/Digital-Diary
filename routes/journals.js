var express = require('express');
var router = express.Router();
var journals = require('../modules/journals');

router.get('/', function(req, res, next) {
  	res.render('journals');
});


router.post('/create', function(req, res, next) {
	journals.create(req.session.user,req.body, function(err, sucess) {
		if(err) next(err);
		else res.redirect('/journals');
	});

});


router.get('/search', function(req, res, next) {
  	res.render('search');
});


module.exports = router;