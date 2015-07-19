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
router.post('/', function(req, res, next) {
  //res.send('respond with a resource!!!!');
  //console.log(req.body);
  var FullName = req.body.firstname + " " + req.body.lastname;
  
  //create customer
    gateway.customer.create({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website
  }, function (err, result) { //once a customer is created, create a token, 
    if(result.success){
        //console.log(result.customer.id);
        //res.render('loggedin', { Name:FullName});
        gateway.clientToken.generate({customerId: result.customer.id}, function (err, response) {
          //once a token is created, update customer info with token and method of payment
          /*gateway.customer.update(result.customer.id, {
          //paymentMethodNonce : response.paymentMethodNonce,
          token: response.clientToken
        }, function (err, result) {
            console.log(result.customer);
        });*/
            //once customer info is complete, make a payment!
            res.render('index', {customerID:result.customer.id, token:response.clientToken});
      });
    }

});

});



module.exports = router;