var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var companyRouter = require("./routes/company");
var staffRouter = require("./routes/staff");
var productRouter = require("./routes/product");

var app = express();

mongoose.connect(
  "mongodb+srv://admin:1234@cluster0.fcgv65e.mongodb.net/onlinetest?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Connection error:", err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/company", companyRouter);
app.use("/staff", staffRouter);
app.use("/product", productRouter);

module.exports = app;
