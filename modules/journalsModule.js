var u = require('./utils');
var config = require('../config');
var knex = require('knex')(config.db);
var Dropbox = require('./dropboxModule');
var journals = {};
module.exports = journals;

journals.getJournal = function(user, id, callback) {
	knex('journals')
	.where('id', '=', id)
	.then(function(journals){
		journals.length && getJournalfromDropbox(user, journals[0], callback);
		journals.length || callback(null, null);
	})
	.catch(callback);
};

journals.getCount = function(user, req, callback) {
	var date = req.date.toDate();
	knex('journals').count('id')
	.where('date_time', '>=', date.toDbString())
	.andWhere('date_time', '<', date.next().toDbString())
	.andWhere('user_id', '=', user.id)
	.then(function(journals){
		callback(null, journals[0].count);
	})
	.catch(callback);
};

journals.getIds = function(user, req, callback) {
	var date = req.date.toDate();
	knex.select('id').from('journals')
		.where('date_time', '>=', date.toDbString())
		.andWhere('date_time', '<', date.next().toDbString())
		.andWhere('user_id', '=', user.id)
		.then(function(journals){
			callback(null, journals.getArrayOf('id'));
		})
		.catch(callback);
};

journals.create = function(user, journal) {
	return knex('journals').returning('id').insert({
		user_id: user.id,
		title: journal.title,
		file_path: journal.filePath,
		date_time: new Date(journal.dateTime),
		create_at: 'now()',
		location_id: journal.locationId
	});
};

journals.edit = function(user, data, callback) {
	knex.select('file_path').from('journals').where('id', data.id).then(function(journals) {
		if(journals.length > 0) {
			var journalData = {
				journal: data.journal,
				filePath: journals[0].file_path
			};
			addJournalToDropbox(user, journalData, callback);
		}
		else callback(true, null);
	}).catch(callback);
};

journals.getFilePathBy = function(id) {
	return knex.select('file_path').from('journals').where('id', id)
	.then(function(journals) {
		return Promise.resolve(journals[0].file_path)
	});
};

journals.deleteJournal = function(id) {
	return knex('journals')
	.where('id', id)
	.del();
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
};

var addJournalToDropbox = function(user, journal, callback) {
	var dropbox = new Dropbox(user.access_token);
	var filePath = journal.filePath || filePathFrom(new Date(journal.dateTime));
	dropbox.putFile(filePath, journal.content, callback);
};

var filePathFrom = function(date) {
	var path = '/' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + "/";
	var fileName = new Buffer(new Date().toString()).toString('base64');
	return(path + fileName)
};