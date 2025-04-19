db = db.getSiblingDB("test-db");

db.createUser({
  user: "user1",
  pwd: "user1",
  roles: [
    {
      role: "readWrite",
      db: "test-db"
    }
  ]
});
