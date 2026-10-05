const express = require("express");

const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require("../controllers/transactionController");

const router = express.Router();

// ============================================================
// SUMMARY
// ============================================================

router.get(
  "/summary",
  getSummary
);

// ============================================================
// CREATE
// ============================================================

router.post(
  "/",
  createTransaction
);

// ============================================================
// GET ALL
// ============================================================

router.get(
  "/",
  getTransactions
);

// ============================================================
// GET SINGLE
// ============================================================

router.get(
  "/:id",
  getTransactionById
);

// ============================================================
// UPDATE
// ============================================================

router.put(
  "/:id",
  updateTransaction
);

// ============================================================
// DELETE
// ============================================================

router.delete(
  "/:id",
  deleteTransaction
);

module.exports = router;