var braintree = require("braintree");

// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "r7wz8jjvvmjwsp6f",
//   publicKey: "bhcv3m2xkkvt3v8t",
//   privateKey: "78f554feb909dffa7d81b276f858663a"
// });

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "r7wz8jjvvmjwsp6f",
  publicKey: "bhcv3m2xkkvt3v8t",
  privateKey: "78f554feb909dffa7d81b276f858663a"
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(response);
    }
  });
};

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      console.log("resp",response);
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
