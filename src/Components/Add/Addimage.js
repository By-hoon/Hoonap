import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dbService } from "fbase";
import { Icon } from "@iconify/react";

const IconStyle = styled.div`
    color: black;
    &:hover{
        color: aqua;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
`

const MoveLink = styled(Link)`
    width: 30px;
    height: 30px;
`;

const Addimage = (props) => {
    return (
        <>
            <h3>Image</h3>
            <LinkContainer>
                <MoveLink to="/add/path">
                    <IconStyle>
                        <Icon icon="akar-icons:circle-chevron-left" onClick={props.movePath} width="30px" height="30px" />
                    </IconStyle>
                </MoveLink>
                <MoveLink to="/add/story">
                    <IconStyle>
                        <Icon icon="akar-icons:circle-chevron-right" onClick={props.moveStory} width="30px" height="30px" />
                    </IconStyle>
                </MoveLink>
            </LinkContainer>
        </>
    )
}

export default Addimage;