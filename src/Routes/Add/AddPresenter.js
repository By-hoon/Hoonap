import React, { useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Helmet from "react-helmet";
import Addpath from "Components/Add/Addpath";
import Addimage from "Components/Add/Addimage";
import Addstory from "Components/Add/Addstory";
import { Icon } from "@iconify/react";

const GridContainer = styled.div`
    display: grid;
    height: 80vh;
    grid-template-columns: minmax(250px, 300px) minmax(600px, 3fr) minmax(400px, 2fr);
`;

const AddContainer = styled.div`
`;

const StageContainer = styled.div`
    padding-left: 80px;
`;

const IconStyle = styled.div`
    display: flex;
    font-size: 45px;
    margin-bottom: 40px;
    color:
        ${props => (props.current ? "#3498db" : "#dfe6e9")};
    transition: color 0.2s ease-in-out;
`;
const IconMenu = styled.span`
    margin-left: 15px;
    font-size: 33px;
`;

const AddPresenter = withRouter(({ location: { pathname } }) => {
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
                    <IconStyle current={pathname === "/add/path"}>
                        <Icon icon="bi:dice-1" />
                        <IconMenu>PATH</IconMenu>
                    </IconStyle>
                    <IconStyle current={pathname === "/add/image"}>
                        <Icon icon="bi:dice-2" />
                        <IconMenu>IMAGE</IconMenu>
                    </IconStyle>
                    <IconStyle current={pathname === "/add/story"}>
                        <Icon icon="bi:dice-3" />
                        <IconMenu>STORY</IconMenu>
                    </IconStyle>
                </StageContainer>
                <AddContainer>
                    {part === "path" ? <Addpath moveImg={moveImg} movePath={movePath} /> :
                        part === "image" ? <Addimage movePath={movePath} moveStory={moveStory} /> :
                            part === "story" ? <Addstory moveImg={moveImg} /> : null}
                </AddContainer>
            </GridContainer>
        </>
    )
});

export default AddPresenter;