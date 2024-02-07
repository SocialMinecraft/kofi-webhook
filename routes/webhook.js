var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var Singleton = require('../singleton');

/*router.get('/', async (req, res) => {

    Singleton.kafka.sendMessage({
        "hello": "world"
    })

    res.status(200).send({
        "hello": "world"
    })
});*/

router.post('/', async (req, res) => {
    const body = req.body.data;

    console.log(req)
    console.log(req.body)

    // Check the verification token
    if (Singleton.config.kofiVerification != body.verification_token) {
        res.status(401).send({
            "error": "Incorrect or missing verification_token"
        })
        return;
    }

    // verify the following fields exist
    // message_id, timestamp, amount, currency kofi_transaction_id, email
    // is_first_subscription_payment, tier_name (can be null), is_subscription_payment, type

    const msg = {
        eventType: "KOFI_PAYMENT",

        kofiMessageId: body.message_id || 'unknown',
        kofiTimestamp: body.timestamp || '',
        kofiTransactionId: body.kofi_transaction_id || '',

        amount: body.amount || '',
        currency: body.currency || '',
        email: body.email || '',
        type: body.type | 'unknown',
        form: body.from_name || 'unkown',

        isSubscriptionPayment: body.is_subscription_payment,
        isFirstSubscriptionPayment: body.is_first_subscription_payment,
        tier_name: body.tier_name

    }

    await Singleton.kafka.sendMessage(msg);

    res.status(200).send({
        "status": "accepted"
    });

    // TODO - should probalby look into how non-USD is handled...
});

module.exports = router;
