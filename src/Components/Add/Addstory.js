import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import AddContent from "./AddContent";

import { dbService } from "fbase";

const IconStyle = styled.div`
    color: black;
    &:hover{
        color: aqua;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
`

const MoveLink = styled(Link)`
    width: 30px;
    height: 30px;
`;

const StoryForm = styled.form``;

const StoryContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
`;

const StoryInput = styled.input`
    resize: none;
    overflow: hidden;
    padding: 12px;
    display: block;
    outline: none;
    width: 500px;
    min-height: 38px;
    border-radius: 4px;
    caret-color: lightskyblue;
    box-sizing: border-box;
    line-height: 15px;
    &:focus {
        background: azure;
    }
`;
const StorySubmit = styled.input`
    display: none;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 400px 400px 1fr;
    height: auto;
    margin-bottom: 50px;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-column: 2/3;
`;

const FigContainer = styled.figure`
    text-align: center; 
    position: relative;
    display: inline-block;
    margin: 20px;
    max-width: 50px;
    height: 50px;
    width: 100%;
    font-size: 16px;
    box-shadow: none !important;
`;

const FigCaption = styled.figcaption`
  position: absolute;
  cursor: pointer;
  top: 4px;
  right: 5.5px;
  font-size: 40px;
  opacity:${props => (props.checked ? '1' : '0.2')};
`;

const Img = styled.img`
    cursor: pointer;
    border-radius: 10px;
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const ContentContainer = styled.div`
    grid-column: 3/4;
`;

const AddStory = ({ mainImages, moveImg, mainCon }) => {
    const [title, setTitle] = useState("");
    const [curImg, setCurImg] = useState(null);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTitle(value);
    };

    const storySubmit = async (event) => {
        event.preventDefault();
        if (title) {
            const storyObj = {
                title,
            }
            await dbService.collection("temp_story").add(storyObj);
            setTitle("");
            alert("제목 저장 완료")
        }
        else alert("제목을 입력해주세요.")
    }

    const onClickContent = async (index) => {
        setCurImg({
            attachmentArray: mainImages.attachmentArray[index],
            imageId: mainImages.imageId[index],
        })
    }

    return (
        <>
            <StoryForm onSubmit={storySubmit}>
                <StoryContainer>
                    <StoryInput
                        value={title}
                        onChange={onChange}
                        type="text"
                        placeholder="제목을 입력하세요 !"
                        maxLength={100}
                    />
                    <StorySubmit
                        type="submit"
                    />
                </StoryContainer>
            </StoryForm>
            <GridContainer>
                <FlexContainer>
                    {mainImages ? (
                        mainImages.imageId.map((imgId, index) => (
                            <FigContainer key={imgId} onClick={() => { onClickContent(index) }} >
                                <Img src={mainImages.attachmentArray[index]} />
                                {
                                    mainCon[imgId] ? (
                                        <FigCaption checked>
                                            <Icon icon="carbon:checkbox-checked-filled" />
                                        </FigCaption>
                                    ) : (
                                        <FigCaption>
                                            <Icon icon="carbon:checkbox-checked-filled" />
                                        </FigCaption>
                                    )
                                }
                            </FigContainer>
                        ))
                    ) : null}
                </FlexContainer>
                <ContentContainer>
                    <AddContent curImg={curImg} curCon={mainCon} />
                </ContentContainer>
            </GridContainer>
            <LinkContainer>
                <MoveLink to="/add/image">
                    <IconStyle>
                        <Icon icon="akar-icons:circle-chevron-left" onClick={moveImg} width="30px" height="30px" />
                    </IconStyle>
                </MoveLink>
            </LinkContainer>
        </>
    )
}

export default AddStory;