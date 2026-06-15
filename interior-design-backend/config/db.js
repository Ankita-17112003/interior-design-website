const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(mongoose.connection.readyState);
  } catch (err) {
    console.log("Something Went Wrong in db connection", err);
    console.log(mongoose.connection.readyState);
  }
};
connection()

module.exports = connection
