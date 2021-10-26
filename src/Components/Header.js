import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../image/LOGO.png';

import { Icon } from '@iconify/react';

const Header = styled.header`
    display:${props => (props.current ? 'none' : 'flex')};
    width: 100%;
    height: auto;
    margin-top: 5px;
    margin-bottom: 50px;
    *{
        box-sizing: border-box;
    }
`;

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 15px 30px 10px 30px;
`;

const Linkbox = styled(Link)`
    text-decoration: none;
`;

const Logo = styled.img.attrs({
    src: logo,
})`
    width: 300px;
    height: auto;

    &:hover{
        animation: rotatex 1s linear infinite ;
        @keyframes rotatex{
            0%{transform: perspective(300px) rotateX(0);}
            100%{transform: perspective(300px) rotateX(360deg);}
    } 
    }
`;

const BtnContainer = styled.div`
    width:150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Addbtn = styled.span`
    font-size: 50px;
    color: #0984e3;
    &:hover{
        font-size: 55px;
    }
`

const ProfileContainer = styled.div`
    width: 50%;
`;

const ProfileImg = styled.img`
    width: 80%;
    height: auto;
    object-fit: contain;
    border-radius: 30%;
    &:hover{
        width: 85%;
    }
`;

export default withRouter(({ location: { pathname }, userObj }) => (
    <Header current={pathname === "/"}>
        <FlexContainer>
            <Linkbox to="/"><Logo /></Linkbox>
            <BtnContainer>
                <Linkbox to="/add/path">
                    <Addbtn><Icon icon="bx:bxs-add-to-queue" /></Addbtn>
                </Linkbox>
                <ProfileContainer>
                    <Linkbox to={`/profile/${userObj.uid}/stories`}>
                        <ProfileImg src={userObj.profileImg} />
                    </Linkbox>
                </ProfileContainer>
            </BtnContainer>
        </FlexContainer>
    </Header>
));

