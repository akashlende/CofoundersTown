import React from "react";
import { event } from "react-ga";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default class CustomSelectBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Input
                type="select"
                name={this.props.name}
                value={-1}
                onChange={(e) => {
                    this.props.onClick(e.target.value);
                }}
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                    color: "#5557DB",
                }}
            >
                <option value={-1} style={{ backgroundColor: "transparent" }} hidden disabled>
                    {this.props.text}
                </option>
                {this.props.options.map((option, i) => (
                    <option
                        key={`selectbox-option-${i}`}
                        name={this.props.name}
                        value={option}
                        style={{ color: "#333", backgroundColor: "transparent" }}
                    >
                        {option}
                    </option>
                ))}
            </Input>
        );
    }
}
