import React from "react";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import Header from "Components/Header";
import Auth from "Routes/Auth";
import Profile from "Routes/Profile";
import Home from "Routes/Home";
import ToyProjects from "Routes/ToyProjects";
import Blog from "Routes/Blog";
import Gallery from "Routes/Gallery";
import Painting from "Routes/Painting";
import About from "Routes/About";
import Board from "Routes/Board";
import Add from "Routes/Add";
import Story from "Routes/Story";
import Map from "Routes/Map";
import Comment from "Routes/Comment";

import Hoonap from "Routes/Hoonap";
import Hoowitter from "Routes/Hoowitter";
import Hooflix from "Routes/Hooflix";

export default ({ refreshUser, isLoggedIn, userObj }) => {

    return (
        <Router>
            <>
                {isLoggedIn && <Header userObj={userObj} />}

                {isLoggedIn ? (
                    <Switch>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route path="/toyprojects" exact component={ToyProjects} />
                        <Route path="/toyprojects/hoonap" exact component={Hoonap} />
                        <Route path="/toyprojects/hoowitter" exact component={Hoowitter} />
                        <Route path="/toyprojects/hooflix" exact component={Hooflix} />

                        <Route exact path="/profile">
                            <Profile userObj={userObj} />
                        </Route>

                        <Route exact path="/blog">
                            <Blog userObj={userObj} />
                        </Route>
                        <Route exact path="/blog/:id">
                            <Story userObj={userObj} />
                        </Route>
                        <Route exact path="/gallery">
                            <Gallery userObj={userObj} />
                        </Route>
                        <Route exact path="/map">
                            <Map userObj={userObj} />
                        </Route>

                        <Route path="/comment/:id" exact>
                            <Comment userObj={userObj} />
                        </Route>

                        <Route path="/painting" exact component={Painting} />

                        <Route path="/about" exact component={About} />
                        <Route path="/board" exact component={Board} />


                        <Route path="/add/*" exact>
                            <Add userObj={userObj} />
                        </Route>
                        <Redirect from="*" to="/" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </Switch>
                )}
            </>
        </Router>
    )
};