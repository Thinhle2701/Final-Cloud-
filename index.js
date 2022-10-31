const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const user = require("./model/user");
const cart = require("./model/cart");
const ordeer = require("./model/order");
const swaggerUI = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Router } = require("express");
const fs = require("fs");

app.use(express.json());
app.use(express.static(__dirname));
mongoose.connect(
  "mongodb+srv://thinh:123@cluster0.ydjcp.mongodb.net/EcommerceWebsite",
  (err) => {
    if (!err) console.log("db connected");
    else console.log("db error");
  }
);

var cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/ecommerce", function (req, res) {
  res.send("Ecommerce Website");
});
app.get("/hello", function (req, res) {
  res.send("Hello Website");
});

const userRouter = require(__dirname + "/controller/user");
app.use("/api/user", userRouter);

const cartRouter = require(__dirname + "/controller/cart");
app.use("/api/cart", cartRouter);

const orderRouter = require(__dirname + "/controller/order");
app.use("/api/order", orderRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT || 8000, () =>
  console.log("Listening Port 8000...")
);
