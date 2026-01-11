const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    // MongoDB Atlas Cloud Connection
    const connectionString =
      "mongodb+srv://sathvikskemtur_db_user:2SON03bbGILxnKDx@cluster0.ckpkcny.mongodb.net/fintrack?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(connectionString);
    console.log(
      `Connected to MongoDB Atlas: ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log("DB Connection Error:".bgRed, error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
