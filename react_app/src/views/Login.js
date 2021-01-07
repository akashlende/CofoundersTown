import React from "react";
import { Row, Col, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import LoginImage from "../assets/images/login.png";
import CustomInput from "../components/elements/CustomInput";
import CustomButton from "../components/elements/CustomButton";

import logo from "../assets/images/logo.svg";
import config from "../config";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginScreen: true,
            name: "",
            username: "",
            email: "",
            password: "",
            age: "",
            isLoading: false,
            errorMessage: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errorMessage: null });
    };

    login() {
        this.setState({ isLoading: true, loadingMessage: " Logging In" });
        const data = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        });

        const request = {
            method: "post",
            url: `${config.domain}/auth/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(request)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("username", response.data.username);
                this.setState({ isLoading: false });
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    errorMessage: "Invalid username or password",
                });
            });
    }

    signup() {
        this.setState({ isLoading: true, loadingMessage: " Creating account" });
        const data = JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            age: this.state.age,
            password: this.state.password,
        });

        const request = {
            method: "post",
            url: `${config.domain}/auth/signup`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(request)
            .then((response) => {
                this.login();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    errorMessage: "Creating new account failed. Try again later.",
                });
            });
    }

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: window.innerWidth,
                    minHeight: window.innerHeight,
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: 700,
                        maxWidth: window.innerWidth * 0.9,
                        border: "3px solid #5557db",
                        borderRadius: 7,
                        padding: 30,
                    }}
                >
                    <Row>
                        <Col sm="12">
                            <center>
                                <Link to="/">
                                    <img src={logo} width={150}></img>
                                </Link>
                            </center>
                        </Col>
                        <Col sm="12" xl="6" style={{ display: "flex", alignItems: "center" }}>
                            <center>
                                <img src={LoginImage} className="img-responsive"></img>
                            </center>
                        </Col>
                        <Col sm="12" xl="6">
                            <div
                                style={{
                                    textAlign: "center",
                                    color: "#5557db",
                                    fontWeight: "normal",
                                    fontSize: 32,
                                }}
                            >
                                {this.state.isLoginScreen ? "Login" : "Signup"}
                            </div>
                            <div
                                style={{
                                    textAlign: "center",
                                    fontWeight: "normal",
                                    fontSize: 18,
                                }}
                            >
                                {this.state.isLoginScreen ? (
                                    "Continue to Personal Profile"
                                ) : (
                                    <span>
                                        Create an <Link to="/">Articles App</Link> Account
                                    </span>
                                )}
                            </div>
                            <center>
                                <div style={{ marginTop: 18 }}>
                                    <CustomInput
                                        placeholder="Username"
                                        isPassword={false}
                                        value={this.state.username}
                                        name="username"
                                        onChange={this.handleChange}
                                    />
                                    {this.state.isLoginScreen ? null : (
                                        <>
                                            <CustomInput
                                                placeholder="Name"
                                                isPassword={false}
                                                value={this.state.name}
                                                name="name"
                                                onChange={this.handleChange}
                                            />
                                            <CustomInput
                                                placeholder="email@example.com"
                                                isPassword={false}
                                                value={this.state.email}
                                                name="email"
                                                onChange={this.handleChange}
                                            />
                                            <CustomInput
                                                placeholder="Age"
                                                isPassword={false}
                                                value={this.state.age}
                                                name="age"
                                                onChange={this.handleChange}
                                            />
                                        </>
                                    )}

                                    <CustomInput
                                        placeholder="********"
                                        isPassword={true}
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div style={{ fontSize: 14, width: "80%", textAlign: "left" }}>
                                    {this.state.isLoginScreen ? (
                                        <span>
                                            Not registered?{" "}
                                            <a
                                                href=""
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        isLoginScreen: false,
                                                        errorMessage: null,
                                                    });
                                                }}
                                            >
                                                Sign Up
                                            </a>{" "}
                                            now
                                        </span>
                                    ) : (
                                        <span>
                                            Already have an account?{" "}
                                            <a
                                                href=""
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        isLoginScreen: true,
                                                        errorMessage: null,
                                                    });
                                                }}
                                            >
                                                Login
                                            </a>
                                            .
                                        </span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        width: "80%",
                                        textAlign: "left",
                                        color: "#f05454",
                                    }}
                                >
                                    {this.state.errorMessage}
                                </div>
                                <div style={{ marginTop: 24 }}>
                                    {this.state.isLoading ? (
                                        <span>
                                            <Spinner color="secondary" size="sm" />
                                            {this.state.loadingMessage}
                                        </span>
                                    ) : this.state.isLoginScreen ? (
                                        <CustomButton
                                            content="Log In ➜"
                                            onClick={(e) => this.login()}
                                        />
                                    ) : (
                                        <CustomButton
                                            content="Sign Up ➜"
                                            onClick={(e) => this.signup()}
                                        />
                                    )}
                                </div>
                            </center>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
