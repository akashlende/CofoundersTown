import React from "react";
import { Container, Row } from "reactstrap";
import axios from "axios";

import config from "../config";
import ArticleCard from "../components/elements/ArticleCard";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            age: "",
            articles: [],
        };
    }

    componentDidMount() {
        const request1 = {
            method: "get",
            url: `${config.domain}/articles/user`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios(request1)
            .then((response) => {
                this.setState({ articles: response.data.articles });
            })
            .catch((error) => {
                this.props.history.push("/");
            });

        const request2 = {
            method: "get",
            url: `${config.domain}/user/info`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios(request2)
            .then((response) => {
                this.setState({
                    name: response.data.name,
                    username: response.data.username,
                    email: response.data.email,
                    age: response.data.age,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state);
        return (
            <>
                <Container style={{ marginTop: 120 }}>
                    <h1 style={{ margin: 0 }}>
                        <span style={{ color: "#5557DB" }}>{this.state.name.split(" ")[0]}</span>{" "}
                        <span>
                            {this.state.name
                                .split(" ")
                                .filter((e, i) => i !== 0)
                                .join(" ")}
                        </span>
                    </h1>
                    <div>@{this.state.username}</div>

                    <div style={{ marginTop: 24 }}>Email: {this.state.email}</div>
                    <div>Age: {this.state.age}</div>
                    <div>Articles Published: {this.state.articles.length}</div>
                    <div style={{ marginTop: 38 }}>
                        <h3>My Articles</h3>
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
                    </div>
                </Container>
            </>
        );
    }
}
