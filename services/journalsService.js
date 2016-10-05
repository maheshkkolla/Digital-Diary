var journalsModule = require('../modules/journalsModule');
var locationsSerive = require('./locationsService');
var dropboxService = require('./dropboxService');
var service = {};
module.exports = service;

service.createJournal = function(user, journal) {
    var result = {};
    return dropboxService.storeJournalContent(user, journal)
    .then(function(dropboxRes) {
        result.filePath = dropboxRes.path;
        if(journal.location)
            return locationsSerive.findOrCreate(journal.location);
        return Promise.resolve(null);
    }).then(function(locationId) {
        delete journal.location;
        journal.filePath = result.filePath;
        journal.locationId = locationId;
        result.locationId = locationId;
        return journalsModule.create(user, journal);
    }).then(function(journalId) {
        result.journalId = journalId;
        return Promise.resolve(result);
    });
};

service.deleteBy = function(user, id) {
    return journalsModule.getFilePathBy(id)
    .then(function(filePath) {
        return dropboxService.deleteJournalContent(user, filePath);
    }).then(function(dropboxSuccess) {
        return journalsModule.deleteJournal(id);
    });
};
