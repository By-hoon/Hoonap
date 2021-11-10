import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";


const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FigContainer = styled.figure`
    text-align: center; 
    position: relative;
    display: inline-block;
    margin: 20px;
    max-width: 250px;
    height: 250px;
    width: 100%;
    color: #bbb;
    font-size: 16px;
    box-shadow: none !important;
    border: 1.5px solid #eaeaea;
    border-radius: 15px;

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
  padding: 10px;
`;

const FigCaption = styled.figcaption`
    position: absolute;
    top: 0px;
    bottom:0px;
    left: 0px;
    right: 0px;
    border: 1.5px solid #eaeaea;
    border-radius: 15px;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
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

// const CommentLink = styled(Link)`
//     text-decoration: none;
// `;

const StoryPresenter = ({ error, loading, storyObj }) => {
    // const [comments, setComments] = useState("");
    // const [likes, setLikes] = useState(false);

    return (
        <>
            <Helmet>
                <title>Story | BYHOON</title>
            </Helmet>
            <FlexContainer>
                {storyObj ?
                    (storyObj.mainImages.attachmentArray.map((img, index) => {
                        const imgId = storyObj.mainImages.imageId[index];
                        return (
                            <FigContainer key={imgId}>
                                <ImageLink to={`/comment/${imgId}`}>
                                    <Img src={img} />
                                    <FigCaption>
                                        {/* <SpanBox>
                                            <PreviewSpan>3 likes</PreviewSpan>
                                            <PreviewSpan>5 comments</PreviewSpan>
                                        </SpanBox> */}
                                    </FigCaption>
                                </ImageLink>
                            </FigContainer>
                        )
                    })) : null}
            </FlexContainer>
        </>
    )
};

export default StoryPresenter;