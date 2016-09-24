'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.removeColumn('locations', 'journal_id');
  db.addColumn('journals', 'location_id', {
    type: 'int',
    foreignKey: {
      name: 'journal_location_fk',
      table: 'locations',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      mapping: {
        location_id: 'id'
      }
    }
  }, callback);
};

exports.down = function(db, callback) {
  callback();
};
