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
import Add from "Routes/Add";
import Story from "Routes/Story";

import Hoonap from "Routes/Hoonap";
import Hoowitter from "Routes/Hoowitter";
import Hooflix from "Routes/Hooflix";

export default () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/toyprojects" exact component={ToyProjects} />
                <Route path="/toyprojects/hoonap" exact component={Hoonap} />
                <Route path="/toyprojects/hoowitter" exact component={Hoowitter} />
                <Route path="/toyprojects/hooflix" exact component={Hooflix} />

                <Route path="/blog" exact component={Blog} />
                <Route path="/blog/*" exact component={Story} />
                <Route path="/gallery" exact component={Gallery} />
                <Route path="/painting" exact component={Painting} />
                <Route path="/about" exact component={About} />
                <Route path="/board" exact component={Board} />
                <Route path="/add/*" exact component={Add} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
);