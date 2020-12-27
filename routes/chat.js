var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('chat', {user: req.user });
});

module.exports = router;
