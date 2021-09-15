import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Helmet from "react-helmet";
import Addpath from "Components/Add/Addpath";
import Addimage from "Components/Add/Addimage";
import Addstory from "Components/Add/Addstory";
import { Icon } from "@iconify/react";

import { dbService } from "fbase";

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
//------------------------------------SAVE ZONE
const SaveContainer = styled.div`
    margin-left: 40px;
`;

//------------------------------------IMAGE PART
const ImagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
`;

const ImageDetail = styled.div`
    display: inline-flex;
    border-radius: 2;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 100px;
    height: 100px;
    padding: 4px;
    box-sizing: border-box;
`;

const ImageInner = styled.div`
    display: flex;
    min-width: 0;
    overflow: hidden;
`;

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`;
//---------------------------------------------------------------
const SubmitForm = styled.form``;

const SubmitInput = styled.input``;

const AddPresenter = withRouter(({ location: { pathname } }) => {
    const [part, setPart] = useState("path");
    const [images, setImages] = useState([]);

    const [mainPath, setMainPath] = useState([]);
    const [mainImages, setMainImages] = useState([]);
    const [mainStory, setMainStory] = useState([]);

    const movePath = () => {
        setPart("path")
    };
    const moveImg = () => {
        setPart("image")
    };
    const moveStory = () => {
        setPart("story")
    };

    useEffect(() => {
        dbService.collection("temp_image").onSnapshot((snapshot) => {
            const imageArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setImages(imageArray);
        });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.collection("temp_path").onSnapshot((snapshot) => {
            const pathArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setMainPath(pathArray);
        });
        dbService.collection("temp_image").onSnapshot((snapshot) => {
            const imageArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setMainImages(imageArray);
        });
        dbService.collection("temp_story").onSnapshot((snapshot) => {
            const storyArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setMainStory(storyArray);
        });
        const mainObj = {
            mainPath,
            mainImages,
            mainStory,
        }
        mainSave(mainObj);
    }

    const mainSave = async (mainObj) => {
        await dbService.collection("story_box").add(mainObj);
    }

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
                <SaveContainer>
                    <ImagesContainer>
                        {images.length > 0 ? (
                            images[0].id.map((imgId, index) => (
                                <ImageDetail key={imgId}>
                                    <ImageInner>
                                        <Img src={images[0].attachmentArray[index]} />
                                    </ImageInner>
                                </ImageDetail>
                            ))
                        ) : null}
                    </ImagesContainer>
                    {part === "story" ?
                        <SubmitForm onSubmit={onSubmit}>
                            <SubmitInput type="submit" value="스토리 저장" />
                        </SubmitForm> : null}
                </ SaveContainer>
            </GridContainer>
        </>
    )
});

export default AddPresenter;