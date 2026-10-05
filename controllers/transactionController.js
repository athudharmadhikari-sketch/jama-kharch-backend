const Transaction = require("../models/Transaction");

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
  try {
    const {
      name,
      date,
      type,
      amount,
      status,
      transactionType,
    } = req.body;

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
          "Transaction type must be jama or kharch",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const regNo = await generateRegNo();

    const transaction = await Transaction.create({
      regNo,
      name: name.trim(),
      date: date ? new Date(date) : new Date(),
      type: type || "Cash",
      amount: Number(amount),
      status: status || "Pending",
      transactionType,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// GET LIST
// ============================================================

const getTransactions = async (req, res, next) => {
  try {
    const {
      transactionType,
      search,
      status,
      type,
    } = req.query;

    const filter = {};

    if (transactionType) {
      filter.transactionType = transactionType;
    }

    if (status) {
      filter.status = status;
    }

    if (type) {
      filter.type = type;
    }

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

    const transactions = await Transaction.find(filter)
      .sort({
        date: -1,
        createdAt: -1,
      });

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
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

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// UPDATE
// ============================================================

const updateTransaction = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      date,
      type,
      amount,
      status,
    } = req.body;

    const transaction =
      await Transaction.findById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

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
      transaction.status = status;
    }

    await transaction.save();

    res.json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
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

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// SUMMARY
// ============================================================

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

    let jamaTotal = 0;
    let kharchTotal = 0;

    let jamaCount = 0;
    let kharchCount = 0;

    result.forEach((item) => {
      if (item._id === "jama") {
        jamaTotal = item.total;
        jamaCount = item.count;
      }

      if (item._id === "kharch") {
        kharchTotal = item.total;
        kharchCount = item.count;
      }
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

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};