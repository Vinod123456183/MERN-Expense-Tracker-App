const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const cors = require("cors");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// const db = require("./config/mongoose-atlas-connection");
const db = require("./config/mongoose-atlas-connection.js");
const indexRouter = require("./routes/index-router");
const incomeRouter = require("./routes/income-router.js");
const expenseRouter = require("./routes/expense-router.js");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/auth-user", indexRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);

app.listen(process.env.PORT);

app.use((err, req, res, next) => {
  console.error(err.stack); // Optional: log the error stack for debugging
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/*
npm install -g npm-check-updates
ncu -u
npm install

*/
