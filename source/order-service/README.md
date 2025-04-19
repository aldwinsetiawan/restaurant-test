## Order Service

This microservice is responsible for creating orders and publishing messages to the exchange to notify other microservices.

### How it Works

- Users can log in and obtain a token to access the `place-order` API.
- When an order is placed, a message is published to the `orders` exchange.
- Users can track their order using the `orderId` received during order placement.

### Commonly Used API Endpoints

- **`POST /login`**  
  Log in and receive a JWT token.

- **`GET /foods`**  
  Retrieve the list of available food items.

- **`POST /place-order`**  
  Place an order with the selected food items.

- **`GET /track-order`**  
  Track an order using its `orderId`.

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
