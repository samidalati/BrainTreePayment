var express = require('express');
var router = express.Router();
var braintree = require("braintree");

var gateway = braintree.connect({
 environment: braintree.Environment.Sandbox,
 merchantId: "g5hh4hpnxpxhg5d6",
 publicKey: "kcwbzw24fpcwh6td",
 privateKey: "9d2e8f61176c63087be4325358c61ee8"
});


router.get('/', function(req, res, next) {
  // gateway.clientToken.generate({customerId: result.customer.id}, function (err, response) {
   //         token = response.clientToken);
   //});
  res.send('here');
});


router.post('/', function(req, res) {
  console.log(req.body.submerchantID);
    gateway.transaction.sale({
    merchantAccountId: req.body.submerchantID,//"providerSubMerchantAccount",
    amount: req.body.Amount,
    paymentMethodNonce: 'fake-valid-nonce',//nonceFromTheClient,
    serviceFeeAmount: "0.00"
    }, function (err, result) {
      if(result.success == true){
        gateway.merchantAccount.find(req.body.submerchantID, function(err, customer) {
          console.log(customer);
          res.send('$' + req.body.Amount + ' are deposited to you account. ');
        });
      }
      else
        res.send('Payment did not go through! Please contact customer support');
    });
});

module.exports = router;
