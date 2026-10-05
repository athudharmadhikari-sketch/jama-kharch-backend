const Transaction = require("../models/Transaction");

const getNextRegNo = async (transactionType) => {
  const lastTransaction = await Transaction.findOne({
    transactionType,
  })
    .sort({ createdAt: -1 })
    .lean();

  if (!lastTransaction) {
    return "01";
  }

  const lastNumber =
    parseInt(lastTransaction.regNo, 10) || 0;

  return String(lastNumber + 1).padStart(2, "0");
};

module.exports = getNextRegNo;