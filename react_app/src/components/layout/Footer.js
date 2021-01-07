import React from "react";
import { Container } from "reactstrap";

const Footer = () => {
    return (
        <footer>
            <Container>
                <div style={{ fontSize: 16, marginTop: 40, marginBottom: 20 }}>
                    Made by <a href="https://www.linkedin.com/in/akashlende/">Akash Lende</a> for
                    CoFoundersTown assignment.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
