var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

//All Purpose LOGGER
router.use(function (req, res, next) {
  console.log("===========User Routes=============");
  console.log("REQ DOT BODY", req.body);
  console.log("REQ DOT PARAMS", req.params);
  console.log("REQ DOT SESSION", req.session);
  next();
});


//define routes for the router
router.get('/signup', function (req, res) {
  res.render('users/signup')
});

router.post('/', function (req, res) {
  var newUser = User(req.body.user);
  newUser.save(function (err, user) {
    res.redirect(301, "/users/" + user._id)
  });
});

router.post('/signup', function (req, res) {
  console.log("entering post")
  var attempt = req.body.user;
  User.findOne({ email: attempt.email}, function (err, user) {
    if (err){
      console.log(err);
    }else {
    req.session.user = user;
    res.redirect(302, '/');
    }
  });
});

router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    console.log(user);
  });
});
// export router objects
module.exports = router;
