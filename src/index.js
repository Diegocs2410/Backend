const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
};
start();
