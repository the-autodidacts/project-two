var express     = require('express'),
  PORT          = process.env.PORT || 5432,
    server      = express(),
    MONGOURI    = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME      = 'project2',
    parser      = require('body-parser'),
    ejs         = require('ejs'),
    ejsLayouts  = require('express-ejs-layouts'),
    session     = require('express-session'),
    mongoose    = require('mongoose'),
    morgan      =require('morgan');

///////////Server Set UP and Use///////////////
server.set('views', './views');
server.set('view engine', 'ejs');

server.use(morgan('dev'));
server.use(express.static('./public'));
server.use(ejsLayouts);
server.use(parser.urlencoded({ extended: true }));

server.get('/', function (req, res){
  res.write("Welcome to my app");
  res.end();
});

mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function (){
  console.log("Hey listening on PORT: ", PORT);
});
