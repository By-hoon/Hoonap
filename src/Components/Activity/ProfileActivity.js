import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const ActivityMenu = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

const MenuBtn = styled.span`
    grid-column: span 1;
`;

const MenuLink = styled(Link)`
    border: 1px black solid;
    text-align: center;
    text-decoration: none;
`;

const activity = withRouter(({ location: { pathname }, userInfo, userObj, isOwner }) => {

    return (
        <>
            {isOwner ? (
                <>
                    <ActivityMenu>
                        <MenuLink to={`/profile/${userObj.uid}/stories`}><MenuBtn>Stories</MenuBtn></MenuLink>
                        <MenuLink to={`/profile/${userObj.uid}/likes`}><MenuBtn>Likes</MenuBtn></MenuLink>
                        <MenuLink to={`/profile/${userObj.uid}/comments`}><MenuBtn>Comments</MenuBtn></MenuLink>
                        <MenuLink to={`/profile/${userObj.uid}/scraps`}><MenuBtn>Scraps</MenuBtn></MenuLink>
                    </ActivityMenu>
                </>
            ) : (
                <>

                </>
            )}
        </>
    );
});

export default activity;