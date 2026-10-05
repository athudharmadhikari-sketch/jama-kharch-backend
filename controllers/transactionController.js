const Transaction = require("../models/Transaction");
const getNextRegNo = require("../utils/getNextRegNo");

// ============================================================
// CREATE TRANSACTION
// ============================================================

const createTransaction = async (req, res) => {
  try {
    const {
      name,
      date,
      type,
      amount,
      status,
      transactionType,
    } = req.body;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!transactionType) {
      return res.status(400).json({
        success: false,
        message: "Transaction type is required",
      });
    }

    if (!["jama", "kharch"].includes(transactionType)) {
      return res.status(400).json({
        success: false,
        message:
          "transactionType must be either jama or kharch",
      });
    }

    if (!type || !["Cash", "Online"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be Cash or Online",
      });
    }

    const numericAmount = Number(amount);

    if (
      amount === undefined ||
      amount === null ||
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    // --------------------------------------------------------
    // REG NO
    // --------------------------------------------------------

    const regNo = await getNextRegNo(transactionType);

    // --------------------------------------------------------
    // DATE
    // --------------------------------------------------------

    const transactionDate = date
      ? new Date(date)
      : new Date();

    if (Number.isNaN(transactionDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    // --------------------------------------------------------
    // CREATE
    // --------------------------------------------------------

    const transaction = await Transaction.create({
      regNo,
      name: name.trim(),
      date: transactionDate,
      type,
      amount: numericAmount,
      status:
        status && ["Pending", "Done"].includes(status)
          ? status
          : "Pending",
      transactionType,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("CREATE TRANSACTION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message,
    });
  }
};

// ============================================================
// GET ALL TRANSACTIONS
// ============================================================

const getTransactions = async (req, res) => {
  try {
    const {
      transactionType,
      search,
      status,
      type,
    } = req.query;

    const filter = {};

    // --------------------------------------------------------
    // JAMA / KHARCH FILTER
    // --------------------------------------------------------

    if (transactionType) {
      if (
        !["jama", "kharch"].includes(
          transactionType
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid transactionType",
        });
      }

      filter.transactionType = transactionType;
    }

    // --------------------------------------------------------
    // STATUS FILTER
    // --------------------------------------------------------

    if (status) {
      if (!["Pending", "Done"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      filter.status = status;
    }

    // --------------------------------------------------------
    // CASH / ONLINE
    // --------------------------------------------------------

    if (type) {
      if (!["Cash", "Online"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid type",
        });
      }

      filter.type = type;
    }

    // --------------------------------------------------------
    // SEARCH
    // --------------------------------------------------------

    if (search && search.trim()) {
      filter.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          regNo: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // --------------------------------------------------------
    // QUERY
    // --------------------------------------------------------

    const transactions =
      await Transaction.find(filter)
        .sort({
          date: -1,
          createdAt: -1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("GET TRANSACTIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

// ============================================================
// GET SINGLE TRANSACTION
// ============================================================

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction =
      await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error(
      "GET TRANSACTION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction",
      error: error.message,
    });
  }
};

// ============================================================
// UPDATE TRANSACTION
// ============================================================

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      date,
      type,
      amount,
      status,
    } = req.body;

    const transaction =
      await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // --------------------------------------------------------
    // NAME
    // --------------------------------------------------------

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }

      transaction.name = name.trim();
    }

    // --------------------------------------------------------
    // DATE
    // --------------------------------------------------------

    if (date !== undefined) {
      const newDate = new Date(date);

      if (Number.isNaN(newDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date",
        });
      }

      transaction.date = newDate;
    }

    // --------------------------------------------------------
    // TYPE
    // --------------------------------------------------------

    if (type !== undefined) {
      if (!["Cash", "Online"].includes(type)) {
        return res.status(400).json({
          success: false,
          message:
            "Type must be Cash or Online",
        });
      }

      transaction.type = type;
    }

    // --------------------------------------------------------
    // AMOUNT
    // --------------------------------------------------------

    if (amount !== undefined) {
      const numericAmount = Number(amount);

      if (
        Number.isNaN(numericAmount) ||
        numericAmount <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount",
        });
      }

      transaction.amount = numericAmount;
    }

    // --------------------------------------------------------
    // STATUS
    // --------------------------------------------------------

    if (status !== undefined) {
      if (!["Pending", "Done"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      transaction.status = status;
    }

    await transaction.save();

    return res.status(200).json({
      success: true,
      message:
        "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    console.error(
      "UPDATE TRANSACTION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update transaction",
      error: error.message,
    });
  }
};

// ============================================================
// DELETE TRANSACTION
// ============================================================

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction =
      await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await Transaction.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE TRANSACTION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
};

// ============================================================
// SUMMARY
// ============================================================

const getSummary = async (req, res) => {
  try {
    const result =
      await Transaction.aggregate([
        {
          $group: {
            _id: "$transactionType",
            total: {
              $sum: "$amount",
            },
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    let jamaTotal = 0;
    let kharchTotal = 0;

    let jamaCount = 0;
    let kharchCount = 0;

    for (const item of result) {
      if (item._id === "jama") {
        jamaTotal = item.total;
        jamaCount = item.count;
      }

      if (item._id === "kharch") {
        kharchTotal = item.total;
        kharchCount = item.count;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        jama: {
          total: jamaTotal,
          count: jamaCount,
        },

        kharch: {
          total: kharchTotal,
          count: kharchCount,
        },

        balance: jamaTotal - kharchTotal,
      },
    });
  } catch (error) {
    console.error(
      "SUMMARY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get summary",
      error: error.message,
    });
  }
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};