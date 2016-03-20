var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('locations', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    journal_id: {
      type:'int',
      notNull: true,
      foreignKey: {
        name: 'location_journal_id_fk',
        table: 'journals',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          journal_id: 'id'
        }
      }
    },
    name: {type:'text', notNull: true},
    latitude: {type:'decimal(30,15)', notNull: true},
    longitude: {type:'decimal(30,15)', notNull: true},
    address: {type: 'text'},
    phone_no: {type: 'text'}
  }, callback);
};

exports.down = function(db, callback) {
  callback();
};
