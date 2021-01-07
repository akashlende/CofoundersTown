// node modules
const mongoose = require("mongoose");

// mongoose models
const User = require("./models/user");
const Article = require("./models/article");
const Tag = require("./models/tag");
const TagsArticleRelation = require("./models/tagsArticleRelation");
const UserArticleRelation = require("./models/userArticleRelation");

// Singleton Class
class Database {
    static instance = null;
    constructor() {
        console.log("Database Instance Created");
        this.connect();
    }

    static getInstance() {
        if (this.instance === null) this.instance = new Database();
        return this.instance;
    }

    connect() {
        mongoose.connect("mongodb://localhost/articles-app", {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        mongoose.connection
            .once("open", () => {
                console.log("DB Connected");
            })
            .on("error", (err) => {
                console.log("DB Connection Error: " + err);
            });
    }

    // Users Collection
    users() {
        return {
            findById: (userId) => User.findById(userId),
        };
    }

    // Articles Collection
    articles() {
        return {
            find: () =>
                new Promise((resolve, reject) => {
                    Article.find({}, {}, { sort: { createdAt: -1 } }).exec((err, doc) => {
                        if (err) reject(err);
                        else resolve(doc);
                    });
                }),

            findById: (articleId) => Article.findById(articleId),

            create: (data) => Article.create(data),
        };
    }

    // Tags Collection
    tags() {
        return {
            findById: (tagId) => Tag.findById(tagId),

            findByName: (tagName) => Tag.findOne({ lowerCaseName: tagName.toLowerCase() }),

            create: (data) => Tag.create(data),
        };
    }

    // Tag Article Relation
    tagsArticleRelation() {
        return {
            findByArticleId: (articleId) => TagsArticleRelation.find({ articleId: articleId }),

            findByTagId: (tagId) => TagsArticleRelation.find({ tagId: tagId }),

            create: (tagId, articleId) =>
                TagsArticleRelation.create({ tagId: tagId, articleId: articleId }),
        };
    }

    // User Article Relation
    userArticleRelation() {
        return {
            findByArticleId: (articleId) => UserArticleRelation.findOne({ articleId: articleId }),

            findByUserId: (userId) => UserArticleRelation.find({ userId: userId }),

            create: (userId, articleId) =>
                UserArticleRelation.create({ userId: userId, articleId: articleId }),
        };
    }
}

module.exports = Database.getInstance();

/**
db.articles.find().pretty()
db.tags.find().pretty()
db.tags_article_relations.find().pretty()
db.user_article_relations.find().pretty()
db.users.find().pretty()

db.articles.drop()
db.tags.drop()
db.tags_article_relations.drop()
db.user_article_relations.drop()
db.users.drop()
 */
