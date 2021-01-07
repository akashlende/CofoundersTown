const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserArticleRelationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        articleId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const UserArticleRelation = mongoose.model("user_article_relation", UserArticleRelationSchema);

module.exports = UserArticleRelation;
