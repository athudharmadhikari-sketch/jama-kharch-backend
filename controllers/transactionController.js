const Transaction = require("../models/Transaction");
<<<<<<< HEAD

// ============================================================
// GENERATE REG NO
// ============================================================

const generateRegNo = async () => {
  const latest = await Transaction.findOne()
    .sort({ createdAt: -1 })
    .select("regNo");

  if (!latest || !latest.regNo) {
    return "01";
  }

  const number = parseInt(latest.regNo, 10) || 0;

  return String(number + 1).padStart(2, "0");
};

// ============================================================
// CREATE
// ============================================================

const createTransaction = async (req, res, next) => {
=======
const getNextRegNo = require("../utils/getNextRegNo");

// ============================================================
// CREATE TRANSACTION
// ============================================================

const createTransaction = async (req, res) => {
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  try {
    const {
      name,
      date,
      type,
      amount,
      status,
      transactionType,
    } = req.body;

<<<<<<< HEAD
=======
    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
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
<<<<<<< HEAD
          "Transaction type must be jama or kharch",
      });
    }

    if (!amount || Number(amount) <= 0) {
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

<<<<<<< HEAD
    const regNo = await generateRegNo();
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

    const transaction = await Transaction.create({
      regNo,
      name: name.trim(),
<<<<<<< HEAD
      date: date ? new Date(date) : new Date(),
      type: type || "Cash",
      amount: Number(amount),
      status: status || "Pending",
      transactionType,
    });

    res.status(201).json({
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
<<<<<<< HEAD
    next(error);
=======
    console.error("CREATE TRANSACTION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message,
    });
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  }
};

// ============================================================
<<<<<<< HEAD
// GET LIST
// ============================================================

const getTransactions = async (req, res, next) => {
=======
// GET ALL TRANSACTIONS
// ============================================================

const getTransactions = async (req, res) => {
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  try {
    const {
      transactionType,
      search,
      status,
      type,
    } = req.query;

    const filter = {};

<<<<<<< HEAD
    if (transactionType) {
      filter.transactionType = transactionType;
    }

    if (status) {
      filter.status = status;
    }

    if (type) {
      filter.type = type;
    }

=======
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

>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
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

<<<<<<< HEAD
    const transactions = await Transaction.find(filter)
      .sort({
        date: -1,
        createdAt: -1,
      });

    res.json({
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
<<<<<<< HEAD
    next(error);
=======
    console.error("GET TRANSACTIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  }
};

// ============================================================
<<<<<<< HEAD
// GET ONE
// ============================================================

const getTransactionById = async (
  req,
  res,
  next
) => {
  try {
    const transaction =
      await Transaction.findById(req.params.id);
=======
// GET SINGLE TRANSACTION
// ============================================================

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction =
      await Transaction.findById(id);
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

<<<<<<< HEAD
    res.json({
=======
    return res.status(200).json({
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
      success: true,
      data: transaction,
    });
  } catch (error) {
<<<<<<< HEAD
    next(error);
=======
    console.error(
      "GET TRANSACTION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction",
      error: error.message,
    });
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  }
};

// ============================================================
<<<<<<< HEAD
// UPDATE
// ============================================================

const updateTransaction = async (
  req,
  res,
  next
) => {
  try {
=======
// UPDATE TRANSACTION
// ============================================================

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
    const {
      name,
      date,
      type,
      amount,
      status,
    } = req.body;

    const transaction =
<<<<<<< HEAD
      await Transaction.findById(
        req.params.id
      );
=======
      await Transaction.findById(id);
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

<<<<<<< HEAD
    if (name !== undefined) {
      transaction.name = name.trim();
    }

    if (date !== undefined) {
      transaction.date = new Date(date);
    }

    if (type !== undefined) {
      transaction.type = type;
    }

    if (amount !== undefined) {
      transaction.amount = Number(amount);
    }

    if (status !== undefined) {
=======
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

>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
      transaction.status = status;
    }

    await transaction.save();

<<<<<<< HEAD
    res.json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  }
};

// ============================================================
<<<<<<< HEAD
// DELETE
// ============================================================

const deleteTransaction = async (
  req,
  res,
  next
) => {
  try {
    const transaction =
      await Transaction.findByIdAndDelete(
        req.params.id
      );
=======
// DELETE TRANSACTION
// ============================================================

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction =
      await Transaction.findById(id);
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

<<<<<<< HEAD
    res.json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
  }
};

// ============================================================
// SUMMARY
// ============================================================

<<<<<<< HEAD
const getSummary = async (
  req,
  res,
  next
) => {
  try {
    const result = await Transaction.aggregate([
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
=======
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
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406

    let jamaTotal = 0;
    let kharchTotal = 0;

    let jamaCount = 0;
    let kharchCount = 0;

<<<<<<< HEAD
    result.forEach((item) => {
=======
    for (const item of result) {
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
      if (item._id === "jama") {
        jamaTotal = item.total;
        jamaCount = item.count;
      }

      if (item._id === "kharch") {
        kharchTotal = item.total;
        kharchCount = item.count;
      }
<<<<<<< HEAD
    });

    res.json({
      success: true,
      data: {
        jamaTotal,
        kharchTotal,
        jamaCount,
        kharchCount,
        balance:
          jamaTotal - kharchTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};

=======
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

>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};