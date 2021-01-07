import React from "react";
import axios from "axios";
import { Container } from "reactstrap";

import ArticleCard from "../components/elements/ArticleCard";

import config from "../config";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [], tagName: "", href: window.location.href };

        const url = window.location.href.split("/");
        if (url.length >= 2 && url[url.length - 2] === "tags")
            this.state.tagName = url[url.length - 1].replace("%20", " ");

        this.getArticles = this.getArticles.bind(this);
        this.chipClick = this.chipClick.bind(this);
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles() {
        const request = {
            method: "get",
            url: `${config.domain}/articles/tag?name=${this.state.tagName}`,
            headers: {},
        };

        axios(request)
            .then((response) => {
                console.log("asdasd");
                this.setState({ articles: response.data.articles });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    chipClick(tagName) {
        console.log(tagName);
        this.setState({ tagName: tagName }, () => {
            this.getArticles();
        });
    }

    render() {
        return (
            <>
                <Container style={{ marginTop: 120 }}>
                    <h3>#{this.state.tagName}</h3>
                    {this.state.articles.map((article, i) => {
                        return (
                            <ArticleCard
                                key={`article-card-${i}`}
                                title={article.title}
                                author={article.author.name}
                                article={article.article}
                                tags={article.tags.map((tag) => tag.name)}
                                createdAt={article.createdAt}
                                chipClick={this.chipClick}
                            />
                        );
                    })}
                </Container>
            </>
        );
    }
}
