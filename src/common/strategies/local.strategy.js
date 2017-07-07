var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../../models/user');

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {

            User.find({ 'username': username }, {}, function (err, results) {
                if (err) { 
                    console.log(`*** getBookById error: ${err}`); 
                }
                if (results.password === password) {
                    var user = results;
                    done(null, user);
                } else {
                    done(null, false, {message: 'Bad password'});
                }
            });

        }));
};