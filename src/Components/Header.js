import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header``;

const LogoLink = styled(Link)``;

const SearchBtn = styled.input``;

export default () => (
    <Header>
        <LogoLink to="/"></LogoLink>
        <SearchBtn></SearchBtn>
    </Header>
);

