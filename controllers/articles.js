var express = require('express'),
    router  = express.Router(),
    Article    = require('../models/article.js');

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

// export router objects
module.exports = router;
