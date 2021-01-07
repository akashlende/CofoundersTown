const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        article: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;
