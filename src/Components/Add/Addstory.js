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
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 20px;
    width: 80%;
`;

const StoryInput = styled.input`
    margin-left: 50px;
    margin-bottom: 30px;
    flex-grow: 1;
    height: 40px;
    padding: 0px 20px;
    border: 1px solid #04aaff;
    border-radius: 20px;
    font-weight: 500;
    font-size: 14px;
`;
const StorySubmit = styled.input`
    position: absolute;
    right: 0;
    bottom: 30px;
    background-color: #04aaff;
    height: 40px;
    width: 40px;
    padding: 10px 0px;
    text-align: center;
    border-radius: 20px;
    color: white;
    box-sizing: border-box;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px 600px 1fr;
    height: auto;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-column: 2/3;
    border: 3px solid black;
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
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  font-size: 40px;
  opacity:${props => (props.checked ? '1' : '0.2')};
`;

const Img = styled.img`
    cursor: pointer;
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const ContentContainer = styled.div`
    grid-column: 3/4;
    border: 3px black solid;
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
        const storyObj = {
            title,
        }
        await dbService.collection("temp_story").add(storyObj);
        setTitle("");
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
                        className="factoryInput__input"
                        value={title}
                        onChange={onChange}
                        type="text"
                        placeholder="Tell us about this story"
                        maxLength={100}
                    />
                    <StorySubmit
                        type="submit" value="&rarr;"
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