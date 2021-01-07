const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../database/auth/authentication");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.get("/info", authenticate.verifyUser, (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send({
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        age: req.user.age,
    });
});

module.exports = userRouter;
