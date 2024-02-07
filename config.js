require('dotenv').config();

class Config {

    constructor() {
        this.kafkaClientId = process.env.KAFKA_CLIENT_ID || 'kofi-events';
        this.kafkaBrokers = process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'];
        this.kafkaTopic = process.env.KAFKA_TOPIC || 'events';
        this.kofiVerification = process.env.KOFI_VERIFY || '';
    }
}

module.exports = Config;