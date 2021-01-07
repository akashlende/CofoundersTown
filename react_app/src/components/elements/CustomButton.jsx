import React from "react";
import { Button } from "reactstrap";

export default class CustomInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        };
    }
    render() {
        return (
            <Button
                outline
                color="primary"
                style={{
                    border: "3px solid #5557db",
                    color: this.state.hover ? "#fff" : "#5557db",
                    backgroundColor: this.state.hover ? "#5557db" : "transparent",
                }}
                onMouseEnter={(e) => this.setState({ hover: true })}
                onMouseLeave={(e) => this.setState({ hover: false })}
                onClick={this.props.onClick}
            >
                {this.props.content}
            </Button>
        );
    }
}
