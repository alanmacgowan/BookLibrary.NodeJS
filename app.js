var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./src/common/DB');
var passport = require('passport');
var app = express();
var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

class Server {

    constructor() {
        this.initViewEngine();
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initRoutes();
        this.start();
    }

    start(){
        app.listen(port, function (err) {
            console.log('running server on port ' + port);
        });
        db.startUp();
    }

    initViewEngine(){
        app.set('views', './src/views');
        app.set('view engine', 'ejs');
    }

    initExpressMiddleWare(){
        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded());
        app.use(cookieParser());
        app.use(session({secret: 'library'}));
        require('./src/common/passport')(app);
    }

    initCustomMiddleware(){
        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", function () {
                console.log('SIGINT: Closing MongoDB connection');
                db.close;
            });
        }

        process.on('SIGINT', function() {
            console.log('SIGINT: Closing MongoDB connection');
            db.close;
        });
    }

    initRoutes(){
        app.get('/', function (req, res) {
            res.render('index', {
                title: 'Book Library',
                nav: nav
            });
        });
        var bookRouter = require('./src/routes/bookRoutes')(nav);
        app.use('/Books', bookRouter);
        var authRouter = require('./src/routes/authRoutes')(nav);
        app.use('/Auth', authRouter);
    }

}

var server = new Server();







