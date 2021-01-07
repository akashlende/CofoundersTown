const express = require("express");
const bodyParser = require("body-parser");

const database = require("../database/database");
const authenticate = require("../database/auth/authentication");

const articleRouter = express.Router();

articleRouter.use(bodyParser.json());

const parseDate = (date) => {
    const splits = date.toString().split(" ");
    const timeSplits = splits[4].split(":");

    const isAm = parseInt(timeSplits[0]) <= 12 ? true : false;
    const hour = isAm ? timeSplits[0] : "" + (parseInt(timeSplits[0]) - 12);
    const time = hour + ":" + timeSplits[1] + (isAm ? "AM" : "PM");
    console.log(time);
    return splits[0] + " " + splits[1] + " " + splits[2] + " " + splits[3] + " " + time;
};

articleRouter.get("/all", (req, res) => {
    database
        .articles()
        .find()

        // Step 1. Fetch articles
        // Step 2. Fetch tag Ids using the article Id
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .tagsArticleRelation()
                            .findByArticleId(article._id)
                            .then((relations) => {
                                resolve({
                                    id: article._id,
                                    title: article.title,
                                    article: article.article,
                                    createdAt: parseDate(article.createdAt),
                                    updatedAt: parseDate(article.updatedAt),
                                    tags: relations.map((relation) => relation.tagId),
                                });
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })

        // Step 3. Fetch tags
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                let tags = [];
                promises.push(
                    new Promise((rslv, rej) => {
                        for (let j = 0; j < article.tags.length; j++) {
                            const tagId = article.tags[j];

                            console.log(tagId);
                            tags.push(
                                new Promise((resolve, reject) => {
                                    database
                                        .tags()
                                        .findById(tagId)
                                        .then((tag) => {
                                            resolve({ id: tag._id, name: tag.name });
                                        })
                                        .catch((err) => reject(err));
                                }),
                            );
                        }

                        Promise.all(tags)
                            .then((tags) => {
                                rslv({
                                    ...article,
                                    tags: tags,
                                });
                            })
                            .catch((err) => rej(err));
                    }),
                );
            }

            return Promise.all(promises);
        })

        // Step 4. Fetch user for each article
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .userArticleRelation()
                            .findByArticleId(article.id)
                            .then((relation) => {
                                const userId = relation.userId;
                                database
                                    .users()
                                    .findById(userId)
                                    .then((user) => {
                                        resolve({
                                            ...article,
                                            author: {
                                                id: user._id,
                                                username: user.username,
                                                name: user.name,
                                            },
                                        });
                                    });
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({ articles: articles });
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.send({ err: err });
        });
});

articleRouter.get("/tag", (req, res) => {
    database
        .tags()
        .findByName(req.query.name)
        .then((tag) => {
            return new Promise((resolve, reject) => {
                if (tag === null) resolve([]);
                database
                    .tagsArticleRelation()
                    .findByTagId(tag._id)
                    .then((relations) => {
                        const articleIds = relations.map((relation) => relation.articleId);

                        let promises = [];
                        for (let i = 0; i < articleIds.length; i++) {
                            const articleId = articleIds[i];

                            promises.push(database.articles().findById(articleId));
                        }

                        Promise.all(promises).then((articles) => resolve(articles));
                    });
            });
        })
        .then((articles) => {
            console.log(articles);

            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .tagsArticleRelation()
                            .findByArticleId(article._id)
                            .then((relations) => {
                                resolve({
                                    id: article._id,
                                    title: article.title,
                                    article: article.article,
                                    createdAt: parseDate(article.createdAt),
                                    updatedAt: parseDate(article.updatedAt),
                                    tags: relations.map((relation) => relation.tagId),
                                });
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })

        // Step 3. Fetch tags
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                let tags = [];
                promises.push(
                    new Promise((rslv, rej) => {
                        for (let j = 0; j < article.tags.length; j++) {
                            const tagId = article.tags[j];

                            console.log(tagId);
                            tags.push(
                                new Promise((resolve, reject) => {
                                    database
                                        .tags()
                                        .findById(tagId)
                                        .then((tag) => {
                                            resolve({ id: tag._id, name: tag.name });
                                        })
                                        .catch((err) => reject(err));
                                }),
                            );
                        }

                        Promise.all(tags)
                            .then((tags) => {
                                rslv({
                                    ...article,
                                    tags: tags,
                                });
                            })
                            .catch((err) => rej(err));
                    }),
                );
            }

            return Promise.all(promises);
        })

        // Step 4. Fetch user for each article
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .userArticleRelation()
                            .findByArticleId(article.id)
                            .then((relation) => {
                                const userId = relation.userId;
                                database
                                    .users()
                                    .findById(userId)
                                    .then((user) => {
                                        resolve({
                                            ...article,
                                            author: {
                                                id: user._id,
                                                username: user.username,
                                                name: user.name,
                                            },
                                        });
                                    });
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({ articles: articles });
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.send({ err: err });
        });
});

articleRouter.post("/publish", authenticate.verifyUser, (req, res) => {
    const article = req.body.article;
    const tags = req.body.tags;
    let articleId = "";

    database
        .articles()

        // Step 1. Create article
        .create({
            title: req.body.title,
            article: article,
        })

        // Step 2. Add relation for article and user
        .then((article) => {
            articleId = article._id;
            return database.userArticleRelation().create(req.user._id, article._id);
        })

        // Step 3. Add tags if already not exist in Tags Collection
        .then(() => {
            let promises = [];

            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .tags()
                            .findByName(tag)
                            .then((dbTag) => {
                                if (dbTag !== null) resolve(dbTag._id);
                                else {
                                    database
                                        .tags()
                                        .create({
                                            name: tag,
                                            lowerCaseName: tag.toLowerCase(),
                                        })
                                        .then((tag) => {
                                            resolve(tag._id);
                                        });
                                }
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })

        // Step 4. Add relation for tag and article
        .then((tagIds) => {
            let promises = [];

            for (let i = 0; i < tagIds.length; i++) {
                const tagId = tagIds[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .tagsArticleRelation()
                            .create(tagId, articleId)
                            .then((relation) => {
                                resolve();
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })
        .then(() => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({ status: "success" });
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.send({ err: err });
        });
});

articleRouter.get("/user", authenticate.verifyUser, (req, res) => {
    database
        .userArticleRelation()
        .findByUserId(req.user._id)
        .then((relations) => {
            const articleIds = relations.map((relation) => relation.articleId);

            let promises = [];
            for (let i = 0; i < articleIds.length; i++) {
                const articleId = articleIds[i];

                promises.push(database.articles().findById(articleId));
            }

            return Promise.all(promises);
        })
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .tagsArticleRelation()
                            .findByArticleId(article._id)
                            .then((relations) => {
                                resolve({
                                    id: article._id,
                                    title: article.title,
                                    article: article.article,
                                    createdAt: parseDate(article.createdAt),
                                    updatedAt: parseDate(article.updatedAt),
                                    tags: relations.map((relation) => relation.tagId),
                                });
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })

        // Step 3. Fetch tags
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                let tags = [];
                promises.push(
                    new Promise((rslv, rej) => {
                        for (let j = 0; j < article.tags.length; j++) {
                            const tagId = article.tags[j];

                            console.log(tagId);
                            tags.push(
                                new Promise((resolve, reject) => {
                                    database
                                        .tags()
                                        .findById(tagId)
                                        .then((tag) => {
                                            resolve({ id: tag._id, name: tag.name });
                                        })
                                        .catch((err) => reject(err));
                                }),
                            );
                        }

                        Promise.all(tags)
                            .then((tags) => {
                                rslv({
                                    ...article,
                                    tags: tags,
                                });
                            })
                            .catch((err) => rej(err));
                    }),
                );
            }

            return Promise.all(promises);
        })

        // Step 4. Fetch user for each article
        .then((articles) => {
            let promises = [];

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];

                promises.push(
                    new Promise((resolve, reject) => {
                        database
                            .userArticleRelation()
                            .findByArticleId(article.id)
                            .then((relation) => {
                                const userId = relation.userId;
                                database
                                    .users()
                                    .findById(userId)
                                    .then((user) => {
                                        resolve({
                                            ...article,
                                            author: {
                                                id: user._id,
                                                username: user.username,
                                                name: user.name,
                                            },
                                        });
                                    });
                            });
                    }),
                );
            }

            return Promise.all(promises);
        })
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({ articles: articles });
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.send({ err: err });
        });
});

module.exports = articleRouter;
