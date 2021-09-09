import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dbService } from "fbase";
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';
import { Icon } from "@iconify/react";

const MapContainer = styled.div`
    display: flex;
    justify-content: center;
`

const SubmitForm = styled.form``;

const SubmitInput = styled.input``;

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

const Addpath = (props) => {
    let paths = {
        lat: [],
        lng: []
    };
    const pathAdd = (p) => {
        paths['lat'].push(p[0]);
        paths['lng'].push(p[1]);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("path").add(paths);
        paths = {
            lat: [],
            lng: []
        };
    }
    return (
        <>
            <MapContainer>
                <RenderAfterNavermapsLoaded
                    ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
                >
                    <NaverMap
                        mapDivId={'maps-getting-started-uncontrolled'}
                        style={{
                            width: '50%',
                            height: '70vh',
                        }}
                        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
                        defaultZoom={12}
                        onClick={(e) => {
                            pathAdd([e.coord.lat(), e.coord.lng()]);
                        }}
                    >
                    </NaverMap>
                </RenderAfterNavermapsLoaded>
            </MapContainer>
            <SubmitForm onSubmit={onSubmit}>
                <SubmitInput type="submit" />
            </SubmitForm>
            <LinkContainer>
                <MoveLink to="/add/image">
                    <IconStyle>
                        <Icon icon="akar-icons:circle-chevron-right" onClick={props.moveImg} width="30px" height="30px" />
                    </IconStyle>
                </MoveLink>
            </LinkContainer>
        </>

    )
};

export default Addpath;