var express = require('express');
var router = express.Router();
var journals = require('../modules/journals');
var service = require('../services/journalsService');

router.get('/', function(req, res, next) {
  	res.render('journals');
});

router.get("/ids", function(req, res, next) {
	journals.getIds(req.session.user, req.query, function(err, ids) {
		if(err) next(err);
		else res.json(ids);
	});
});

router.get("/:id", function(req, res, next) {
	var id = req.params.id;
	journals.getJournal(req.session.user, id, function(err, journal) {
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

router.post('/', function(req, res, next) {
	service.createJournal(req.session.user, req.body)
	.then(function(createdIds) {
		res.send(createdIds.journalId.toString());
	}).catch(function(err) {
		next(err);
	});
});

router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	journals.deleteBy(req.session.user, id, function(err, status) {
		if(err) next(err);
		else res.send('OK');
	});
});

module.exports = router;