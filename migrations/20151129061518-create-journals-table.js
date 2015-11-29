var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('journals', {
		id: {type: 'int', primaryKey: true, autoIncrement: true},
		user_id: {type:'int', notNull: true, 
			foreignKey: {
				name: 'journal_user_id_fk',
				table: 'users',
				rules: {
            		onDelete: 'CASCADE',
            		onUpdate: 'RESTRICT'
          		},
          		mapping: 'id'
			}
		},
		file_path: {type:'text', notNull: true},
		date_time: {type: 'timestamp with time zone', notNull: true},
		create_at: {type: 'timestamp with time zone'}
	}, callback);
};

exports.down = function(db, callback) {
  callback();
};
