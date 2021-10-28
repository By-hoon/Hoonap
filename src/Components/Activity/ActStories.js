import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContentContainer = styled.div`
       display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const FigContainer = styled.figure`
    position: relative;
    display: inline-block;
    margin: 20px;
    max-width: 250px;
    height: 250px;
    width: 100%;
    color: #bbb;
    font-size: 16px;
    box-shadow: none !important;
    transform: translateZ(0);

    *,&:before, &:after{
        text-align: center;
        box-sizing: border-box;
        transition: all 0.3s linear;
    }

    &:before, &:after{
        box-sizing: border-box;
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

export default ({ userObj, userInfo, storyObj }) => (
    <ContentContainer>
        {Object.keys(storyObj).length > 0 ? (
            <>
                {Object.keys(userInfo.stories).map(story => {
                    const storyDetail = storyObj[story];
                    return (
                        <FigContainer key={story}>
                            <StoryLink to={`/blog/${story}`}>
                                <TitleImage src={storyDetail.mainImages[0].attachmentArray[0]} alt="titleImg"></TitleImage>
                                <FigCaption>
                                    <TitleSpan>{storyDetail.mainStory[0].title}</TitleSpan>
                                </FigCaption>
                            </StoryLink>
                        </FigContainer>
                    );
                })}
            </>
        ) : null}

    </ContentContainer>
);
