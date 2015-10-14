var express             = require('express'),
    PORT                = process.env.PORT || 5432,
    server              = express(),
    MONGOURI            = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME              = 'project2',
    bodyParser          = require('body-parser'),
    ejs                 = require('ejs'),
    expressEjsLayouts   = require('express-ejs-layouts'),
    session             = require('express-session'),
    methodOverride      = require('method-override'),
    mongoose            = require('mongoose'),
    morgan              = require('morgan'),
    userController      = require('./controllers/users.js'),
    articleController   = require('./controllers/articles.js');

//Session
server.use(session({
  secret: "hungryhippoballingspalding",
  resave: false,
  saveUninitialized: true
}));

///////////Server Set UP and Use Defaults///////////////
server.set('views', './views');
server.set('view engine', 'ejs');

server.use(methodOverride('_method'));
server.use(morgan('dev'));
server.use(express.static('./public'));
server.use(expressEjsLayouts);
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/users', userController);
server.use('/articles', articleController);

//Home Route
server.get('/', function(req, res) {
  res.locals.author = undefined;
  res.render('index');
});

//Catch All Route
server.use(function (req, res, next) {
  res.send("No More Routes");
  res.end();
});

mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function (){
  console.log("Hey listening on PORT: ", PORT);
});
