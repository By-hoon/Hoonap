import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import FullScreen from "Components/FullScreen";
import Comments from "Components/CommentComponents/CommentList";

import { dbService } from "fbase";
import { Icon } from '@iconify/react';

const GridContainer = styled.div`
    min-width: 1200px; 
    display: grid;
    grid-template-columns: 1fr 1100px 1fr;
    box-sizing: border-box;
    *{
        box-sizing: border-box;
    }
`

const BorderContainer = styled.div`
    grid-column: 2/3;
    display: grid;
    grid-template-columns: 550px 550px;
    grid-template-rows: auto auto;
    box-shadow : 2px 2px 5px #999;
    border-radius: 10px;
`

const ImageContainer = styled.div`
    grid-row: 1/2;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    &:hover{
        div{
            opacity: 1;
        }
    }
`;

const Img = styled.img`
    width: 100%;
    border-radius: 10px 0 0 10px;
`;

const ImageButton = styled.div`
    cursor: pointer;
    position: absolute;
    margin: 0px 0px 30px 30px;
    font-size: 20px;
    opacity: 0;
    &:hover{
        span{
            display: inline-block;
        }
    }
`;
const ButtonSpan = styled.span`
    margin-left: 5px;
    display: none;
`;

//--------------------------------------------

const InterContainer = styled.div`
    grid-row: 1/3;
    border-radius: 0% 10px 10px 0%;
    padding: 15px;
`;

const InterBtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    font-size: 25px;
`;

const LikeContainer = styled.div``;

const LikeAnimation = styled.div`
    color: yellow;
    animation: rotatey 1s linear 1 ;
    @keyframes rotatey{
        0%{transform: perspective(300px) rotateY(0);}
        100%{transform: perspective(300px) rotateY(360deg);}
    } 
`;

const OtherBtnContainer = styled.div`
    display: flex;
`;

const ScrapBtn = styled.span`
    display: none;
    font-size: 18px;
`;

const TitleContainer = styled.div`
    text-align: center;
    margin-top:15px;
`;
const TitleSpan = styled.span`
    font-size: 30px;
    font-weight: 900;
`;

const DocContainer = styled.div`
    min-height: 80px;
    margin-top: 50px;
    text-align:center;
    /* overflow: auto; */
`;

const ContentSpan = styled.span`
    font-size: 16px;
`;

//TODO: 댓글 보기 끄기 기능

const CommentContainer = styled.div`
    border-top: 2px dashed #dfe6e9;
`;

const CommentForm = styled.form`
    display: grid;
    padding: 5px;
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    justify-content: center;
`;

const ProfileImage = styled.img`
    width: 35px;
    height: auto;
    border-radius: 50%;
`;

const CommentInput = styled.input`
    border-radius: 8px;
    caret-color: #b2bec3;
    box-sizing: border-box;
    line-height: 15px;
    width: 90%;
    height: 40px;
    font-size: 15px;
    margin-left: 10px;
    &:focus {
        background: azure;
    }
`;

const CommentCancle = styled.button`
    position: relative;
    display: inline-block;
    padding: 6px 12px;
    margin: 10px 0px 10px 5px;
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
        background-color: #74b9ff;
    }
`;

const CommentSubmit = styled.input`
    position: relative;
    display: inline-block;
    padding: 6px 12px;
    margin: 10px 0px 10px 0px;
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
        background-color: #74b9ff;
    }
`;

const ATag = styled.a`
    text-decoration: none;
`;

const DetailPresenter = (
    { userInfo, imageLikes, imageComments, imageObj, userObj, title, commentArray, users, imageCon }
) => {
    const [comment, setCommnet] = useState("");
    const [full, setFull] = useState(false);
    const onFull = () => {
        setFull(true);
    }
    const offFull = () => {
        setFull(false);
    }
    const onClickLike = async () => {
        const imageLike = dbService.doc(`imageLike/${imageObj.imageId}`);
        const userLike = dbService.doc(`userInfo/${userObj.uid}`);
        if (!userInfo.likes[imageObj.imageId]) {
            userInfo.likes[imageObj.imageId] = Date.now();
            imageLikes[userObj.uid] = true;
            await imageLike.set(imageLikes);
            await userLike.set(userInfo);
        }
        else {
            delete userInfo.likes[imageObj.imageId];
            delete imageLikes[userObj.uid];
            await imageLike.set(imageLikes);
            await userLike.set(userInfo);
        }
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setCommnet(value);
    };

    const onCancle = (event) => {
        event.preventDefault();
        setCommnet("");
    }

    const commentSubmit = async (event) => {
        if (comment === "") {
            return;
        }
        event.preventDefault();

        const imageComment = dbService.doc(`imageComment/${imageObj.imageId}`);
        const userComments = dbService.doc(`userInfo/${userObj.uid}`);
        if (!userInfo.comments[imageObj.imageId]) userInfo.comments[imageObj.imageId] = {};
        if (!imageComments[userObj.uid]) imageComments[userObj.uid] = {};
        userInfo.comments[imageObj.imageId][Date.now()] = comment;
        imageComments[userObj.uid][Date.now()] = comment;

        await imageComment.set(imageComments);
        await userComments.set(userInfo);

        setCommnet("");
    }

    return (
        <>
            <Helmet>
                <title>Comment | BYHOON</title>
            </Helmet>
            {full ? <FullScreen attachmentId={imageObj.attachmentId} offFull={offFull} /> : null}
            <GridContainer>
                <BorderContainer>
                    <ImageContainer>
                        <Img src={imageObj.attachmentId} />
                        <ImageButton onClick={onFull}>
                            <Icon icon="akar-icons:full-screen" />
                            <ButtonSpan>이미지 확대</ButtonSpan>
                        </ImageButton>
                    </ImageContainer>
                    <InterContainer>
                        <InterBtnContainer>
                            <LikeContainer>
                                {userInfo ? (userInfo.likes ? (
                                    userInfo.likes[imageObj.imageId] ?
                                        <LikeAnimation>
                                            <Icon icon="bi:star-fill" onClick={onClickLike} style={{ cursor: 'pointer' }} />
                                        </LikeAnimation>
                                        : <Icon icon="bi:star" onClick={onClickLike} style={{ cursor: 'pointer' }} />
                                ) : null) : null}
                            </LikeContainer>
                            <OtherBtnContainer>
                                <ScrapBtn>S</ScrapBtn>
                                {imageObj.video ?
                                    <ATag href={`${imageObj.video}`}>
                                        <Icon icon="dashicons:video-alt3" />
                                    </ATag>
                                    : null}
                            </OtherBtnContainer>
                        </InterBtnContainer>
                        <TitleContainer>
                            <TitleSpan>{title}</TitleSpan>
                        </TitleContainer>
                        <DocContainer>
                            {imageCon ? (
                                <ContentSpan>{imageCon.content}</ContentSpan>
                            ) : <ContentSpan>내용이 없습니다!</ContentSpan>}
                        </DocContainer>
                        <CommentContainer>
                            {commentArray.map((com, index) => {
                                return (
                                    <Comments
                                        key={index}
                                        commentObj={com}
                                        isOwner={com.createdBy === userObj.uid}
                                        users={users}
                                        imageComments={imageComments}
                                    />
                                )
                            })}
                        </CommentContainer>
                        <CommentForm onSubmit={commentSubmit}>
                            <InputContainer>
                                <div><ProfileImage src={`${userObj.profileImg}`} /></div>
                                <CommentInput
                                    value={comment}
                                    onChange={onChange}
                                    type="text"
                                    placeholder="댓글 추가"
                                    maxLength={200}
                                />
                            </InputContainer>
                            <BtnContainer><CommentCancle onClick={onCancle}>취소</CommentCancle>
                                <CommentSubmit
                                    type="submit" value="추가"
                                /></BtnContainer>
                        </CommentForm>
                    </InterContainer>
                </BorderContainer>
            </GridContainer>
        </>
    )
};

export default DetailPresenter;