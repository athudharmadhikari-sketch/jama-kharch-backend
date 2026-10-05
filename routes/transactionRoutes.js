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
<<<<<<< HEAD
// LIST
=======
// CREATE
// ============================================================

router.post(
  "/",
  createTransaction
);

// ============================================================
// GET ALL
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
// ============================================================

router.get(
  "/",
  getTransactions
);

// ============================================================
<<<<<<< HEAD
// GET ONE
=======
// GET SINGLE
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
// ============================================================

router.get(
  "/:id",
  getTransactionById
);

// ============================================================
<<<<<<< HEAD
// CREATE
// ============================================================

router.post(
  "/",
  createTransaction
);

// ============================================================
=======
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
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