db = db.getSiblingDB('test-db');

const emptyFood = db.Food.countDocuments({}) == 0;

if(emptyFood) {
  db.Food.insertMany([
    { name: "Milk", price: 5.0 },
    { name: "Fried Rice", price: 10.0 },
    { name: "Avocado Juice", price: 12.5 },
    { name: "Tempe", price: 3.0 },
    { name: "Chicken Breast", price: 999.0 },
  ]);
}

const emptyUser = db.User.countDocuments({}) == 0;

if(emptyUser) {
  db.User.insertMany([
    { username: "mambo", pass: "mambo", email: "redlocks0514@gmail.com" },
    { username: "momoi", pass: "hytam", email: "redlocks0514@gmail.com" }
  ]);
}

