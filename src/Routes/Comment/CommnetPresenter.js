import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const FigContainer = styled.figure`
    text-align: center; 
    position: relative;
    display: inline-block;
    margin: 20px;
    height: 800px;
    width: 100%;
    color: #bbb;
    font-size: 16px;
    box-shadow: none !important;
    transform: translateZ(0);

    *,&:before, &:after{
        box-sizing: border-box;
        transition: all 0.2s linear;
    }

    &:hover{
        figcaption{
            opacity: 1;
        }
    }

`;

const Img = styled.img`
  max-width: 100%;
  height: 100%;
  
  object-fit: contain;
  backface-visibility: hidden;
  /* vertical-align: top; */
  padding: 10px;
`;

const FigCaption = styled.figcaption`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* border-radius: 50%; */

`;

const SpanBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -55%);
    z-index: 1;
    padding: 10px;
`;

const PreviewSpan = styled.span`
    font-size: 13px;
    color: #dfe6e9;
    &:hover{
            color: #6c5ce7;
    }
`;

const ImageLink = styled(Link)``;

const InterContainer = styled.div``;

//  TODO: 대체 이미지 넣기

const CommnetPresenter = ({ images }) => (
    <>
        <Helmet>
            <title>Comment | BYHOON</title>
        </Helmet>
        <GridContainer>
            <FigContainer>
                <ImageLink to='/'>
                    <Img src={images.attachmentId} />
                    <FigCaption>
                        <SpanBox>

                        </SpanBox>
                    </FigCaption>
                </ImageLink>
            </FigContainer>
            <InterContainer></InterContainer>
        </GridContainer>
    </>
);

export default CommnetPresenter;