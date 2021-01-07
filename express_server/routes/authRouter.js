const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

const authenticate = require("../database/auth/authentication");

const User = require("../database/models/user");

const authRouter = express.Router();
authRouter.use(bodyParser.json());

authRouter.post("/signup", (req, res) => {
    User.register(
        new User({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }),
        req.body.password,
        (err, _employee) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.send({ err: err, success: false });
            } else {
                passport.authenticate("local");

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.send({ success: true });
            }
        },
    );
});

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
        success: true,
        status: "Login Successful!",
        token: token,
        name: req.user.name,
        username: req.user.username,
    });
});

module.exports = authRouter;
