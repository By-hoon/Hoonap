import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import ToySlide from "Components/ToySlide";

const HiddenSpace = styled.div`
height: 50px;
`;

const SpanBox = styled.div`
    display: flex;
    justify-content: center;
`

const Click = styled.span`
`;

const ToyPresenter = () => (
    <>
        <Helmet>
            <title>ToyProjects | BYHOON</title>
        </Helmet>
        <ToySlide />
        <HiddenSpace />
        <SpanBox>
            <Click>자세한 내용은 클릭</Click>
        </SpanBox>
    </>
);

export default ToyPresenter;