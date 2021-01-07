import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomSelectBox from "../elements/CustomSelectBox";

const defaultProps = {};

const Header = ({ ...props }) => {
    const [isActive, setIsactive] = useState(false);
    let history = useHistory();

    const nav = useRef(null);
    const hamburger = useRef(null);

    useEffect(() => {
        isActive && openMenu();
        document.addEventListener("keydown", keyPress);
        document.addEventListener("click", clickOutside);
        return () => {
            document.removeEventListener("keydown", keyPress);
            document.removeEventListener("click", clickOutside);
            closeMenu();
        };
    });

    const openMenu = () => {
        document.body.classList.add("off-nav-is-active");
        nav.current.style.maxHeight = nav.current.scrollHeight + "px";
        setIsactive(true);
    };

    const closeMenu = () => {
        document.body.classList.remove("off-nav-is-active");
        nav.current && (nav.current.style.maxHeight = null);
        setIsactive(false);
    };

    const keyPress = (e) => {
        isActive && e.keyCode === 27 && closeMenu();
    };

    const clickOutside = (e) => {
        if (!nav.current) return;
        if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
        closeMenu();
    };

    const handleClick = (option) => {
        console.log(option);
        if (option === "Log out") {
            localStorage.removeItem("name");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            history.push("/");
        } else if (option === "Publish New Article") {
            history.push("/publish");
        } else if (option === "My Profile") {
            history.push(`/user/${localStorage.getItem("username")}`);
        }
    };

    return (
        <header {...props} className="site-header reveal-from-bottom">
            <div className="container">
                <div className="site-header-inner">
                    <div>
                        <h1 className="m-0">
                            <Link to="/">
                                <img
                                    src={require("./../../assets/images/logo.svg")}
                                    alt="Open"
                                    width={132}
                                    height={132}
                                />
                            </Link>
                        </h1>
                    </div>
                    <>
                        <button
                            ref={hamburger}
                            className="header-nav-toggle"
                            onClick={isActive ? closeMenu : openMenu}
                        >
                            <span className="screen-reader">Menu</span>
                            <span className="hamburger">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>

                        <nav ref={nav} className={`header-nav ${isActive ? "is-active" : ""}`}>
                            <div className="header-nav-inner">
                                <ul className="list-reset header-nav-right">
                                    <li>
                                        {localStorage.getItem("name") !== null ? (
                                            <CustomSelectBox
                                                options={[
                                                    "My Profile",
                                                    "Publish New Article",
                                                    "Log out",
                                                ]}
                                                text={`Welcome, ${localStorage.getItem("name")}`}
                                                onClick={handleClick}
                                            />
                                        ) : (
                                            <Link
                                                to="/login"
                                                className="button button-primary button-wide-mobile button-sm"
                                                onClick={closeMenu}
                                            >
                                                Login
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </>
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = defaultProps;

export default Header;
