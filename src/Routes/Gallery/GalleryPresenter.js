import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';
import { dbService } from "fbase";
import Poly from "Components/Mapoption/Polygon"
import Preview from "Components/Mapoption/Preview"
import { render } from "@testing-library/react";

const MapContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`

const GalleryPresenter = () => {
    const [fillColor, setFillColor] = useState({});
    const [display, setDisplay] = useState({});
    const [path, setPath] = useState([]);
    useEffect(() => {
        dbService.collection("path").onSnapshot((snapshot) => {
            const pathArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const fcArray = snapshot.docs.map((doc) => ({
                id: doc.id,
            }));
            const displayArray = snapshot.docs.map((doc) => ({
                id: doc.id,
            }));

            let fcObj = {};
            let displayObj = {};

            fcArray.forEach(element => {
                fcObj[element.id] = '#ff0000';
            });
            displayArray.forEach(element => {
                displayObj[element.id] = 'off';
            });

            setPath(pathArray);
            setFillColor(fcObj);
            setDisplay(displayObj);
        });
    }, []);

    const fillColorChange = (id) => {
        let fcObj = { ...fillColor };
        fcObj[id] = "#004ff0"
        setFillColor(fcObj);
    };
    const fillColorBack = (id) => {
        let fcObj = { ...fillColor };
        fcObj[id] = '#ff0000';
        setFillColor(fcObj);
    };

    const displayNone = (id) => {
        let displayObj = { ...display };
        displayObj[id] = "off"
        setDisplay(displayObj);
    }

    const displayOver = (id) => {
        let displayObj = { ...display };
        displayObj[id] = "on"
        setDisplay(displayObj);
    }
    return (
        <>
            <Helmet>
                <title>Gallery | BYHOON</title>
            </Helmet>
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
                            alert(e.coord.lat() + ', ' + e.coord.lng());
                        }}
                    >
                        {path ? path.map(pa => {
                            let paths = [];
                            for (let i = 0; i < pa.lat.length; i++) {
                                paths.push({ lat: pa.lat[i], lng: pa.lng[i] })
                            };
                            return (
                                <Poly
                                    key={pa.id}
                                    polyId={pa.id}
                                    fillColorChange={fillColorChange}
                                    fillColorBack={fillColorBack}
                                    displayNone={displayNone}
                                    displayOver={displayOver}
                                    fillColor={fillColor[pa.id]}
                                    paths={paths}
                                />
                            )
                        }) : null}
                    </NaverMap>
                </RenderAfterNavermapsLoaded>
            </MapContainer>
            {display === 'on' ? <Preview /> : null}
        </>

    )
};

export default GalleryPresenter;