import React from "react";

export default class TagChip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mouse: false,
        };
    }

    render() {
        return (
            <span
                style={{
                    border: this.state.mouse ? "2px solid #f05454" : `2px solid #5557db`,
                    backgroundColor: this.state.mouse ? "#f05454" : null,
                    opacity: 1,
                    color: this.state.mouse ? "#fff" : "#5557db",
                    paddingLeft: 26,
                    paddingRight: 12,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 18,
                    borderRadius: 25,
                    margin: 4,
                    cursor: "pointer",
                    maxHeight: 32,
                }}
                onClick={(e) => this.props.onClick(e, this.props.content)}
                onMouseEnter={(e) => this.setState({ mouse: true })}
                onMouseLeave={(e) => this.setState({ mouse: false })}
            >
                {this.props.content}{" "}
                <span style={{ color: this.state.mouse ? "#fff" : "transparent" }}>✘</span>
            </span>
        );
    }
}
