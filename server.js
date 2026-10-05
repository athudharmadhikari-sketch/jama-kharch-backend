const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");

<<<<<<< HEAD
dotenv.config();

=======
// ============================================================
// ENVIRONMENT
// ============================================================

dotenv.config();

// ============================================================
// APP
// ============================================================

>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
const app = express();

// ============================================================
// DATABASE
// ============================================================

connectDB();

// ============================================================
<<<<<<< HEAD
// MIDDLEWARE
=======
// CORS
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
// ============================================================

app.use(
  cors({
    origin: "*",
<<<<<<< HEAD
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

// ============================================================
// ROOT
// ============================================================

app.get("/", (req, res) => {
<<<<<<< HEAD
  res.json({
    success: true,
    message: "Jama Kharch API is running",
    version: "1.0.0",
=======
  res.status(200).json({
    success: true,
    message: "Jama Kharch API is running",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV || "development",
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  });
});

// ============================================================
<<<<<<< HEAD
// HEALTH
// ============================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    date: new Date(),
=======
// HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    date: new Date().toISOString(),
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  });
});

// ============================================================
<<<<<<< HEAD
// TRANSACTIONS
// ============================================================

app.use("/api/transactions", transactionRoutes);
=======
// TRANSACTION ROUTES
// ============================================================

app.use(
  "/api/transactions",
  transactionRoutes
);
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

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
<<<<<<< HEAD
// ERROR
// ============================================================

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

// ============================================================
// SERVER
// ============================================================

<<<<<<< HEAD
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("====================================");
  console.log("Jama Kharch API running");
  console.log(`Port: ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log("====================================");
});
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
