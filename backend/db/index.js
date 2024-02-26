const mongoose = require("mongoose");

// BhyG5jmm8d3ndlaF
const connect=async ()=> {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    console.error("Failed to connect to database. Shutting down application.");
    process.exit(1); 
  }
}

module.exports={connect}
