var express = require('express');
var router = express.Router();
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "m9wfy6htd7m3427f",
  publicKey: "d6c3553h5w3by8z3",
  privateKey: "013f196915d9f08e3580b0b4c81b2b55"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  gateway.clientToken.generate({}, function (err, response) {
    res.render('index', { token:response.clientToken});
  });
});

router.post('/checkout', function(req, res, next) {
  //console.log(req.body.name);
    var nonceFromTheClient = req.body.payment_method_nonce ;//'fake-valid-nonce';
    var amm = req.body.Amount;
    gateway.transaction.sale({
    amount: amm,
    paymentMethodNonce: nonceFromTheClient,
    }, function (err, result) {
});
  
  res.send(req.body.payment_method_nonce + "   " + req.body.Amount);
});
module.exports = router;
