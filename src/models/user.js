const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : { type : String, required: true, trim: true },
    password : { type : String, required: true, trim: true },
});

module.exports = mongoose.model('User', UserSchema, 'users');
