import React from "react";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import Header from "Components/Header";

export default () => (
    <Router>
        <>
            <Header />
            <Switch></Switch>
        </>
    </Router>
);