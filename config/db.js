const mongoose = require("mongoose");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    const connection = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(
      "MongoDB connection error:",
      error.message
    );

=======
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    const connection = await mongoose.connect(mongoUri);

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
>>>>>>> 8ec39e371648a631f3b074089060662c5e7eb406
    process.exit(1);
  }
};

module.exports = connectDB;