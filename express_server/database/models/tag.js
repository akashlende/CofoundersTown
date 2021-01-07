const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lowerCaseName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Tag = mongoose.model("tag", TagSchema);

module.exports = Tag;
