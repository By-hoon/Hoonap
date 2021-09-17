import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Polygon } from 'react-naver-maps';
import { Icon } from "@iconify/react";

import { dbService } from "fbase";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    margin-left: 40px;
    margin-bottom: 20px;
`;

const MapContainer = styled.div`
`

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

const ButtonContainer = styled.div`

`;

const StartBtn = styled.span``;

const SubmitForm = styled.form``;

const SubmitInput = styled.input``;

const DeleteBtn = styled.span``;

const Addpath = (props) => {
    const isMounted = useRef(false);

    const [path, setPath] = useState([]);
    const [preview, setPreview] = useState("off");
    const [click, setClick] = useState(false);
    useEffect(() => {
        isMounted.current = true;
        dbService.collection("temp_path").onSnapshot((snapshot) => {
            const pathArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            if (isMounted.current) {
                setPath(pathArray);
            }
        });

        return () => (isMounted.current = false);

    }, []);

    let paths = {
        lat: [],
        lng: []
    };
    const onStart = () => {
        setPreview("on");
        setClick(true);
    }
    const pathAdd = (p) => {
        paths['lat'].push(p[0]);
        paths['lng'].push(p[1]);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("temp_path").add(paths);
        setPreview("off");
        setClick(false);
    }
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this polygon?");
        if (ok) {
            await dbService.doc(`temp_path/${path[0].id}`).delete();
        }
    };
    return (
        <>
            <GridContainer>
                <ButtonContainer>
                    {preview === "off" && path.length < 1 ?
                        <StartBtn onClick={onStart}>좌표선택</StartBtn> :
                        preview === "on" ?
                            <SubmitForm onSubmit={onSubmit}>
                                <SubmitInput type="submit" value="미리보기" />
                            </SubmitForm> :
                            <DeleteBtn onClick={onDeleteClick}>삭제</DeleteBtn>
                    }
                </ButtonContainer>
                <MapContainer>
                    <RenderAfterNavermapsLoaded
                        ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
                    >
                        <NaverMap
                            mapDivId={'maps-getting-started-uncontrolled'}
                            style={{
                                width: '100%',
                                height: '70vh',
                            }}
                            clickable={click}
                            defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
                            defaultZoom={12}
                            onClick={(e) => {
                                pathAdd([e.coord.lat(), e.coord.lng()]);
                            }}
                        >
                            {path.length > 0 ? path.map(pa => {
                                let tempPaths = [];
                                for (let i = 0; i < pa.lat.length; i++) {
                                    tempPaths.push({ lat: pa.lat[i], lng: pa.lng[i] })
                                };
                                return (
                                    <Polygon
                                        key={pa.id}
                                        paths={
                                            [tempPaths]
                                        }
                                        fillColor={'#ff0000'}
                                        fillOpacity={0.3}
                                        strokeColor={'#ff0000'}
                                        strokeOpacity={0.6}
                                        strokeWeight={3}
                                    />
                                )
                            }) : null}
                        </NaverMap>
                    </RenderAfterNavermapsLoaded>
                </MapContainer>
            </GridContainer>
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