import React from "react";
import styled from "styled-components";

const FullContainer = styled.div`
    position: absolute;
    top:0;
    text-align: center;
    z-index: 10;
    border: 3px solid aqua;
    width:100%;
    cursor: pointer;
`;

const FullImg = styled.img`
    width: 1300px;
    cursor: default;
`;

export default ({ attachmentId, offFull }) => (
    <FullContainer onClick={offFull}>
        <FullImg src={attachmentId} />
    </FullContainer>
);
