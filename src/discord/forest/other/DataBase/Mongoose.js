const mongoose = require('mongoose');

mongoose.connect(process.env.MongooseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection; 
db.on("error", () => {
console.log("> error occurred from the database"); });
db.once("open", () => {
console.log("> successfully opened the database");
});

module.exports = {
    mongoose,
    GiveMeA() { return db; }
};