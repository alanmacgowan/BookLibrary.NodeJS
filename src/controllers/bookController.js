var bookRpository = require('bookRepository')();

var bookController = function (nav) {

    var middleware = function (req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };

    var getBooks = function (req, res) {
        var books = bookRpository.getBooks();
        res.render('bookListView', {
            title: 'Books',
            nav: nav,
            books: books
        });
    };

    var getBookById = function (req, res) {
        var id = req.params.id;    
        var book = bookRpository.getBookById(id);
        res.render('bookView', {
            title: 'Book',
            nav: nav,
            book: book
        });
    };

    return {
        getBooks: getBooks,
        getBookById: getBookById,
        middleware: middleware
    };
};

module.exports = bookController;