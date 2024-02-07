const { Kafka } = require('kafkajs')

class Kafka_producer {
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
        const str = obj.toString();
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
