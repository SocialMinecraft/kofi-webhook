require('dotenv').config();

class Config {

    constructor() {
        this.natsUrl = process.env.NATS_URL || 'nats://127.0.0.1:4222';
        this.kofiVerification = process.env.KOFI_VERIFY || '';
    }
}

module.exports = Config;