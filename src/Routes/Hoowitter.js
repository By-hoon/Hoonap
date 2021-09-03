import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

const HoowitterLink = styled.a``;

const HoowitterPresenter = () => (
    <>
        <Helmet>
            <title>Hoowitter | BYHOON</title>
        </Helmet>
        <HoowitterLink href='https://by-hoon.github.io/Hoowitter/#/'>click</HoowitterLink>
    </>
);

export default HoowitterPresenter;