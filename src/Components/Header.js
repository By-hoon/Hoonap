import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logo from '../image/LOGO.png';

const Header = styled.header`
    display: flex;
    width: 100%;
    height: 100px;
    border: 1px solid black;
    margin-bottom: 50px;
`;

const Linkbox = styled(Link)`
    text-decoration: none;
`;

const Logo = styled.img.attrs({
    src: logo,
})`
    width: 300px;
    height: auto;
`;

const Addbtn = styled.span`
    color: #0984e3;
    &:hover{
        cursor: pointer;
        background-color: #74b9ff;
        color: white;
    }
`

const Loginbtn = styled.span`
    color: #0984e3;
    &:hover{
        cursor: pointer;
        background-color: #74b9ff;
        color: white;
    }
`

export default () => (
    <Header>
        <Linkbox to="/"><Logo /></Linkbox>
        <Linkbox to="/add/path"><Addbtn>Add Story</Addbtn></Linkbox>
        <Linkbox to="/login"><Loginbtn>Log in</Loginbtn></Linkbox>
    </Header>
);

