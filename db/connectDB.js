const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("✅DB Connected👍"))
    .catch(() => console.log("❌Something went wrong SORRY!!!💀"));
};

module.exports = connectDB;
