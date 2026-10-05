const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
    },

    type: {
      type: String,
      enum: ["Cash", "Online"],
    },

    amount: {
      type: Number,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Done"],
      default: "Pending",
    },

    transactionType: {
      type: String,
      enum: ["jama", "kharch"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
transactionSchema.index({
  transactionType: 1,
  regNo: 1,
});

transactionSchema.index({
  transactionType: 1,
  date: -1,
});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);