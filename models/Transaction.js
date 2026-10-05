const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
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

=======
    

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

   
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
    status: {
      type: String,
      enum: ["Pending", "Done"],
      
    },

<<<<<<< HEAD
    transactionType: {
      type: String,
      enum: ["jama", "kharch"],
      
=======
   
    transactionType: {
      type: String,
      enum: ["jama", "kharch"],
    
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
=======
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

>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);