import React, { useRef, useState, useEffect } from "react";
import { Redirect, withRouter, useHistory } from "react-router";
import styled from "styled-components";
import Helmet from "react-helmet";
import Addpath from "Components/Add/Addpath";
import Addimage from "Components/Add/Addimage";
import Addstory from "Components/Add/Addstory";
import { Icon } from "@iconify/react";

import { dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const GridContainer = styled.div`
    display: grid;
    height: 80vh;
    /* grid-template-columns: minmax(250px, 300px) minmax(600px, 3fr) minmax(400px, 2fr); */
    grid-template-columns: minmax(250px, 300px) minmax(1000px, 1fr);
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
// TODO: 각 페이지별로 우측에 해당 페이지의 요소 선택 및 추가 실시간으로 볼 수 있게 넣기.
//       Story 파트에서 타이틀 따로, 이미지별 코멘트 추가. 
//       최종 확인 및 제출 page 만들기. 여기서 내용들 수정 가능하게

//       Path 파트에서 지역 정보 띄워주고, 지역 수정해서 정보 입력할 수 있게 하기.
//       Image 파트에서 image들의 순서 정할 수 있게 하기. 첫 번 째 사진이 title 사진.
//       저장완료 flash 넣기
//       각 단계에서 필요한 입력들이 다 수행되지 않았을 때, 이동버튼 비활성화 시키기.

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
                storyTime: Date.now(),
            }
            mainSave(mainObj, ids);
        }
        else {
            alert("error");
        }
    }

    const mainSave = async (mainObj, ids) => {
        const storyId = uuidv4();
        await dbService.collection(`story_box`).doc(`${storyId}`).set(mainObj);
        await dbService.doc(`temp_path/${ids[0]}`).delete();
        await dbService.doc(`temp_image/${ids[1]}`).delete();
        await dbService.doc(`temp_story/${ids[2]}`).delete();
        imageSave(storyId);
    }

    const imageSave = (storyId) => {
        mainImages[0].imageId.forEach(async (id, index) => {
            await dbService.collection(`image_box`).doc(`${id}`).set({
                attachmentId: mainImages[0].attachmentArray[index],
                storyId,
            });
        })
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
                    {/* <ImagesContainer>
                        {mainImages.length > 0 ? (
                            mainImages[0].imageId.map((imgId, index) => (
                                <ImageDetail key={imgId}>
                                    <ImageInner>
                                        <Img src={mainImages[0].attachmentArray[index]} />
                                    </ImageInner>
                                </ImageDetail>
                            ))
                        ) : null}
                    </ImagesContainer> */}
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