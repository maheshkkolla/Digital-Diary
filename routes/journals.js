var express = require('express');
var router = express.Router();
var journals = require('../modules/journals');

router.get('/', function(req, res, next) {
  	res.render('journals');
});

router.get('/journal', function(req, res, next) {
	journals.getJournal(req.session.user, req.query, function(err, journal) {
		if(err) next(err);
  		else res.render('_journal', {journal: journal, layout: false});
	});
});

router.put('/edit', function(req, res, next) {
	journals.edit(req.session.user, req.body, function(err, edited) {
		if(err) next(err);
		else res.send("OK");
	});
});

router.get('/count', function(req, res, next) {
	journals.getCount(req.session.user, req.query, function(err, count) {
		if(err) next(err);
		else res.send(count);
	});
});

router.post('/create', function(req, res, next) {
	journals.create(req.session.user,req.body, function(err, sucess) {
		if(err) next(err);
		else res.redirect('/journals');
	});

});

router.delete('/journal', function(req, res, next) {
	journals.deleteBy(req.session.user, req.query.id, function(err, status) {
		if(err) next(err);
		else res.send('OK');
	});
});

module.exports = router;