# Ko-Fi Events

This service listens on a /webhook endpoints for
events from the ko-fi services. It will then
verify the events and pass them along to
the kafka events API.

## Config

These values can be passed as environment 
variables or as part of a .env file.

PORT
: the port to listen on for requests. (default 3000)

KOFI_VERIFY 
: The verification token from ko-fi. (default: none)

KAFKA_CLIENT_ID 
: The client ID to use when sending messages to kafka. (default: kofi-events)

KAFKA_BROKERS
: A comma seperated array of kafka brokers. (default: localhost:9092)

KAFKA_TOPIC
: The kafka topic to send events to. (default: events).

## Events

### KOFI_PAYMENT
```json
{
  "eventType": "KOFI_PAYMENT",
  "stamp": 0,
  
  "kofiMessageId": "string",
  "kofiTimestamp": "string",
  "kofiTransactionId": "string",
  
  "amount": "string",
  "currency": "string",
  "email": "string",
  "type": "string",
  "from": "string",
  
  "isSubscriptionPayment": true,
  "isFirstSubscriptionPayment": true,
  "tier_name": "string|null"
}
```