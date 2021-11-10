import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const FigContainer = styled.figure`
    position: relative;
    display: inline-block;
    margin: 40px;
    max-width: 320px;
    height: 320px;
    width: 100%;
    color: #bbb;
    font-size: 16px;
    box-shadow: none !important;
    transform: translateZ(0);

    *,&:before, &:after{
        box-sizing: border-box;
        transition: all 0.3s linear;
        text-align: center;
    }

    &:before, &:after{
        border-radius: 50%;
        content: '';
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: -1;
        border: 2px solid;
        border-color: transparent #bbb;
    }

    a{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }

    &:hover{
        figcaption{
            opacity: 1;
            transform: translateX(0);
        }
    }

    &:hover{
        &:before, &:after{
            border-width: 10px;
        }
    }

    &:hover:before{
        transform: rotate(45deg);
    }

    &:hover:after{
        transform: rotate(-45deg);
    }

`;

const TitleImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  backface-visibility: hidden;
  vertical-align: top;
  border-radius: 50%;
  padding: 10px;
`;

const FigCaption = styled.figcaption`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 50%;
`;

const StoryLink = styled(Link)`
    color: #bbb;
`

const TitleSpan = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    font-size: 3em;
    z-index: 1;
`;

const BlogPresenter = ({ titleImgs, titleIds, titleName, loading, error }) => {
    return (
        <>
            <Helmet>
                <title>Blog | BYHOON</title>
            </Helmet>
            <FlexContainer>
                {titleImgs ? (
                    titleImgs.map((img, index) => {
                        const storyLink = `/blog/${titleIds[index]}`;
                        return (
                            <FigContainer key={titleIds[index]}>
                                <StoryLink to={storyLink}>
                                    <TitleImage src={img} alt="titleImg"></TitleImage>
                                    <FigCaption>
                                        <TitleSpan>{titleImgs[index].length}</TitleSpan>
                                    </FigCaption>
                                </StoryLink>
                            </FigContainer>
                        )
                    })
                ) : null
                }
            </FlexContainer>
        </>
    )
};

export default BlogPresenter;