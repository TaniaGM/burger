// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function(allCallback) {
    orm.all("burgers", function(res) {
      allCallback(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, insertCallback) {
    orm.insertOne("burgers", cols, vals, function(res) {
      insertCallback(res);
    });
  },
  updateOne: function(devourStatus, condition, updateCallback) {
    orm.updateOne("burgers", devourStatus, condition, function(res) {
      updateCallback(res);
    });
  },
  /*
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
  */
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
