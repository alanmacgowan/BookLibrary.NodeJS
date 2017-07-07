const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const BookSchema = new Schema({
    title : { type : String, required: true, trim: true },
    description : { type : String, required: true, trim: true },
    author : { type : String, required: true, trim: true },
    image : { type : String, required: true, trim: true }
});

module.exports = mongoose.model('Book', BookSchema, 'books');
