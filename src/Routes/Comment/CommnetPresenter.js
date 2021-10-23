import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import FullScreen from "Components/FullScreen";

import { Icon } from '@iconify/react';

const GridContainer = styled.div`
    min-width: 1200px; 
    display: grid;
    grid-template-columns: 1fr 550px 550px 1fr;
    grid-template-rows: auto auto;
    border: 3px solid black;
`

const ImageContainer = styled.div`
    grid-column: 2/3;
    grid-row: 1/2;
    border: 1px solid tomato;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    &:hover{
        div{
            opacity: 1;
        }
    }
`;

const Img = styled.img`
  width: 100%;
`;

const ImageButton = styled.div`
    cursor: pointer;
    position: absolute;
    margin: 0px 0px 30px 30px;
    font-size: 20px;
    opacity: 0;
    &:hover{
        span{
            display: inline-block;
        }
    }
`;
const ButtonSpan = styled.span`
    margin-left: 5px;
    display: none;
`;

const InterContainer = styled.div`
    grid-column: 3/4;
    grid-row: 1/3;
    border: 3px solid aqua;
`;

const InterBtnContainer = styled.div``;



//  TODO: 대체 이미지 넣기

const CommnetPresenter = ({ images }) => {

    const [full, setFull] = useState(false);

    const onFull = () => {
        setFull(true);
    }
    const offFull = () => {
        setFull(false);
    }
    return (
        <>
            <Helmet>
                <title>Comment | BYHOON</title>
            </Helmet>
            {full ? <FullScreen attachmentId={images.attachmentId} offFull={offFull} /> : null}
            <GridContainer>
                <ImageContainer>
                    <Img src={images.attachmentId} />
                    <ImageButton onClick={onFull}>
                        <Icon icon="akar-icons:full-screen" />
                        <ButtonSpan>dd</ButtonSpan>
                    </ImageButton>
                </ImageContainer>
                <InterContainer>
                </InterContainer>
            </GridContainer>
        </>
    )
};

export default CommnetPresenter;