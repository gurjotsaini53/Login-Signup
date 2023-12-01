const mongoose = require("mongoose");
const mongocli = require("mongodb").MongoClient;

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://harshit1084be21:123456788@cluster0.qnzacum.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;