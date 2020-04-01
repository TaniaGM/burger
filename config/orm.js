var connection = require("./connection.js");

// Helper function for SQL syntax
function printQuestionMarks(num) {
    var questionArray = [];
    for (var i = 0; i < num; i++) {
        questionArray.push("?");
    }

    return questionArray.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var sqlArr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
           
            sqlArr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return sqlArr.toString();
}

// Display all burgers in the db
var orm = {
    all: function (table, callbackAll) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, res) {
            if (err) {
                console.log(err)
            }
            console.log("Res: "+result);
            cb(result);
        });
    },
    // Add burger to db
    insertOne: function(table, cols, vals, insertCallback) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            insertcb(result);
        });
    },
    // Setting burger devoured to true
    updateOne: function (table, devourStatus, condition, updateCallback) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(devourStatus);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            updateCallback(result);
        });
    }
}

module.exports = orm;

/*   // Delete burger from db
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;
