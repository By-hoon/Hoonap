import React, { useState } from "react";
import styled from "styled-components";

import { dbService } from "fbase";
import { Icon } from '@iconify/react';

const CommentContainer = styled.div`
    display: flex;
`;

const CommentSpan = styled.span``;

const ProfileContainer = styled.div``;

const ProfileImage = styled.img``;

const ProfileNoImage = styled.span``;

const ButtonContainer = styled.div``;

//---------------------------------------------------------
const CommentForm = styled.form``;

const CommentInput = styled.input``;

const CommentCancle = styled.button``;

const CommentSubmit = styled.input``;

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
                    {Object.keys(users).length > 0 ? (
                        users[commentObj.createdBy].profileAttachment !== "" ? (
                            <ProfileImage />
                        ) : (
                            <ProfileNoImage>{users[commentObj.createdBy].userName[0]}</ProfileNoImage>
                        )) : null}
                </ProfileContainer>
                {editing ? (
                    <>
                        <CommentForm onSubmit={commentSubmit}>
                            <CommentInput
                                className="factoryInput__input"
                                value={newComment}
                                onChange={onChange}
                                type="text"
                                placeholder="댓글 추가"
                                maxLength={200}
                            />
                            <CommentCancle onClick={onCancle}>취소</CommentCancle>
                            <CommentSubmit
                                type="submit" value="수정"
                            />
                        </CommentForm>
                    </>
                ) : (
                    <>
                        <CommentSpan>{commentObj.comment}</CommentSpan>
                        {isOwner ? (
                            <ButtonContainer>
                                <Icon icon="si-glyph:arrow-change" onClick={toggleEditing} />
                                <Icon icon="fluent:delete-20-filled" onClick={onClickDelete} />
                            </ButtonContainer>
                        ) : null}
                    </>
                )}
            </CommentContainer>
        </>
    );
};

export default Comments;