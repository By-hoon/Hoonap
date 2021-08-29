import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
`;

const MenuBox = styled.div`
    width: 1000px;
    height: 100%;
    display: grid;
    border: 1px solid black;
`;

const MenuItem = styled.span``;

const Mainmenu = () => (
    <MenuContainer>
        <MenuBox>
            <MenuItem></MenuItem>
        </MenuBox>
    </MenuContainer>
);

export default Mainmenu;