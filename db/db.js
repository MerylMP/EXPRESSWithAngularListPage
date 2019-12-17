var MongoClient = require('mongodb').MongoClient;
var db = null;

// DB connection
module.exports.connect = function(url, callback) {
    if(db) {
        return callback();
    }

    const client = new MongoClient(url, {useNewUrlParser: true});
    client.connect(function (err, result) {
        if (err) {
            return callback(err);
        }
        console.log("Conectado a BD");
        db = result;
        callback();
    });
};

// Closing DB connection
module.exports.close = function(callback) {
    if (db) {
        db.close(function (err, result) {
            console.log("Desconectado de BD");
            db = null;
            callback(err);
        });
    }
};

// Retrieving the variable that contains the connection to the database
module.exports.get = function () {
    return db;
}