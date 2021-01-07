const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: 432000 });
};

let options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

exports.jwtPassport = passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
        console.log("JWT Payload: ", jwtPayload);
        User.findOne({ _id: jwtPayload._id }, (err, user) => {
            if (err) return done(err, false);
            else if (user) return done(null, user);
            else return done(null, false);
        });
    }),
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
