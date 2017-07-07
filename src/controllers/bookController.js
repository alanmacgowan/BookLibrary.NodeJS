var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Book = require('../models/book');

var bookController = function (nav) {

    var middleware = function (req, res, next) {
        //if (!req.user) {
        //res.redirect('/');
        //}
        next();
    };

    var getBooks = function (req, res) {

        // Book.count((err, bookCount) => {
        //     var count = bookCount;
        //     console.log(`Book count: ${count}`);

            Book.find({}, (err, books) => {
                if (err) { 
                    console.log(`*** bookController.getBooks error: ${err}`); 
                }
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: books
                });
            });

        // });

    };

    var getBookById = function (req, res) {
        var id = req.params.id;
      
        Book.find({ '_id': id }, {}, function (err, book) {
            console.log('getBookById: ' + book);
            if (err) { 
                console.log(`*** getBookById error: ${err}`); 
            }
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: book[0]
            });
        });
    };

    return {
        getBooks: getBooks,
        getBookById: getBookById,
        middleware: middleware
    };
};

module.exports = bookController;