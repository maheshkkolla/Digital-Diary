'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.addForeignKey('journals', 'users', 'journal_user_id_fk', { 'user_id': 'id' }, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
  }, callback);
};

exports.down = function(db, callback) {
  callback();
};
