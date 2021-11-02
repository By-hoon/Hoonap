import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import MyDropzone from "../Dragdrop";
import { dbService } from "fbase";

const IconStyle = styled.div`
    color: black;
    &:hover{
        color: aqua;
    }
`;

const LinkContainer = styled.div`
    margin-left: 50px;
    display: flex;
    justify-content: center;
`

const MoveLink = styled(Link)`
    width: 30px;
    height: 30px;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
    margin-left: 50px;
`;

const FigContainer = styled.figure`
    text-align: center; 
    position: relative;
    display: inline-block;
    margin: 20px;
    max-width: 250px;
    height: 250px;
    width: 100%;
    font-size: 16px;
    box-shadow: none !important;

    &:hover{
        figcaption{
            animation: opacityChange 0.7s linear 1 forwards;
            @keyframes opacityChange{
                0%{opacity: 0;}
                100%{opacity: 1;}
            } 
        }
    }
`;

const FigCaption = styled.figcaption`
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    border-radius: 20px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    top: 0;
    font-size: 60px;
    opacity: 0;
`;

const Img = styled.img`
    border-radius: 20px;
    object-fit: contain;
    width: 100%;
    height: 100%;
`;


const Addimage = ({ mainImages, movePath, moveStory }) => {
    const onClickDelete = async (index) => {
        const ok = window.confirm(`사진을 삭제하시겠습니까?`);
        if (ok) {
            const tempImg = dbService.doc(`temp_image/${mainImages.id}`);
            await dbService.collection('imageContent').doc(`${mainImages.imageId[index]}`).delete();
            delete mainImages.id;
            mainImages.imageId.splice(index, 1);
            mainImages.attachmentArray.splice(index, 1);
            await tempImg.set(mainImages);
        }
    }
    return (
        <>
            <MyDropzone mainImages={mainImages} />
            <FlexContainer>
                {mainImages ? (
                    mainImages.imageId.map((imgId, index) => (
                        <FigContainer key={imgId}>
                            <Img src={mainImages.attachmentArray[index]} />
                            <FigCaption onClick={() => { onClickDelete(index) }}>
                                <Icon icon="ant-design:delete-filled" />
                            </FigCaption>
                        </FigContainer>
                    ))
                ) : null}
            </FlexContainer>
            <LinkContainer>
                <MoveLink to="/add/path">
                    <IconStyle>
                        <Icon icon="akar-icons:circle-chevron-left" onClick={movePath} width="30px" height="30px" />
                    </IconStyle>
                </MoveLink>
                <MoveLink to="/add/story">
                    <IconStyle>
                        <Icon icon="akar-icons:circle-chevron-right" onClick={moveStory} width="30px" height="30px" />
                    </IconStyle>
                </MoveLink>
            </LinkContainer>
        </>
    )
}

export default Addimage;