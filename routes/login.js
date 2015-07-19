var express = require('express');
var router = express.Router();
var braintree = require("braintree");

var gateway = braintree.connect({
 environment: braintree.Environment.Sandbox,
 merchantId: "g5hh4hpnxpxhg5d6",
 publicKey: "kcwbzw24fpcwh6td",
 privateKey: "9d2e8f61176c63087be4325358c61ee8"
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource!!!!');
  res.render('login');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource!!!!');
  router.get("/", function (req, res) {
 gateway.clientToken.generate({}, function (err, response) {
   res.render('index', {token: response.clientToken});
 });
});
  
  res.render('login');
});

/*
*/

module.exports = router;