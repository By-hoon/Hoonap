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

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;

const BlackSpace = styled.div``

const InfoContainer = styled.div`
`;

const FigContainer = styled.figure`
    position: relative;
    display: inline-block;
    margin: 20px;
    max-width: 250px;
    height: 250px;
    width: 100%;
    font-size: 16px;
    box-shadow: none !important;

    &:hover{
        figcaption{
            animation: opacityChange 0.7s linear 1 forwards;
            @keyframes opacityChange{
                0%{opacity: 0;}
                100%{opacity: 1;}
            } 
        }
    }
`;

const FigCaption = styled.figcaption`
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    border-radius: 30%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    top: 0;
    font-size: 60px;
    opacity: 0;
`;

const ProfileImg = styled.img`
    width: 250px;
    height: 250px;
    object-fit: contain;
    border-radius: 30%;
`;

const ProfileNoImg = styled.span``;

const SpanContainer = styled.div`
    position: absolute;
    top: 250px;
    right: -450px;
    display: flex;
    width: 80%;
    text-align: ${props => (props.center ? 'center' : 'none')};
    margin-bottom: 20px;
`;

const ProfileName = styled.span`
    @import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');

    @font-face {
        font-family: 'BBTreeGB';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_nine_@1.1/BBTreeGB.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'BBTreeGB';
    font-size: 25px;
    color: white;
    background-color: #74b9ff;
    padding: 7px;
    border-radius: 10px;
    margin-right: 5px;
`;

const ReviseBtn = styled.div`
    cursor: pointer;
    font-size: 25px;
    padding: 7px;
`;

const ButtonContainer = styled.div`
    margin-left: 70px;
`;

const LogoutBtn = styled.span`
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

//------------------------------------------------------
const ModifyForm = styled.form``;

const ModifyInput = styled.input``;

const ModifyCancle = styled.button``;

const ModifySubmit = styled.input``;

//----------------------------------------------------------
const ActivityContainer = styled.div`
    width: 80%;
    min-width: 1000px;
    height: auto;
`;


const ProfilePresenter = (
    { userInfo, userObj, isOwner, refreshUser, part, storyObj, likeObj, commentObj, imageObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState('');
    const [editing, setEditing] = useState(false);

    const profileChange = () => {

    }

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
            <GridContainer>
                <BlackSpace />
                <div style={{ border: "2px solid #eee", padding: "50px" }}>
                    {Object.keys(userInfo).length > 0 ? (
                        <>
                            <InfoContainer>
                                {isOwner ? (
                                    <>
                                        <FigContainer>
                                            {userInfo.profileAttachment ? (
                                                <ProfileImg src={userInfo.profileAttachment} />
                                            ) : (
                                                <ProfileNoImg>{userInfo.userName[0]}</ProfileNoImg>
                                            )}
                                            <FigCaption>
                                                <Icon icon="si-glyph:arrow-change" />
                                            </FigCaption>
                                        </FigContainer>
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
                                        </ModifyForm>
                                        ) : (
                                            <>
                                                <SpanContainer>
                                                    <ProfileName>{userInfo.userName}</ProfileName>
                                                    <ReviseBtn><Icon icon="si-glyph:arrow-change" onClick={toggleEditing} /></ReviseBtn>
                                                </SpanContainer>
                                            </>
                                        )}
                                        <ButtonContainer>
                                            <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
                                        </ButtonContainer>
                                    </>
                                ) : (
                                    <>
                                        <FigContainer>
                                            {userInfo.profileAttachment ? (
                                                <ProfileImg src={userInfo.profileAttachment} />
                                            ) : (
                                                <ProfileNoImg>{userInfo.userName[0]}</ProfileNoImg>
                                            )}
                                            <FigCaption>
                                                <Icon icon="si-glyph:arrow-change" />
                                            </FigCaption>
                                        </FigContainer>
                                        <SpanContainer>
                                            <ProfileName>{userInfo.userName}</ProfileName>
                                        </SpanContainer>
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
                </div>
                <BlackSpace />
            </GridContainer>
        </>
    )
};

export default ProfilePresenter;