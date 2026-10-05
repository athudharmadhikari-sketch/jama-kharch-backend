const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    

    regNo: {
      type: String,
     
      trim: true,
    },

    // --------------------------------------------------------
    // NAME
    // --------------------------------------------------------

    name: {
      type: String,
  
      trim: true,
    },

    // --------------------------------------------------------
    // DATE
    // --------------------------------------------------------

    date: {
      type: Date,
    
    },

    // --------------------------------------------------------
    // CASH / ONLINE
    // --------------------------------------------------------

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

// ============================================================
// INDEX
// ============================================================

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