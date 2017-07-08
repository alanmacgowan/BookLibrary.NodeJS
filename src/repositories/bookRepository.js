var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Book = require('../models/book');

var bookRepository = function (nav) {

    var getBooks = function (callback) {
        Book.find({}, (err, books) => {
            if (err) { 
                console.log(`*** getBooks error: ${err}`); 
                return callback(err); 
            }
            callback(null, {
                    books: books
            });
        });

    };

    var getBookById = function (id, callback) {
        Book.find({ '_id': id }, {}, function (err, book) {
            if (err) { 
                console.log(`*** getBookById error: ${err}`); 
                return callback(err); 
            }
            callback(null, {
                    book: book[0]
            });
        });
    };

    return {
        getBooks: getBooks,
        getBookById: getBookById
    };
};

module.exports = bookRepository;