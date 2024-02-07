const { Kafka } = require('kafkajs')

class KafkaProducer {
    constructor(clientId, brookers, topic) {
        this.kafka = new Kafka({
            clientId: clientId,
            brokers: brookers,
        });

        this.topic = topic;
        this.producer = this.kafka.producer();
    }

    async connect() {
        await this.producer.connect();
    }

    async close() {
        await this.producer.disconnect();
    }

    async sendMessage(obj){
        obj.stamp = Math.round(Date.now() / 1000);
        const str = JSON.stringify(obj) ;
        await this.sendMessageRaw(str);
    }

    async sendMessageRaw(str) {
        await this.producer.send({
            topic: this.topic,
            messages: [
                { value: str },
            ],
        })
    }
}

module.exports = KafkaProducer;
