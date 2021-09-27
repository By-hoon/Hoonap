import React, { useRef, useState, useEffect } from "react";
import { Redirect, withRouter, useHistory } from "react-router";
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
// TODO: 각 요소가 저장되었는지 확인할 수 있는 체킹 박스. 클릭시 자세한 저장 내용 확인.
//       이미지 삭제 버튼 넣기.
//       (이미지 삭제시 원래 이미지 배열 삭제 후 원하는 이미지 배열로 다시 저장)
//       이미지 파트에서 타이틀 이미지 선택 넣기.
//       Story 파트에서 타이틀 따로, 이미지별 코멘트 추가.
const SaveContainer = styled.div`
    margin-left: 40px;
`;

const SaveSpan = styled.div``;

const SubmitForm = styled.form``;

const SubmitInput = styled.input``;

const FlashSpan = styled.span`
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 200px;
    padding: 10px 20px;
    border-radius: 10000px;
    text-align: center;
    animation: goAway 0.5s ease-in-out forwards;
    animation-delay: 5s;
    background-color: tomato;
    color: white;
`;

//------------------------------------PATH PART
const PathContainer = styled.div``;

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

//------------------------------------STORY PART
const StoryContainer = styled.div``;


//---------------------------------------------------------------

const AddPresenter = withRouter(({ location: { pathname } }) => {
    const history = useHistory();
    const isMounted = useRef(false);

    const [part, setPart] = useState("path");

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
        isMounted.current = true;

        dbService.collection("temp_path").onSnapshot((snapshot) => {
            const pathArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (isMounted.current) {
                setMainPath(pathArray);
            }
        });
        dbService.collection("temp_image").onSnapshot((snapshot) => {
            const imageArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (isMounted.current) {
                setMainImages(imageArray);
            }
        });
        dbService.collection("temp_story").onSnapshot((snapshot) => {
            const storyArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (isMounted.current) {
                setMainStory(storyArray);
            }
        });

        return () => (isMounted.current = false);
    }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        if (mainPath.length > 0 && mainImages.length > 0 && mainStory.length > 0) {
            const ids = [mainPath[0].id, mainImages[0].id, mainStory[0].id]
            delete mainPath[0].id;
            delete mainImages[0].id;
            delete mainStory[0].id;
            const mainObj = {
                mainPath,
                mainImages,
                mainStory,
            }
            mainSave(mainObj, ids);
        }
        else {
            alert("error");
        }
    }

    const mainSave = async (mainObj, ids) => {
        await dbService.collection("story_box").add(mainObj);
        await dbService.doc(`temp_path/${ids[0]}`).delete();
        await dbService.doc(`temp_image/${ids[1]}`).delete();
        await dbService.doc(`temp_story/${ids[2]}`).delete();
        history.push('/');
    }

    return (
        <>
            <Helmet>
                <title>Add | BYHOON</title>
            </Helmet>
            {/* <FlashSpan>Error!</FlashSpan> */}
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
                        {mainImages.length > 0 ? (
                            mainImages[0].imageId.map((imgId, index) => (
                                <ImageDetail key={imgId}>
                                    <ImageInner>
                                        <Img src={mainImages[0].attachmentArray[index]} />
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