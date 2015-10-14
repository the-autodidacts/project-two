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

server.use(session({
  secret: "hungryhippoballingspalding",
  resave: false,
  saveUninitialized: false
}));

///////////Server Set UP and Use///////////////
server.set('views', './views');
server.set('view engine', 'ejs');

server.use(methodOverride('_method'));
server.use(morgan('dev'));
server.use(express.static('./public'));
server.use(expressEjsLayouts);
server.use(bodyParser.urlencoded({ extended: true }));

server.use(function (req, res, next) {
  console.log("REQ DOT BODY", req.body);
  console.log("REQ DOT PARAMS", req.params);
  console.log("REQ DOT SESSION", req.session);
  next();
});

server.get('/', function(req, res) {
  res.locals.author = undefined;
  res.render('index');
});
//
// server.post('/', function (req, res) {
//   req.session.authorName = req.body.author.name
//   res.redirect(302, '/')
// });
//
// server.use(function (req, res, next) {
//   if (req.session.authorName == undefined) {
//     res.redirect(302, '/')
//   } else {
//     res.locals.author.name = req.session.author.name
//   }
// })

//User Routes
server.get('/users/signup', function (req, res) {
  res.render('users/signup')

});
// Begin article routes
server.get('/articles/latest', function (req, res){
  Article.find ({}, function (err, allArticles){
    if (err){
      res.redirect(302, '/' )
    } else {
      res.render('articles/latest', {
        articles: allArticles
      });
    }
  });
});

server.get('/articles/new', function (req, res) {
  res.render('articles/new');
});

server.post('/articles/latest', function (req, res) {
  var article = new Article ({
    //author:   req.session.authorName,
    title:    req.body.article.title,
    content:  req.body.article.content
  });
  article.save(function(err, newArticle){
    if (err){
      res.redirect(302, 'articles/new')
    }else{
      res.redirect(302, 'articles/latest')
    }
  })
});

server.get('/articles/:id/edit', function (req, res) {
  var articleID = req.params.id;

  Article.findOne({
    _id: articleID
  }, function (err, foundArticle){
    if (err){
      res.write("Article ID is bad")
      res.end();
    } else {
      res.render('articles/edit', {
        article: foundArticle
      });
    }
  });
});

server.patch('/articles/:id', function (req, res) {
  var articleID = req.params.id;
  var articleParams = req.body.article;

  Article.findOne({
    _id: articleID
  }, function (err, foundArticle){
    if (err){
      console.log(err)
    } else {
      foundArticle.update(articleParams, function (errTwo, article) {
        if (errTwo){
          console.log("ERROR UPDATING");
    } else {
        console.log("UPDATED")
        res.redirect(302, 'latest')
        }
      })
    }
  });
});

mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function (){
  console.log("Hey listening on PORT: ", PORT);
});
