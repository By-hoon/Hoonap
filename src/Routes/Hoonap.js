import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

const HoonapLink = styled.a`
`

const HoonapPresenter = () => (
    <>
        <Helmet>
            <title>Hoonap | BYHOON</title>
        </Helmet>
        <HoonapLink href='https://hoonap.herokuapp.com/'>click</HoonapLink>
    </>
);

export default HoonapPresenter;