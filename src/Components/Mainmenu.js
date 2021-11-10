import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const MenuContainer = styled.div`
    width: 100%;
    min-width: 810px;
    height: 1000px;
    min-height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    *{box-sizing: border-box;}
`;

const MenuBox = styled.div`
    position: relative;
    width:100%;
    max-width: 1150px;
    height: 80%;
    max-height: 780px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding-bottom: 30px;
`;

const MainItem = styled.div`
    grid-column: span 1;
    grid-row: span 1;
    animation: ${props => (props.go ? 'opacityChange 1s linear 1' : 'none')};
    opacity: ${props => (props.go ? '1' : '0.3')};
    cursor: pointer;
    &:hover{
        opacity : 1;
    }
    @keyframes opacityChange{
        0%{
            transform: scale(1,1);
            opacity: 0.1;
        }
        50%{
            transform: scale(1.2,1.2);
        }
        100%{
            transform: scale(1,1);
            opacity: 1;
        }
    }
`;

const SubItem = styled.div`
    grid-column: span 1;
    grid-row: span 1;
    animation: ${props => (props.go ? 'opacityChange 1s linear 1' : 'none')};
    opacity: ${props => (props.go ? '1' : '0')};

    @keyframes opacityChange{
        0%{
            transform: scale(1,1);
            opacity: 0.1;
        }
        50%{
            transform: scale(1.2,1.2);
        }
        100%{
            transform: scale(1,1);
            opacity: 1;
        }
    }
`;

const ItemLink = styled(Link)``;

const IconStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 200px;
    color: #2980b9;
    justify-content: center;
    align-items: center;
`;
const IconSpan = styled.span`
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 66px;
    color: #2980b9;
    justify-content: center;
    align-items: center;
`;

const IconImage = styled.img`
    width: 70%;
    height: auto;
    object-fit: contain;
    border-radius: 50%;
`;

const Mainmenu = ({ userObj }) => {
    const [go, setGo] = useState("");
    const mainClick = (value) => {
        setGo(value);
    }

    return (
        <MenuContainer>
            <MenuBox>
                <MainItem go={go === "toy"}
                    onClick={() => {
                        mainClick("toy");
                    }}
                >
                    <IconStyle><Icon icon="mdi:toy-brick" /></IconStyle>
                </MainItem>
                <SubItem
                    go={go === "toy"}
                ><ItemLink to="/toyprojects/hooflix"><IconSpan>Hooflix</IconSpan></ItemLink></SubItem>
                <MainItem go={go === "story"}
                    onClick={() => {
                        mainClick("story");
                    }}
                >
                    <IconStyle><Icon icon="gis:story-map" /></IconStyle>
                </MainItem>
                <SubItem
                    go={go === "profile"}
                ><ItemLink to={`/profile/${userObj.uid}/stories`}>
                        {userObj.profileImg ? (
                            <IconStyle>
                                <IconImage src={userObj.profileImg} />
                            </IconStyle>
                        ) : <IconSpan>Profile</IconSpan>}
                    </ItemLink></SubItem>
                <SubItem
                    go={go === "profile"}
                ><ItemLink to="/add/path"><IconStyle><Icon icon="bx:bxs-add-to-queue" /></IconStyle></ItemLink></SubItem>
                <SubItem
                    go={go === "story"}
                ><ItemLink to="/map"><IconStyle><Icon icon="bx:bx-map" /></IconStyle></ItemLink></SubItem>
                <SubItem
                    go={go === "toy"}
                ><ItemLink to="/toyprojects/hoonap"><IconSpan>Hoonap</IconSpan></ItemLink></SubItem>
                <SubItem
                    go={go === "story"}
                ><ItemLink to="/gallery"><IconStyle><Icon icon="clarity:image-gallery-solid" /></IconStyle></ItemLink></SubItem>
                <SubItem
                    go={go === "story"}
                ><ItemLink to="/blog"><IconStyle><Icon icon="carbon:blog" /></IconStyle></ItemLink></SubItem>
                <MainItem go={go === "profile"}
                    onClick={() => {
                        mainClick("profile");
                    }}
                >
                    <IconStyle><Icon icon="gg:profile" /></IconStyle>
                </MainItem>
                <SubItem
                    go={go === "toy"}
                ><ItemLink to="/toyprojects/hoowitter"><IconSpan>Hoowitter</IconSpan></ItemLink></SubItem>
                <MainItem>
                    <ItemLink to="/board">
                        <IconStyle><Icon icon="mdi:bulletin-board" /></IconStyle>
                    </ItemLink>
                </MainItem>
            </MenuBox>
        </MenuContainer>
    )
};

export default Mainmenu;