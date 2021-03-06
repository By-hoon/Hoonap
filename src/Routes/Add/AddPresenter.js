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
    text-align: center;
    margin-left: 10px;
`;

const BtnStyle = styled.span`
    position: relative;
    display: inline-block;
    padding: 12px 36px;
    margin: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    text-transform: uppercase;
    outline-style: none;
    border: 1px solid white;
    overflow: hidden;
    cursor: pointer;
    &:hover{
        transition: 0.5s ease-in-out;
        background-color: tomato;
    }
    animation: opacityChange 1s linear 1 ;
        @keyframes opacityChange{
            0%{opacity: 0;}
            100%{opacity: 1;}
    } 
`;

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


//---------------------------------------------------------------

const AddPresenter = withRouter(({ location: { pathname }, userObj }) => {
    const history = useHistory();
    const isMounted = useRef(false);
    const [part, setPart] = useState("path");

    const [mainPath, setMainPath] = useState({});
    const [mainImages, setMainImages] = useState({});
    const [mainStory, setMainStory] = useState({});

    const [mainCon, setMainCon] = useState({});

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
                setMainPath(pathArray[0]);
            }
        });
        dbService.collection("temp_image").onSnapshot((snapshot) => {
            const imageArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (isMounted.current) {
                setMainImages(imageArray[0]);
            }
        });
        dbService.collection("temp_story").onSnapshot((snapshot) => {
            const storyArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (isMounted.current) {
                setMainStory(storyArray[0]);
            }
        });

        dbService.collection("imageContent").onSnapshot((snapshot) => {
            const contentArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const contentObj = {};
            contentArray.forEach(content => {
                contentObj[content.id] = content.content
            })
            if (isMounted.current) {
                setMainCon(contentObj);
            }
        });

        return () => (isMounted.current = false);
    }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(mainPath).length > 0 && Object.keys(mainImages).length > 0 && Object.keys(mainStory).length > 0) {
            const ids = [mainPath.id, mainImages.id, mainStory.id]
            delete mainPath.id;
            delete mainImages.id;
            delete mainStory.id;
            const mainObj = {
                mainPath,
                mainImages,
                mainStory,
                storyTime: Date.now(),
                userId: userObj.uid,
            }
            mainSave(mainObj, ids);
        }
        else {
            alert("error");
        }
    }

    const mainSave = async (mainObj, ids) => {
        const storyId = uuidv4();
        const userInfo = await dbService.collection(`userInfo`).doc(`${userObj.uid}`).get();
        const userData = userInfo.data();
        const userStories = userData.stories;
        userStories[storyId] = Date.now();

        await dbService.collection(`story_box`).doc(`${storyId}`).set(mainObj);
        await dbService.collection(`userInfo`).doc(`${userObj.uid}`).update({ stories: userStories });
        await dbService.doc(`temp_path/${ids[0]}`).delete();
        await dbService.doc(`temp_image/${ids[1]}`).delete();
        await dbService.doc(`temp_story/${ids[2]}`).delete();
        imageSave(storyId);
    }

    const imageSave = (storyId) => {
        mainImages.imageId.forEach(async (id, index) => {
            await dbService.collection(`image_box`).doc(`${id}`).set({
                attachmentId: mainImages.attachmentArray[index],
                storyId,
            });
            await dbService.collection(`imageLike`).doc(`${id}`).set({
            });
            await dbService.collection(`imageComment`).doc(`${id}`).set({
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
                        part === "image" ? <Addimage movePath={movePath} moveStory={moveStory} mainImages={mainImages} /> :
                            part === "story" ? <Addstory moveImg={moveImg} mainImages={mainImages} mainCon={mainCon} /> : null}
                </AddContainer>
                <SaveContainer>
                    {part === "story" ?
                        <BtnStyle onClick={onSubmit}>스토리 저장</BtnStyle>
                        : null}
                </ SaveContainer>
            </GridContainer>
        </>
    )
});

export default AddPresenter;