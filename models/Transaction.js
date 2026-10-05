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

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);