var config = require('../config')
var knex = require('knex')(config.db);
var users = {};
module.exports = users;


users.getById = function(id, callback) {
	knex('users')
	.where('id', id)
	.then(function(users) {
		if(users.length > 0) callback(null, users[0]);
		else callback(null, null);
	})
	.catch(callback);
}

users.create = function(user, callback) {
	var self = this;
	knex('users').returning('id')
	.insert({ id: user.id, name: user.name, email:user.email, access_token: user.accessToken })
	.then(function(createdIds){
		self.getById(createdIds[0], callback);
    })
	.catch(callback);
};

users.findOrCreate = function(user, callback) {
	var self = this;
	self.getById(user.id, function(err, dbUser) {
		if(err) callback(err);
		else {
			dbUser && callback(null, dbUser);
			dbUser || self.create(user, callback);
		}	
	})
}
