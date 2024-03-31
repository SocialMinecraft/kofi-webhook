var express = require('express');
var router = express.Router();
var protobuf = require("protobufjs");

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/', async (req, res) => {
    const body = JSON.parse(req.body.data);

    // Check the verification token
    if (global.config.kofiVerification !== body.verification_token) {
        res.status(401).send({
            "error": "Incorrect or missing verification_token"
        })
        return;
    }

    // verify the following fields exist
    // message_id, timestamp, amount, currency kofi_transaction_id, email
    // is_first_subscription_payment, tier_name (can be null), is_subscription_payment, type

    let root = protobuf.loadSync("./proto/kofi.proto");
    const msgType = root.lookupType("KofiPayment");
    let payload = {
        kofiMessageId: body.message_id || 'unknown',
        kofiTimestamp: body.timestamp || '',
        kofiTransactionId: body.kofi_transaction_id || '',

        amount: body.amount || '',
        currency: body.currency || '',
        email: body.email || '',
        type: body.type || 'unknown',
        from: body.from_name || 'unknown',

        isSubscriptionPayment: body.is_subscription_payment,
        isFirstSubscriptionPayment: body.is_first_subscription_payment,
        tier_name: body.tier_name
    }
    const errMsg = msgType.verify(payload);
    if (errMsg) {
        console.log(errMsg);
    }
    const message = msgType.create(payload);
    const buffer = msgType.encode(message).finish();

    try {
        await global.nc.publish("kofi.payment", buffer, );
    } catch (err) {
        console.log("NATS error:", err.message);
    }

    res.status(200).send({
        "status": "accepted"
    });

    // TODO - should look into how non-USD is handled...
});

module.exports = router;
