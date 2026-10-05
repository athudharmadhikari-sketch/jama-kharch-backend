const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");

// ============================================================
// ENVIRONMENT
// ============================================================

dotenv.config();

// ============================================================
// APP
// ============================================================

const app = express();

// ============================================================
// DATABASE
// ============================================================

connectDB();

// ============================================================
// CORS
// ============================================================

app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ============================================================
// BODY PARSER
// ============================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ============================================================
// ROOT
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Jama Kharch API is running",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV || "development",
  });
});

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    date: new Date().toISOString(),
  });
});

// ============================================================
// TRANSACTION ROUTES
// ============================================================

app.use(
  "/api/transactions",
  transactionRoutes
);

// ============================================================
// 404
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
  (err, req, res, next) => {
    console.error(
      "GLOBAL ERROR:",
      err
    );

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal server error",
    });
  }
);

// ============================================================
// SERVER
// ============================================================

const PORT =
  process.env.PORT || 5000;

const HOST = "0.0.0.0";

app.listen(
  PORT,
  HOST,
  () => {
    console.log(
      "===================================="
    );

    console.log(
      "Jama Kharch API running"
    );

    console.log(
      `Port: ${PORT}`
    );

    console.log(
      `Host: ${HOST}`
    );

    console.log(
      `Environment: ${
        process.env.NODE_ENV ||
        "development"
      }`
    );

    console.log(
      "===================================="
    );
  }
);