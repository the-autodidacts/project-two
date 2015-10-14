var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

//define routes for the router
router.get('/signup', function (req, res) {
  res.render('users/signup')
});

router.post('/', function (req, res) {

});

// export router objects
module.exports = router;
