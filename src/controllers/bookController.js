var bookRepository = require('../repositories/bookRepository')();

var bookController = function (nav) {

    var middleware = function (req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };

    var getBooks = function (req, res) {
        bookRepository.getBooks((err, data) => {
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: data.books
            });
        });
    };

    var getBookById = function (req, res) {
        var id = req.params.id;    
        var book = bookRepository.getBookById(id, (err, data) => {
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: data.book
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