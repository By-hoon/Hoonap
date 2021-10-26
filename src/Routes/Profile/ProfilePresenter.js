import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import ActivityMenu from "Components/Activity/ProfileActivity";
import ActStories from "Components/Activity/ActStories";
import ActLikes from "Components/Activity/ActLikes";
import ActComments from "Components/Activity/ActComments";
import ActScraps from "Components/Activity/ActScraps";

import { Icon } from '@iconify/react';
import { authService, dbService } from "fbase";

const InfoContainer = styled.div``;

const ProfileImg = styled.img``;

const ProfileNoImg = styled.span``;

const ProfileName = styled.span``;

const LogoutBtn = styled.span`
    cursor: pointer;
`;

//------------------------------------------------------
const ModifyForm = styled.form``;

const ModifyInput = styled.input``;

const ModifyCancle = styled.button``;

const ModifySubmit = styled.input``;

//----------------------------------------------------------
const ActivityContainer = styled.div`
    width: 80%;
    min-width: 1000px;
    height: 300px;
    border: solid 3px orange;
`;


const ProfilePresenter = (
    { userInfo, userObj, isOwner, refreshUser, part, storyObj, likeObj, commentObj, imageObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState('');
    const [editing, setEditing] = useState(false);
    const toggleEditing = () => {
        setEditing((prev) => !prev);
        setNewDisplayName(userInfo.userName);
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onCancle = (event) => {
        event.preventDefault();
        setEditing((prev) => !prev);
    }

    const onSubmit = async (event) => {
        if (newDisplayName === "") {
            return;
        }
        event.preventDefault();

        if (userObj.displayName !== newDisplayName) {
            const profileUpdate = dbService.doc(`userInfo/${userObj.uid}`);
            await profileUpdate.update({ userName: newDisplayName, })
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
            setNewDisplayName(userInfo.userName);
        }
        setEditing((prev) => !prev);
    }

    const onLogout = () => {
        authService.signOut();
        history.push("/");
    }

    return (
        <>
            <Helmet>
                <title>Profile | BYHOON</title>
            </Helmet>
            {Object.keys(userInfo).length > 0 ? (
                <>
                    <InfoContainer>
                        {isOwner ? (
                            <>
                                {userInfo.profileAttachment ? (
                                    <ProfileImg src={userInfo.profileAttachment} />
                                ) : (
                                    <ProfileNoImg>{userInfo.userName[0]}</ProfileNoImg>
                                )}
                                {editing ? (<ModifyForm onSubmit={onSubmit}>
                                    <ModifyInput
                                        value={newDisplayName}
                                        onChange={onChange}
                                        type="text"
                                        placeholder="이름 변경"
                                        maxLength={20}
                                    />
                                    <ModifyCancle onClick={onCancle}>취소</ModifyCancle>
                                    <ModifySubmit
                                        type="submit" value="수정"
                                    />
                                </ModifyForm>) : (
                                    <>
                                        <ProfileName>{userInfo.userName}</ProfileName>
                                        <Icon icon="si-glyph:arrow-change" onClick={toggleEditing} />
                                    </>
                                )}
                                <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
                            </>
                        ) : (
                            <>
                                {userInfo.profileAttachment ? (
                                    <ProfileImg src={userInfo.profileAttachment} />
                                ) : (
                                    <ProfileNoImg>{userInfo.userName[0]}</ProfileNoImg>
                                )}
                                <ProfileName>{userInfo.userName}</ProfileName>
                            </>
                        )}
                    </InfoContainer>
                    <ActivityContainer>
                        <ActivityMenu
                            userObj={userObj}
                            isOwner={isOwner}
                        />
                        {isOwner ? (
                            <>
                                {part === "stories" ?
                                    <ActStories userObj={userObj} userInfo={userInfo} storyObj={storyObj} /> :
                                    part === "likes" ?
                                        <ActLikes userObj={userObj} userInfo={userInfo} likeObj={likeObj} imageObj={imageObj} /> :
                                        part === "comments" ?
                                            <ActComments userObj={userObj} userInfo={userInfo} commentObj={commentObj} imageObj={imageObj} /> :
                                            part === "scraps" ?
                                                <ActScraps userObj={userObj} userInfo={userInfo} /> : null
                                }
                            </>
                        ) : (
                            <ActStories userObj={userObj} userInfo={userInfo} storyObj={storyObj} />
                        )}

                    </ActivityContainer>
                </>
            ) : null}
        </>
    )
};

export default ProfilePresenter;