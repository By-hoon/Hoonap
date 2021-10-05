import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const MenuContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MenuBox = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1000px;
    max-height: 600px;
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-template-rows: repeat(2, minmax(300px, 1fr));
`;

const MenuItem = styled(Link)`
    grid-column: span 1;
    grid-row: span 1;
    border: black solid 1px;
`;

const IconStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 200px;
    color: #2980b9;
    justify-content: center;
    align-items: center;
`;

const Mainmenu = () => (
    <MenuContainer>
        <MenuBox>
            <MenuItem to="/toyprojects"><IconStyle><Icon icon="mdi:toy-brick" /></IconStyle></MenuItem>
            <MenuItem to="/blog"><IconStyle><Icon icon="brandico:blogger-rect" /></IconStyle></MenuItem>
            <MenuItem to="/gallery"><IconStyle><Icon icon="clarity:image-gallery-solid" /></IconStyle></MenuItem>
            <MenuItem to="/map"><IconStyle><Icon icon="bx:bx-map" /></IconStyle></MenuItem>
            <MenuItem to="/about"><IconStyle><Icon icon="cib:about-me" /></IconStyle></MenuItem>
            <MenuItem to="/board"><IconStyle><Icon icon="mdi:bulletin-board" /></IconStyle></MenuItem>
        </MenuBox>
    </MenuContainer>
);

export default Mainmenu;