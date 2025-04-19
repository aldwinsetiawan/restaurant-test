## How to Start the MongoDB Replica Set

To build and start the container in detached mode, run:

```bash
docker compose up --build -d
```

### File Descriptions

- **`03seed.js`**  
  Contains the seed data for the database. You can modify this file to change the initial data.

- **`01initial-config.js`**  
  Sets up a regular (non-admin) user for MongoDB access.

- **`02init-replica.js`**  
  Initializes the MongoDB replica set — this is crucial for compatibility with Prisma.  
  **Note:** Without a replica set, Prisma's MongoDB provider will not function properly.

### Keyfile

- MongoDB requires a keyfile for replica set authentication.
- Make sure the **`mongo-keyfile`** is present and properly configured in your Docker setup.
