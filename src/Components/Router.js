import React from "react";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import ToyProjects from "Routes/ToyProjects";
import Blog from "Routes/Blog";
import Gallery from "Routes/Gallery";
import Painting from "Routes/Painting";
import About from "Routes/About";
import Board from "Routes/Board";

export default () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/toyprojects" exact component={ToyProjects} />
                <Route path="/blog" exact component={Blog} />
                <Route path="/gallery" exact component={Gallery} />
                <Route path="/painting" exact component={Painting} />
                <Route path="/about" exact component={About} />
                <Route path="/board" exact component={Board} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
);