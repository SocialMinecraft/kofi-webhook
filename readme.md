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

NATS_URL 
: The nats url to use (default: nats://127.0.0.1:4222)