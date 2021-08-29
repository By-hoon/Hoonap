import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Mainmenu from "Components/Mainmenu";

const HomePresenter = () => (
    <>
        <Helmet>
            <title>Home | BYHOON</title>
        </Helmet>
        <Mainmenu />
    </>
);

export default HomePresenter;