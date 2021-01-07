import React from "react";
import axios from "axios";
import { Container } from "reactstrap";

import ArticleCard from "../components/elements/ArticleCard";

import config from "../config";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] };
    }

    componentDidMount() {
        const request = {
            method: "get",
            url: `${config.domain}/articles/all`,
            headers: {},
        };

        axios(request)
            .then((response) => {
                this.setState({ articles: response.data.articles });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <Container style={{ marginTop: 120 }}>
                    <h3>Articles</h3>
                    {this.state.articles.map((article, i) => {
                        return (
                            <ArticleCard
                                key={`article-card-${i}`}
                                title={article.title}
                                author={article.author.name}
                                article={article.article}
                                tags={article.tags.map((tag) => tag.name)}
                                createdAt={article.createdAt}
                            />
                        );
                    })}
                </Container>
            </>
        );
    }
}
