## Nofication Service

This microservice is responsible for sending emails to users who have placed an order via the `order-service`.

### How it Works

- The service listens to the `order.confirmation` queue in the `orders` exchange.
- When a message is published to the exchange, it triggers the consumer.
- The consumer then calls the `sendEmail()` method in the `AppService` to send an email to the user.

### How to Run

To build and start the container in detached mode, use the following command:

```bash
docker compose up --build -d
```

### Dont Forget

create network if it doesnt exist yet:

```bash
docker network create restaurant-net
````
