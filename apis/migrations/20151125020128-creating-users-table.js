var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('users', {
		id: {type: 'int', primaryKey: true},
		name: 'text',
		email: {type: 'text', notNull: true}, 
		access_token: {type: 'text', notNull: true}
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('users', callback);
};
