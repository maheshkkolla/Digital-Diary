var config = require('../config')
var knex = require('knex')(config.db);
var Dropbox = require('./dropbox'); 
var journals = {};
module.exports = journals;

journals.getJournal = function(user, req, callback) {
	var date = new Date(req.date.slice(0,15));
	var date1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	var date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
	var date2 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
	knex('journals')
	.where('date_time', '>=', date1)
	.andWhere('date_time', '<', date2)
	.andWhere('user_id', '=', user.id)
	.orderBy('date_time')
	.limit(1)
	.offset((req.page-1) * 1)
	.then(function(journals){
		getJournalfromDropbox(user, journals[0], callback);
	})
	.catch(callback);
}

journals.getCount = function(user, req, callback) {
	var date = new Date(req.date.slice(0,15));
	var date1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	var date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
	var date2 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
	knex('journals').count('id')
	.where('date_time', '>=', date1)
	.andWhere('date_time', '<', date2)
	.andWhere('user_id', '=', user.id)
	.then(function(journals){
		callback(null, journals[0].count);
	})
	.catch(callback);
}

journals.create = function(user, journal, callback){
	addJournalToDropbox(user, journal, function(err, body) {
		if(err) callback(err, null);
		else{
			var journalMetaData = { userId: user.id, filePath: body.path, dateTime: journal.dateTime};
			addJournalToDb(journalMetaData, callback);
		}
	});
};

var getJournalfromDropbox = function(user, journal, callback) {
	var dropbox = new Dropbox(user.access_token);
	dropbox.getFile(journal.file_path, function(err, journalContent){
		if(err) callback(err, null);
		else {
			journal.content = journalContent;
			callback(null, journal);
		}
	});
}

var addJournalToDropbox = function(user,journal,callback) {
	var dropbox = new Dropbox(user.access_token);
	var filePath = filePathFrom(new Date(journal.dateTime));
	dropbox.putFile(filePath, journal.journal, callback);
}

var addJournalToDb = function(journal ,callback) {
	knex('journals').returning('id')
	.insert({user_id: journal.userId, file_path: journal.filePath, date_time: new Date(journal.dateTime), create_at: 'now()'})
	.then(function(createdIds) {
		callback(null, createdIds[0]);
	})
	.catch(callback);
}


var filePathFrom = function(date) {
	var path = '/' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + "/";
	var fileName = new Buffer(new Date().toString()).toString('base64');
	return(path + fileName)
}