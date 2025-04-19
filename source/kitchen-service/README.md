## Kitchen Service

This microservice is responsible for updating the order status to **'Processed'**.

### How it Works

- The service listens to the `order.process` queue in the `orders` exchange.
- When a message is published to the exchange, it automatically triggers the consumer.
- The consumer calls the `processOrder()` method in the `AppService`, which updates the order status.
- A simulated **10-second delay** is added to mimic processing time before the status is updated.


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
