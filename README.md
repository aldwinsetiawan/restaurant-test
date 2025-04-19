# Restaurant Microservices - Docker Setup

Code source is located at `/source`  
Multiarch image built using Docker Buildx is in `/multiarch`

Before running the services:

1. Create a Docker network for the containers to communicate:

```bash
docker network create restaurant-net
```

This network is used for the 3 microservices and MongoDB to communicate.

2. Run RabbitMQ using a temporary container:

```bash
docker run -it --rm --name rabbitmq --network restaurant-net -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=test -e RABBITMQ_DEFAULT_PASS=test rabbitmq:4-management
```

This will start a temporary RabbitMQ container connected to `restaurant-net`.

- The management interface will be available at http://localhost:15672
- Default credentials:  
  Username: `test`  
  Password: `test`

3. Postman / Thunder client collection file for the API endpoints is provided, you can see which endpoint and how to do request there


### How to Test

1. **Run All Services**  
   Start all microservices, database, and supporting containers (e.g., RabbitMQ, MongoDB).

2. **Log In and Place an Order**  
   Use the provided endpoints (available in the API collection) to:
   - Log in as a user.
   - Place an order.

3. **Triggering Other Services**  
   Once the order is placed:
   - The **Kitchen Service** and **Notification Service** will automatically be triggered via RabbitMQ.

4. **Email Notification**  
   The **Notification Service** will send an email to the user.  
   *(You can modify the user email in the seed file if needed.)*

5. **Order Processing Simulation**  
   The **Kitchen Service** will simulate a delay of **10 seconds** to mimic real processing time.  
   After that:
   - The order status will be updated to `Processed`.
   - You can confirm this by using the `track-order` endpoint.

