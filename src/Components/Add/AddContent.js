import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import { dbService } from "fbase";

const GridContainer = styled.div`
    height: auto;
    min-height: 200px;
`;

const ImageContainer = styled.div`
`;

const Img = styled.img`
    border-radius: 10px;
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const ContentContainer = styled.div`
`
const StoryForm = styled.form`
`;

const StoryContainer = styled.div`
`;

const StoryInput = styled.input`
    overflow: hidden;
    padding: 12px;
    display: block;
    outline: none;
    width: 100%;
    border-radius: 4px;
    caret-color: lightskyblue;
    box-sizing: border-box;
    margin-top: 5px;
    line-height: 15px;
    &:focus {
        background: azure;
    }
`;
const StorySubmit = styled.input`
    display: none;
`;

export default ({ curImg, curCon }) => {
    const [content, setContent] = useState("");
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setContent(value);
    };

    const storySubmit = async (event) => {
        event.preventDefault();
        const cotentObj = {
            content,
        }

        const imageContent = dbService.doc(`imageContent/${curImg.imageId}`);

        await imageContent.set(cotentObj);

        setContent("");
    }

    return (
        <>
            {curImg ? (
                <GridContainer>
                    <ImageContainer>
                        <Img src={curImg.attachmentArray} />
                    </ImageContainer>
                    <ContentContainer>
                        <StoryForm onSubmit={storySubmit}>
                            <StoryContainer>
                                <StoryInput
                                    value={content}
                                    onChange={onChange}
                                    type="text"
                                    placeholder="이미지에 대해 적어주세요."
                                    maxLength={300}
                                />
                                <StorySubmit
                                    type="submit"
                                />
                            </StoryContainer>
                        </StoryForm>
                    </ContentContainer>
                </GridContainer>
            ) : null}
        </>
    )
}