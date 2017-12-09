var locationsModule = require('../modules/locationsModule.js');
var service = {};

module.exports = service;

service.findOrCreate = function(location) {
    return locationsModule.getLocationId(location.latitude, location.longitude)
    .then(function(locationId) {
        if(locationId) return Promise.resolve(locationId);
        return locationsModule.create(location);
    });
};