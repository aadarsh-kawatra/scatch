const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const db = require("./config/connect");
const rootRouter = require("./routes/index");
const ownerRouter = require("./routes/owner-router");
const userRouter = require("./routes/user-router");
const productRouter = require("./routes/product-router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
app.set("view engine", "ejs");

const port = 8000;

app.use("/", rootRouter);
app.use("/owner", ownerRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
