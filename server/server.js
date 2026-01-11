const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/db");

// config dot env file
dotenv.config();

// database call
connectDb();

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transactions", require("./routes/transactionRoute"));
app.use("/api/v1/budgets", require("./routes/budgetRoute"));

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// port - use environment variable first
const PORT = process.env.PORT || 8080;

// listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
