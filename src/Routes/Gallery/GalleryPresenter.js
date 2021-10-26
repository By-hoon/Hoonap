import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

import { dbService } from "fbase";

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

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


//      TODO: story id받아와서 ImageLInk에 넣어주기.
//            imageId CommentLink에 넣어주기.

const GalleryPresenter = () => {
    const history = useHistory();
    const isMounted = useRef(false);

    const [images, setImages] = useState([]);

    useEffect(() => {
        isMounted.current = true;

        dbService.collection("story_box").onSnapshot((snapshot) => {
            const boxArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            boxArray.forEach(box => {
                box.mainImages[0].attachmentArray.forEach((attachment, index) => {
                    const imageObj = {
                        storyId: box.id,
                        imgId: box.mainImages[0].imageId[index],
                        attachmentArray: attachment,
                    }
                    setImages((prev) => [imageObj, ...prev]);
                })
            });
        });

        return () => (isMounted.current = false);
    }, []);
    return (
        <>
            <Helmet>
                <title>Gallery | BYHOON</title>
            </Helmet>
            <FlexContainer>
                {images.length > 0 ?
                    (images.map((img) => (
                        <FigContainer key={img.imgId}>
                            <ImageLink to={`/comment/${img.imgId}`}>
                                <Img src={img.attachmentArray} />
                                <FigCaption>
                                    <SpanBox>
                                        <PreviewSpan>3 likes</PreviewSpan>
                                        <PreviewSpan>5 comments</PreviewSpan>
                                    </SpanBox>
                                </FigCaption>
                            </ImageLink>
                        </FigContainer>
                    ))) : null}
            </FlexContainer>
        </>

    )
};

export default GalleryPresenter;