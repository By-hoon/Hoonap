import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logo from '../image/logo.jpg';

const Header = styled.header`
    width: 100%;
    height: 100px;
    border: 1px solid black;
`;

const LogoLink = styled(Link)``;

const Logo = styled.img.attrs({
    src: logo,
})`
    width: 50px;
    height: 30px;
`;

const SearchBtn = styled.input``;

export default () => (
    <Header>
        <LogoLink to="/"><Logo /></LogoLink>
        <SearchBtn></SearchBtn>
    </Header>
);

