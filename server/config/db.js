const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    // Use MONGO_URL from environment variable, with fallback for local development
    const connectionString =
      process.env.MONGO_URL || "mongodb://localhost:27017/fintrack";

    await mongoose.connect(connectionString);
    console.log(
      `Connected to MongoDB: ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log("DB Connection Error:".bgRed, error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
