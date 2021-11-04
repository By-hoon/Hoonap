import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const CommentContainer = styled.div`
    width: 50%;
    display: grid;
    grid-template-columns: 1fr 130px;
    margin-top: 10px;
    border: 1.5px solid #eaeaea;
    border-radius: 15px;
`;

const CommentSpan = styled.span`
    margin: auto;
`;

const FigContainer = styled.figure`
    text-align: center; 
    border: 1px solid #eaeaea;
    border-radius: 15px;
    display: inline-block;
    margin: 20px;
    max-width: 100px;
    height: 100px;
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
    padding: 10px;
`;

const FigCaption = styled.figcaption`
  position: absolute;
  border-radius: 15px;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ImageLink = styled(Link)``;

export default ({ userObj, userInfo, commentObj, imageObj }) => (
    <ContentContainer>
        {Object.keys(imageObj).length > 0 ? (
            <>
                {Object.keys(userInfo.comments).map(imageId => {
                    return (
                        Object.keys(userInfo.comments[imageId]).length > 0 ? (
                            <>
                                {Object.keys(userInfo.comments[imageId]).map(date => {
                                    return (
                                        <>
                                            <CommentContainer key={date}>
                                                <CommentSpan>{userInfo.comments[imageId][date]}</CommentSpan>
                                                <FigContainer>
                                                    <ImageLink to={`/comment/${imageId}`}>
                                                        <Img src={imageObj[imageId].attachmentId} />
                                                        <FigCaption>
                                                        </FigCaption>
                                                    </ImageLink>
                                                </FigContainer>
                                            </CommentContainer>
                                        </>
                                    );
                                })}
                            </>
                        ) : null)
                })}
            </>
        ) : null}
    </ContentContainer>
);
