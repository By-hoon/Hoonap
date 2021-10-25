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
    grid-template-columns: 1fr 550px 550px 1fr;
    grid-template-rows: auto auto;
    border: 3px solid black;
    box-sizing: border-box;
    *{
        box-sizing: border-box;
    }
`

const ImageContainer = styled.div`
    grid-column: 2/3;
    grid-row: 1/2;
    border: 1px solid tomato;
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
    grid-column: 3/4;
    grid-row: 1/3;
    border: 3px solid aqua;
`;

const InterBtnContainer = styled.div`
    width: 100%;
    border: 3px solid tomato;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    font-size: 25px;
`;

const LikeContainer = styled.div``;

const TitleContainer = styled.div`
    text-align: center;
`;
const TitleSpan = styled.span``;

const DocContainer = styled.div`
    //임시
    height: 200px;
    border: solid 2px violet;
`;

//TODO: 댓글 보기 끄기 기능

const CommentContainer = styled.div`
    border: solid 2px blue;
`;

const CommentForm = styled.form``;

const CommentInput = styled.input``;

const CommentCancle = styled.button``;

const CommentSubmit = styled.input``;


const DetailPresenter = (
    { userInfo, imageLikes, imageComments, imageObj, userObj, title, commentArray, users }
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
                <ImageContainer>
                    <Img src={imageObj.attachmentId} />
                    <ImageButton onClick={onFull}>
                        <Icon icon="akar-icons:full-screen" />
                        <ButtonSpan>dd</ButtonSpan>
                    </ImageButton>
                </ImageContainer>
                <InterContainer>
                    <InterBtnContainer>
                        <LikeContainer>
                            {userInfo.likes ? (
                                userInfo.likes[imageObj.imageId] ?
                                    <Icon icon="bi:star-fill" onClick={onClickLike} /> :
                                    <Icon icon="bi:star" onClick={onClickLike} />
                            ) : null}
                        </LikeContainer>
                        <Icon icon="ls:etc" />
                    </InterBtnContainer>
                    <TitleContainer>
                        <TitleSpan>{title}</TitleSpan>
                    </TitleContainer>
                    <DocContainer></DocContainer>
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
                        <CommentInput
                            value={comment}
                            onChange={onChange}
                            type="text"
                            placeholder="댓글 추가"
                            maxLength={200}
                        />
                        <CommentCancle onClick={onCancle}>취소</CommentCancle>
                        <CommentSubmit
                            type="submit" value="추가"
                        />
                    </CommentForm>
                </InterContainer>
            </GridContainer>
        </>
    )
};

export default DetailPresenter;