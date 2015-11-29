var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('journals','title',{type:'text'}, callback);
};

exports.down = function(db, callback) {
  callback();
};
