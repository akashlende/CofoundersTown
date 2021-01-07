import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default class LayoutDefault extends React.Component {
    render() {
        return (
            <>
                <Header />
                <main style={{ minHeight: window.innerHeight * 0.85 }}>{this.props.children}</main>
                <Footer />
            </>
        );
    }
}
