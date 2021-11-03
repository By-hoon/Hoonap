import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { dbService } from "fbase";
import { Icon } from '@iconify/react';

const CommentContainer = styled.div`
    display: flex;
    padding: 10px;
`;

const SpanContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    border: 1.5px #eee solid;
    border-radius: 10px;
    margin-left: 10px;
`;

const CommentSpan = styled.span`
    margin-left: 3px;
    padding: 7px;
`;

const ProfileContainer = styled.div``;

const ProfileImage = styled.img`
    width: 35px;
    height: auto;
    border-radius: 50%;
`;

const ProfileLink = styled(Link)``;

const ProfileNoImage = styled.span``;

const ButtonContainer = styled.div`
    font-size: 18px;
    padding: 7px;
`;

//---------------------------------------------------------
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

const CommentInput = styled.input`
    border-radius: 8px;
    caret-color: #b2bec3;
    box-sizing: border-box;
    line-height: 15px;
    width: 100%;
    height: 35px;
    font-size: 15px;
    margin-left: 5px;
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

const Comments = ({ commentObj, isOwner, users, imageComments }) => {
    const [editing, setEditing] = useState(false);
    const [newComment, setNewComment] = useState(commentObj.comment);

    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewComment(value);
    };

    const onCancle = (event) => {
        event.preventDefault();
        setEditing((prev) => !prev);
        setNewComment(commentObj.comment);
    }

    const commentSubmit = async (event) => {
        if (newComment === "") {
            return;
        }
        event.preventDefault();

        const imageComment = dbService.doc(`imageComment/${commentObj.imageId}`);
        const userComments = dbService.doc(`userInfo/${commentObj.createdBy}`);
        users[commentObj.createdBy].comments[commentObj.imageId][commentObj.createdAt] = newComment;
        imageComments[commentObj.createdBy][commentObj.createdAt] = newComment;

        await imageComment.set(imageComments);
        await userComments.set(users[commentObj.createdBy]);
        setEditing((prev) => !prev);
    }

    const onClickDelete = async () => {
        const ok = window.confirm(`${newComment} 댓글을 삭제하시겠습니까?`);
        if (ok) {
            const imageComment = dbService.doc(`imageComment/${commentObj.imageId}`);
            const userComments = dbService.doc(`userInfo/${commentObj.createdBy}`);

            delete users[commentObj.createdBy].comments[commentObj.imageId][commentObj.createdAt];
            delete imageComments[commentObj.createdBy][commentObj.createdAt];

            await imageComment.set(imageComments);
            await userComments.set(users[commentObj.createdBy]);
        }
    }

    return (
        <>
            <CommentContainer>
                <ProfileContainer>
                    <ProfileLink to={`/profile/${commentObj.createdBy}/stories`}>
                        {Object.keys(users).length > 0 ? (
                            users[commentObj.createdBy].profileAttachment !== "" ? (
                                <>
                                    <ProfileImage src={users[commentObj.createdBy].profileAttachment} />
                                </>
                            ) : (
                                <ProfileNoImage>{users[commentObj.createdBy].userName}</ProfileNoImage>
                            )) : null}
                    </ProfileLink>
                </ProfileContainer>
                {editing ? (
                    <>
                        <CommentForm onSubmit={commentSubmit}>
                            <InputContainer>
                                <CommentInput
                                    value={newComment}
                                    onChange={onChange}
                                    type="text"
                                    placeholder="댓글 수정"
                                    maxLength={200}
                                />
                            </InputContainer>
                            <BtnContainer><CommentCancle onClick={onCancle}>취소</CommentCancle>
                                <CommentSubmit
                                    type="submit" value="수정"
                                /></BtnContainer>
                        </CommentForm>
                    </>
                ) : (
                    <>
                        <SpanContainer>
                            <CommentSpan>{commentObj.comment}</CommentSpan>
                            {isOwner ? (
                                <ButtonContainer>
                                    <Icon icon="si-glyph:arrow-change" onClick={toggleEditing} />
                                    <Icon icon="fluent:delete-20-filled" onClick={onClickDelete} style={{ marginLeft: "5px" }} />
                                </ButtonContainer>
                            ) : null}
                        </SpanContainer>
                    </>
                )}
            </CommentContainer>
        </>
    );
};

export default Comments;