const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsArticleRelationSchema = new Schema(
    {
        tagId: {
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

const TagsArticleRelation = mongoose.model("tags_article_relation", TagsArticleRelationSchema);

module.exports = TagsArticleRelation;
