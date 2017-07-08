var mongoose = require('mongoose'),
    dbConfig = require('../common/configLoader').databaseConfig,
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;

var DB = function () {

    var startUp = function () {
        const options = {};
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                console.log('mongoose.connect() failed: ' + err);
            }
        });
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
        });
        
        mongoose.connection.once('open', () => {
            console.log('We have connected to mongodb');
        });
    };

    var close = function () {
        connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    };

    return {
        startUp: startUp,
        close: close
    };
};

module.exports = DB();