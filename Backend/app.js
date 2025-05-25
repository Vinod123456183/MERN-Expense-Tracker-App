const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Middleware Setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration
app.use(
  cors({
    origin: "https://roaring-frangollo-54814f.netlify.app", // ✅ Your Netlify frontend URL
    credentials: true, // ✅ Allow sending cookies
  })
);

// ✅ View Engine (Optional if you're using EJS)
app.set("view engine", "ejs");

// ✅ MongoDB and Routes
const db = require("./config/mongoose-atlas-connection.js");
const indexRouter = require("./routes/index-router");
const incomeRouter = require("./routes/income-router.js");
const expenseRouter = require("./routes/expense-router.js");

app.use("/auth-user", indexRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend is live ✅");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
 app.listen(process.env.PORT);
