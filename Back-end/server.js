const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const connection = require("./models/db");
const router = require("./routes/routes");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
const port = 3010;

app.use("/", router.router);

//Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methodss", "POST,GET,OPTIONS,UPDATE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methodss",
      "POST,GET,OPTIONS,UPDATE,PUT,Delete"
    );
    return res.status(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//bodyparser to help pass incoming and outgoing req

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
