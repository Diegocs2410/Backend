const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

// connectDB
const connectDB = require("./config/db");

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;
// Routes
app.use("/api/users", require("./routes/user"));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
start();
