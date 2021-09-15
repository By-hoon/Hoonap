import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

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

const AddStory = (props) => {
    const [story, setStory] = useState("");

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setStory(value);
    };

    const storySubmit = async (event) => {
        event.preventDefault();
        const storyObj = {
            story,
        }
        await dbService.collection("temp_story").add(storyObj);
        setStory("");
    }

    return (
        <>
            <StoryForm onSubmit={storySubmit}>
                <StoryContainer>
                    <StoryInput
                        className="factoryInput__input"
                        value={story}
                        onChange={onChange}
                        type="text"
                        placeholder="Tell us about this story"
                        maxLength={200}
                    />
                    <StorySubmit
                        type="submit" value="&rarr;"
                    />
                </StoryContainer>
            </StoryForm>
            <LinkContainer>
                <MoveLink to="/add/image">
                    <IconStyle>
                        <Icon icon="akar-icons:circle-chevron-left" onClick={props.moveImg} width="30px" height="30px" />
                    </IconStyle>
                </MoveLink>
            </LinkContainer>
        </>
    )
}

export default AddStory;