import React from "react";
import { Card, CardTitle, CardBody, CardFooter, Container, Row, Col } from "reactstrap";
import Chip from "../elements/Chip";

const styles = {
    card: {},
};

export default class ArticleCardMini extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mouse: false, article: "", shrinken: true };

        this.state.article = this.props.article.substring(0, 300) + " ...";
        this.screenSize = window.innerWidth < 425 ? "sm" : "lg";
        this.state.tags = this.props.tags.map((tag, i) => {
            return <Chip key={`tag-chip-${i}`} content={tag} chipClick={this.props.chipClick} />;
        });

        this.resizeArticle = this.resizeArticle.bind(this);
    }

    resizeArticle() {
        if (this.state.shrinken) {
            this.setState({
                article: this.props.article,
                mouse: false,
                shrinken: false,
            });
        }
    }

    render() {
        return (
            <div
                style={{
                    border: "1px solid #444",
                    borderRadius: 8,
                    padding: 14,
                    marginTop: 10,
                    marginBottom: 20,
                    background: this.state.mouse ? "#333" : null,
                    cursor: this.state.mouse ? "pointer" : null,
                }}
                onMouseEnter={(e) => (this.state.shrinken ? this.setState({ mouse: true }) : null)}
                onMouseLeave={(e) => this.setState({ mouse: false })}
                onClick={this.resizeArticle}
            >
                <div>
                    <span
                        style={{ fontSize: 42, display: this.screenSize === "sm" ? "block" : null }}
                    >
                        <span style={{ color: "#5557DB" }}>{this.props.title.split(" ")[0]}</span>{" "}
                        <span>
                            {this.props.title
                                .split(" ")
                                .filter((e, i) => i !== 0)
                                .join(" ")}
                        </span>
                    </span>
                    <span style={{ fontSize: 18 }}> By {this.props.author} 🖋</span>
                </div>
                <div style={{ marginTop: 16, marginBottom: 16 }}>{this.state.article}</div>
                <div>
                    <div
                        style={{
                            width: "60%",
                            display: this.state.shrinken ? "none" : "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {this.state.tags}
                    </div>
                    <div
                        style={{
                            display: "block",
                            textAlign: "right",
                            fontSize: 18,
                            color: "#5557DB",
                        }}
                    >
                        📅 {this.props.createdAt}
                    </div>
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: 12,
                            display: this.state.shrinken ? "none" : null,
                        }}
                    >
                        <a
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    article: this.props.article.substring(0, 300) + " ...",
                                    shrinken: true,
                                });
                            }}
                            style={{ textAlign: "center" }}
                        >
                            &#8593; Shrink Article
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
