var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/query', function(req, res, next) {
	var fileName = new Buffer(new Date().toString()).toString('base64');
	fs.writeFileSync('./public/queries/'+fileName+'.json', JSON.stringify(req.body));
	res.send('OK');
});

module.exports = router;
