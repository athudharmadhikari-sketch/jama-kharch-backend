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
// LIST
// ============================================================

router.get(
  "/",
  getTransactions
);

// ============================================================
// GET ONE
// ============================================================

router.get(
  "/:id",
  getTransactionById
);

// ============================================================
// CREATE
// ============================================================

router.post(
  "/",
  createTransaction
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