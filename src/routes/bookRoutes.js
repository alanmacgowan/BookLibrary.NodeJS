var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {
    var bookController = require('../controllers/bookController')(nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getBooks);

    bookRouter.route('/:id')
        .get(bookController.getBookById);

    return bookRouter;
};
module.exports = router;