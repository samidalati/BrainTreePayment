var express = require('express');
var router = express.Router();
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "m9wfy6htd7m3427f",
  publicKey: "d6c3553h5w3by8z3",
  privateKey: "013f196915d9f08e3580b0b4c81b2b55"
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource!!!!');
  res.render('login');
});

module.exports = router;