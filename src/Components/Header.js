import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logo from '../image/logo.jpg';

const Header = styled.header`
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
    width: 50px;
    height: 30px;
`;

const Addbtn = styled.span`
    color: #0984e3;
    &:hover{
        cursor: pointer;
        background-color: #74b9ff;
        color: white;
    }
`

const SearchBtn = styled.input``;

export default () => (
    <Header>
        <Linkbox to="/"><Logo /></Linkbox>
        <SearchBtn></SearchBtn>
        <Linkbox to="/add/path"><Addbtn>Add Story</Addbtn></Linkbox>
    </Header>
);

