import React from "react";
import { Container, Row, Spinner } from "reactstrap";
import axios from "axios";

import CustomInput from "../components/elements/CustomInput";
import TagChip from "../components/elements/TagChips";
import CustomButton from "../components/elements/CustomButton";
import config from "../config";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            article: "",
            tags: [],
            tagValue: "",
            isLoading: false,
            successText: null,
            errorText: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTagKeyDown = this.handleTagKeyDown.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
        this.publish = this.publish.bind(this);
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
            .then((response) => {})
            .catch((error) => {
                this.props.history.push("/");
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            successText: null,
            errorText: null,
        });
    };

    handleTagKeyDown = (event) => {
        if (event.keyCode === 13) {
            let tags = this.state.tags;
            if (this.state.tagValue !== "" && !this.state.tags.includes(this.state.tagValue))
                tags.push(this.state.tagValue);
            this.setState({ tagValue: "", tags: tags });
        }
    };

    handleTagClick = (_event, content) => {
        let tags = this.state.tags.filter((tag) => tag !== content);
        this.setState({ tags: tags });
    };

    publish() {
        const data = JSON.stringify({
            title: this.state.title,
            article: this.state.article,
            tags: this.state.tags,
        });

        console.log(data);

        const request = {
            method: "post",
            url: `${config.domain}/articles/publish`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(request)
            .then((response) => {
                this.setState(
                    {
                        isLoading: false,
                        successText: "✔ The article has been published",
                    },
                    () => {
                        setTimeout(() => {
                            this.props.history.push("/");
                        }, 2000);
                    },
                );
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    errorText: "✘ Published the article failed. Try again after sometime",
                });
            });
    }

    render() {
        return (
            <>
                <Container style={{ marginTop: 120 }}>
                    <h3>Publish an article</h3>

                    <Row>
                        <CustomInput
                            placeholder="Title: An experimental approach to verify ..."
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </Row>
                    <Row>
                        <CustomInput
                            placeholder="Article"
                            isTextArea={true}
                            name="article"
                            value={this.state.article}
                            onChange={this.handleChange}
                        />
                    </Row>
                    <Row>
                        <div>
                            <CustomInput
                                placeholder="Add tags"
                                name="tagValue"
                                value={this.state.tagValue}
                                onChange={this.handleChange}
                                onKeyDown={this.handleTagKeyDown}
                            />
                        </div>
                        <div
                            style={{
                                width: "60%",
                                display: "flex",
                                flexWrap: "wrap",
                            }}
                        >
                            {this.state.tags.length === 0 ? (
                                <div
                                    style={{
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                        fontSize: 14,
                                    }}
                                >
                                    Enter tag and press enter key
                                </div>
                            ) : null}
                            {this.state.tags.map((tag) => (
                                <TagChip content={tag} onClick={this.handleTagClick} />
                            ))}
                        </div>
                    </Row>
                    <Row>{this.state.errorText}</Row>
                    {this.state.successText !== null ? (
                        <span style={{ color: "#009532" }}>{this.state.successText}</span>
                    ) : this.state.isLoading ? (
                        <span>
                            <Spinner color="secondary" size="sm" /> Publishing the article
                        </span>
                    ) : (
                        <Row style={{ marginTop: 40 }}>
                            <CustomButton content={"Publish ➜"} onClick={this.publish} />
                        </Row>
                    )}
                </Container>
            </>
        );
    }
}
