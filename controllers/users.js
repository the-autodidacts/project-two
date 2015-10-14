var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');


//All Purpose LOGGER
router.use(function (req, res, next) {
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
console.log(req.body)
});

// export router objects
module.exports = router;
