import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import logo from '../image/LOGO.png';

import { authService, firebaseInstance, dbService } from "fbase";

const Logo = styled.img.attrs({
    src: logo,
})`
    width: 600px;
    height: auto;
    animation: rotatescale 1.5s linear 1 ;
    @keyframes rotatescale{
    0%{
        transform:perspective(300px) rotateZ(0) scale(0.1,0.1);
        opacity: 0.3;
    }
    100%{
        transform:perspective(300px) rotateZ(360deg) scale(1,1);
        opacity: 1;
    }
}
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const AuthBtns = styled.div`
    opacity: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 520px;
    animation: appear 1s linear 1 forwards;
    animation-delay: 1.5s;
    @keyframes appear{
        to{opacity: 1;}
    }
`;

const AuthBtn = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 0px;
  font-size: 20px;
  text-align: center;
  width: 250px;
  background: white;
  cursor: pointer;
  border: solid 3px #74b9ff;
`;

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        if (data.additionalUserInfo.isNewUser) {
            await dbService.collection(`userInfo`).doc(`${data.user.uid}`).set({
                userName: data.user.displayName,
                profileAttachment: "",
                stories: {},
                scraps: {},
                comments: {},
                likes: {},
            });
        }
    };
    return (
        <AuthContainer>
            <Logo />
            <AuthBtns>
                <AuthBtn onClick={onSocialClick} name="google">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </AuthBtn>
                <AuthBtn onClick={onSocialClick} name="github">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </AuthBtn>
            </AuthBtns>
        </AuthContainer>
    );
};
export default Auth;