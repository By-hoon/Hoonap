import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContentContainer = styled.div``

const FigContainer = styled.figure`
    text-align: center; 
    position: relative;
    display: inline-block;
    margin: 20px;
    max-width: 200px;
    height: 200px;
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

const ImageLink = styled(Link)``;

export default ({ userObj, userInfo, likeObj, imageObj }) => {
    return (
        <ContentContainer>
            {Object.keys(imageObj).length > 0 ? (
                <>
                    {Object.keys(userInfo.likes).map(imageId => {
                        return (
                            <>
                                <FigContainer key={imageId}>
                                    <ImageLink to={`/comment/${imageId}`}>
                                        <Img src={imageObj[imageId].attachmentId} />
                                        <FigCaption>
                                        </FigCaption>
                                    </ImageLink>
                                </FigContainer>
                            </>
                        );
                    })}
                </>
            ) : null}
        </ContentContainer>
    )
};
