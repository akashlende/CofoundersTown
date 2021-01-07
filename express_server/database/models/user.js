const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", UserSchema);

module.exports = User;
