var config = require('../config');
var knex = require('knex')(config.db);
var self = {};
module.exports = self;

self.create = function(location) {
    return knex('locations').returning('id').insert({
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
        phone_no: location.phoneNumber
    }).then(function(locationId) {
        return Promise.resolve(locationId[0])
    });
};

self.getLocationId = function(latitude, longitude) {
    return knex('locations').where({
        latitude: latitude,
        longitude: longitude
    }).select('id').then(function(location) {
        if(location.length > 0)
            return Promise.resolve(location[0].id);
        return Promise.resolve(null);
    });
};