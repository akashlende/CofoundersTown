// import modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const _ = require("./database/database");

require("dotenv").config();

// import routes
const authRouter = require("./routes/authRouter");
const articleRouter = require("./routes/articleRouter");
const userRouter = require("./routes/userRouter");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());

// routes
app.use("/auth", authRouter);
app.use("/articles", articleRouter);
app.use("/user", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
