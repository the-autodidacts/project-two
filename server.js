var express             = require('express'),
    PORT                = process.env.PORT || 5432,
    server              = express(),
    MONGOURI            = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME              = 'project2',
    bodyParser          = require('body-parser'),
    ejs                 = require('ejs'),
    expressEjsLayouts   = require('express-ejs-layouts'),
    session             = require('express-session'),
    mongoose            = require('mongoose'),
    morgan              = require('morgan');


/*javascript for controller
server.use('/article', articleController);
*/


// article is the datatype the object that follows it is the configuration schema
//object id and populate or embed author object
    var Article = mongoose.model ('article', {
      author:         Object,
      title:          String,
      content:        String,
      lastEdit:       Date,
      lastEditAuthor: Object
    });

///////////Server Set UP and Use///////////////
server.set('views', './views');
server.set('view engine', 'ejs');

server.use(morgan('dev'));
server.use(express.static('./public'));
server.use(expressEjsLayouts);
server.use(bodyParser.urlencoded({ extended: true }));

server.use(function (req, res, next) {
  console.log("REQ DOT BODY", req.body);
  console.log("REQ DOT PARAMS", req.params);
  console.log("RES DOT BODY", res.body);
  next();
});

server.get('/', function(req, res) {
  res.render('index');
});

server.get('/signup', function (req, res) {
  res.render('signup')

});
server.get('/latest', function (req, res){
  Article.find ({}, function (err, allArticles){
    if (err){
      res.redirect(302, '/' )
    } else {
      res.render('latest', {
        articles: allArticles
      });
    }
  });
});

server.post('/latest', function (req, res) {
  var article = new Article ({
    //author:   req.session.authorName,
    title:    req.body.article.title,
    content:  req.body.article.content
  });
  console.log(req.body.article)

  tweet.save(function(err, newArticle){
    if (err){
      res.redirect(302, 'new')
    }else{
      res.redirect(302, 'latest')
    }
  })
});

mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function (){
  console.log("Hey listening on PORT: ", PORT);
});
