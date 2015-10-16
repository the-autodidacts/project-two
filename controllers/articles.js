var express    = require('express'),
    router     = express.Router(),
    Article    = require('../models/article.js'),
    date       = new Date(),
    month      = date.getMonth() + 1,
    day        = date.getDate().toString(),
    year       = date.getFullYear().toString(),
    dateString = month.toString() + "/" + day + "/" + year;

//All Purpose LOGGER
router.use(function (req, res, next) {
  console.log("============Article Routes==============");
  console.log("REQ DOT BODY", req.body);
  console.log("REQ DOT PARAMS", req.params);
  console.log("REQ DOT SESSION", req.session);
  next();
});

// Begin article routes
router.get('/latest', function (req, res){
  if (!res.locals.currentUser.email){
    res.redirect(302, '/');
  }
  else {
    Article.find ({}, function (err, allArticles){
      if (err){
        res.redirect(302, '/' )
      } else {
        res.render('articles/latest', {
          articles: allArticles
        });
      }
    });
  }
});

router.get('/new', function (req, res) {
  if (!res.locals.currentUser.email){
    res.redirect(302, '/');
  }
  else {
  res.render('articles/new');
  }
});

router.post('/latest', function (req, res) {
  if (!res.locals.currentUser.email){
    res.redirect(302, '/');
  }else {
    var article = new Article ({
      author:   res.locals.currentUser,
      title:    req.body.article.title,
      content:  req.body.article.content,
      lastEdit: dateString
    });
    article.save(function(err, newArticle){
      if (err){
        res.redirect(302, '/articles/new')
      }else{
        res.redirect(302, '/articles/latest')
      }
    })
  }
});

router.get('/:id/edit', function (req, res) {
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


router.get('/:id', function (req, res) {
  var articleID = req.params.id;

  Article.findOne({
    _id: articleID
  }, function (err, foundArticle){
    if (err){
      res.write("Article ID is bad")
      res.end();
    } else {
      res.render('articles/show', {
        article: foundArticle
      });
    }
  });
});

router.delete('/:id', function (req, res) {
  var articleID = req.params.id;
  // alert("You are about to delete this article. Unfortunately event though this window is here there is nothing you can do. If you changed your mind.");
  Article.remove({
    _id: articleID
  }, function (err) {
    if (err){
      res.write("Could not delete article")
    }
    else{
      res.redirect(302, 'latest')
    }
  })
});
router.patch('/:id', function (req, res) {
  var articleID                = req.params.id,
  articleParams                = req.body.article;  articleParams.lastEdit       = dateString,
  articleParams.lastEditAuthor = res.locals.currentUser.firstName;


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



// export router objects
module.exports = router;
