var Dropbox = require('../modules/dropboxModule');
var service = {};
module.exports = service;


service.storeJournalContent = function(user, journal) {
    var dropbox = new Dropbox(user.access_token);
    var filePath = journal.filePath || filePathFrom(new Date(journal.dateTime));
    return dropbox.putFile(filePath, journal.content);
};

var filePathFrom = function(date) {
    var path = '/' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + "/";
    var fileName = new Buffer(new Date().toString()).toString('base64');
    return(path + fileName)
};