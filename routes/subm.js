var express = require('express');
var router = express.Router();
var braintree = require("braintree");

var gateway = braintree.connect({
 environment: braintree.Environment.Sandbox,
 merchantId: "g5hh4hpnxpxhg5d6",
 publicKey: "kcwbzw24fpcwh6td",
 privateKey: "9d2e8f61176c63087be4325358c61ee8"
});

router.post('/', function(req, res) {
  var idList = req.body.email.split('@')
  var userID = idList[0] + idList[1].split('.')[0];
 var merchantAccountParams = {
 individual: {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    //company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
    //website: req.body.website,
   dateOfBirth: req.body.dateOfBirth,
   ssn: req.body.ssn,
   address: {
     streetAddress: req.body.streetAddress,
     locality: req.body.locality,
     region: req.body.region,
     postalCode: "60622"
   }
 },
 /*business: {
   legalName: req.body.firstname,
   dbaName: req.body.lastname,
   //taxId: "98-7654321",
   address: {
     streetAddress: req.body.streetAddress,
     locality: req.body.locality,
     region: req.body.region,
     postalCode: req.body.postalCode
   }
 },*/
 funding: {
   //descriptor: "Blue Ladders",
   destination: braintree.MerchantAccount.FundingDestination.Email,
   email: req.body.email,
   mobilePhone: req.body.phone,
   //accountNumber: "1123583321",
   //routingNumber: "071101307"
 },
 tosAccepted: true,
 masterMerchantAccountId: "brizi",
 id: userID
};

 gateway.merchantAccount.create(merchantAccountParams, function (err, result) {
  res.send(result);
   console.log(result);
 });
 //res.render(result);
});

module.exports = router;
