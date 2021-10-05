import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";


const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
`;

const Imagebox = styled.div`
    display: inline-flex;
    border-radius: 2;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 200px;
    height: 200px;
    padding: 4px;
    box-sizing: border-box;
`;

// const ThumbInner = styled.div`
//     display: flex;
//     min-width: 0;
//     overflow: hidden;
// `;

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const StoryPresenter = ({ error, loading, storyObj }) => {
    return (
        <>
            <Helmet>
                <title>Story | BYHOON</title>
            </Helmet>
            <ImageContainer>
                {storyObj ?
                    (storyObj.mainImages[0].attachmentArray.map((img, index) => (
                        <Imagebox key={storyObj.mainImages[0].imageId[index]}>
                            <Img src={img} />
                        </Imagebox>
                    ))) : null}
            </ImageContainer>
        </>
    )
};

export default StoryPresenter;