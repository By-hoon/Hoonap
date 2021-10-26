import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Mainmenu from "Components/Mainmenu";

const HomePresenter = ({ userObj }) => (
    <>
        <Helmet>
            <title>Home | BYHOON</title>
        </Helmet>
        <Mainmenu userObj={userObj} />
    </>
);

export default HomePresenter;