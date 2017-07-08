var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Book = require('../models/book');

var bookRepository = function (nav) {

    var getBooks = function () {
        Book.find({}, (err, books) => {
            if (err) { 
                console.log(`*** getBooks error: ${err}`); 
            }
            return books;
        });

    };

    var getBookById = function (id) {
        Book.find({ '_id': id }, {}, function (err, book) {
            if (err) { 
                console.log(`*** getBookById error: ${err}`); 
            }
            return book[0];
        });
    };

    return {
        getBooks: getBooks,
        getBookById: getBookById
    };
};

module.exports = bookRepository;