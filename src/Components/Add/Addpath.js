import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap, Polygon } from 'react-naver-maps';
import { Icon } from "@iconify/react";

import { dbService } from "fbase";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 250px 50px;
    margin-left: 40px;
    margin-bottom: 20px;
`;

const MapContainer = styled.div`
`

const CheckContainer = styled.div``;

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
    margin-left: 50px;
`;

const BtnStyle = styled.span`
    position: relative;
    display: inline-block;
    padding: 12px 36px;
    margin: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    text-transform: uppercase;
    outline-style: none;
    border: 1px solid white;
    overflow: hidden;
    cursor: pointer;
    &:hover{
        transition: 0.5s ease-in-out;
        background-color: tomato;
    }
    animation: opacityChange 1s linear 1 ;
        @keyframes opacityChange{
            0%{opacity: 0;}
            100%{opacity: 1;}
    } 
`;

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
        if (paths.lat.length > 0) {
            await dbService.collection("temp_path").add(paths);
            setPreview("off");
            setClick(false);
        }
        else alert("좌표를 입력해주세요");
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
                <ButtonContainer>
                    {preview === "off" && path.length < 1 ?
                        <BtnStyle onClick={onStart}>좌표선택</BtnStyle> :
                        preview === "on" ?
                            <>
                                <br /><br />
                                <BtnStyle onClick={onSubmit}>미리보기</BtnStyle>
                            </>
                            :
                            <>
                                <br /><br /><br /><br />
                                <BtnStyle onClick={onDeleteClick}>삭제</BtnStyle>
                            </>
                    }
                </ButtonContainer>
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