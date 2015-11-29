var config = require('../config')
var knex = require('knex')(config.db);
var Dropbox = require('./dropbox'); 
var journals = {};
module.exports = journals;

journals.create = function(user, journal, callback){
	addJournalToDropbox(user, journal, function(err, body) {
		if(err) callback(err, null);
		else{
			var journalMetaData = { userId: user.id, title: journal.title, filePath: body.path, dateTime: journal.dateTime};
			addJournalToDb(journalMetaData, callback);
		}
	});
};

var addJournalToDropbox = function(user,journal,callback) {
	var dropbox = new Dropbox(user.access_token);
	var filePath = filePathFrom(new Date(journal.dateTime));
	dropbox.putFile(filePath, journal.journal, callback);
}


var addJournalToDb = function(journal ,callback) {
	knex('journals').returning('id')
	.insert({user_id: journal.userId, title: journal.title, file_path: journal.filePath, date_time: new Date(journal.dateTime), create_at: 'now()'})
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