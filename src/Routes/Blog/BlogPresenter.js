import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

const FigContainer = styled.figure`
    position: relative;
    display: inline-block;
    margin: 20px;
    max-width: 190px;
    width: 100%;
    color: #bbb;
    font-size: 16px;
    box-shadow: none !important;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);

    *,&:before, &:after{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition: all 0.3s linear;
        transition: all 0.3s linear;
    }

    &:before, &:after{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 50%;
        content: '';
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: -1;
        border: 2px solid #bbb;
        border-color: transparent #bbb;
    }
    span{
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-size: 4em;
        z-index: 1;
    }
    a{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }

    &:hover{
        figcaption{
            opacity: 1;
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    }

    &:hover{
        &:before, &:after{
            border-width: 10px;
        }
    }

    &:hover:before{
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    &:hover:after{
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

`;

const TitleImage = styled.img`
  max-width: 100%;
  backface-visibility: hidden;
  vertical-align: top;
  border-radius: 50%;
  padding: 10px;
`;

const FigCaption = styled.figcaption`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 50%;
`;

const BlogPresenter = () => (
    <>
        <Helmet>
            <title>Blog | BYHOON</title>
        </Helmet>
        <FigContainer>
            <TitleImage src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample19.jpg" alt="sq-sample19"></TitleImage>
            <FigCaption><span>i</span></FigCaption>
        </FigContainer>
    </>
);

export default BlogPresenter;