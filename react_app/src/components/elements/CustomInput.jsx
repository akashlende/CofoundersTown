import React from "react";
import ReactDOM from "react-dom";
import { Input } from "reactstrap";

export default class CustomInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();

        this.state = {
            focus: false,
            selfHeight: 128,
        };

        this.increaseHeight = this.increaseHeight.bind(this);
    }

    increaseHeight(event) {
        this.setState({ selfHeight: 128 }, () => {
            this.setState({ selfHeight: this.inputRef.current.scrollHeight + 10 });
        });

        this.props.onChange(event);
    }

    render() {
        return (
            <Input
                innerRef={this.inputRef}
                style={{
                    border: "none",
                    borderBottom: this.state.focus ? "2px solid #5557db" : "1px solid #9CA9A4",
                    backgroundColor: "transparent",
                    borderRadius: 0,
                    color: "#a9a9a9",
                    margin: 14,
                    fontSize: 18,
                    width: "80%",
                    boxShadow: "unset",
                    height: this.props.isTextArea ? this.state.selfHeight : null,
                }}
                placeholder={this.props.placeholder}
                type={
                    this.props.isPassword ? "password" : this.props.isTextArea ? "textarea" : "text"
                }
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.isTextArea ? this.increaseHeight : this.props.onChange}
                onKeyDown={this.props.onKeyDown}
                onFocus={(e) => this.setState({ focus: true })}
                onBlur={(e) => this.setState({ focus: false })}
            ></Input>
        );
    }
}
