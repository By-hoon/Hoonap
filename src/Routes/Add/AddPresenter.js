import React, { useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Addpath from "Components/Add/Addpath";
import Addimage from "Components/Add/Addimage";
import Addstory from "Components/Add/Addstory";
import { Icon } from "@iconify/react";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: minmax(100px, 200px) minmax(1000px, 1fr);
`;

const AddContainer = styled.div``;

const StageContainer = styled.div`
border: solid black 3px;
`;

const IconStyle = styled.div``;

const AddPresenter = () => {
    const [part, setPart] = useState("path");

    const movePath = () => {
        setPart("path")
    };
    const moveImg = () => {
        setPart("image")
    };
    const moveStory = () => {
        setPart("story")
    };

    return (
        <>
            <Helmet>
                <title>Add | BYHOON</title>
            </Helmet>
            <GridContainer>
                <StageContainer>
                    <IconStyle><Icon icon="emojione:keycap-1" /></IconStyle>
                    <IconStyle><Icon icon="emojione:keycap-2" /></IconStyle>
                    <IconStyle><Icon icon="emojione:keycap-3" /></IconStyle>
                </StageContainer>
                <AddContainer>
                    {part === "path" ? <Addpath moveImg={moveImg} movePath={movePath} /> :
                        part === "image" ? <Addimage movePath={movePath} moveStory={moveStory} /> :
                            part === "story" ? <Addstory moveImg={moveImg} /> : null}
                </AddContainer>
            </GridContainer>
        </>
    )
};

export default AddPresenter;