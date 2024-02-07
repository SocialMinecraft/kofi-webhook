var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    const payload = req.body;

    // Check the verification token

    // verify the following fields exist
    // message_id, timestamp, amount, currency kofi_transaction_id, email
    // is_first_subscription_payment, tier_name (can be null), is_subscription_payment, type

    // Let's create a message and send it into the kafka

    // TODO - should probalby look into how non-USD is handled...
});

module.exports = router;
