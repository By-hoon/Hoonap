import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import { dbService } from "fbase";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: auto;
    min-height: 200px;
`;

const ImageContainer = styled.div`
`;

const Img = styled.img`
    cursor: pointer;
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
`;
const StorySubmit = styled.input`
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
                                    className="factoryInput__input"
                                    value={content}
                                    onChange={onChange}
                                    type="text"
                                    placeholder="Tell us about this Image"
                                    maxLength={300}
                                />
                                <StorySubmit
                                    type="submit" value="확인"
                                />
                            </StoryContainer>
                        </StoryForm>
                    </ContentContainer>
                </GridContainer>
            ) : null}
        </>
    )
}