import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Tags from "./views/Tags";
import Login from "./views/Login";
import UserProfile from "./views/UserProfile";
import Publish from "./views/Publish";

const App = () => {
    const childRef = useRef();
    let location = useLocation();

    document.body.classList.add("is-loaded");
    useEffect(() => {
        childRef.current.init();
    }, [location]);

    return (
        <ScrollReveal
            ref={childRef}
            children={() => (
                <Switch>
                    <AppRoute exact path="/login" component={Login} />
                    <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
                    <AppRoute exact path="/tags/:tagname" component={Tags} layout={LayoutDefault} />
                    <AppRoute exact path="/publish" component={Publish} layout={LayoutDefault} />
                    <AppRoute
                        exact
                        path="/user/:username"
                        component={UserProfile}
                        layout={LayoutDefault}
                    />
                </Switch>
            )}
        />
    );
};

export default App;
