import React, { useState, useEffect } from "react";
import PropTypes, { element } from "prop-types";
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

//------------------------------------IMAGE PART
const PreviewContainer = styled.div`
    position: absolute;
    top:130px;
    right:0;
    width: 45%;
    height: 85vh;
    box-shadow: 
    0 0 0 3px rgba(71, 154, 191, 0.1) inset,
    0 0 0 10000px rgba(0, 0, 0, 0.637) inset;
    z-index: 10;
`

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
`;

const ImageDetail = styled.div`
    display: inline-flex;
    border-radius: 2;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 300px;
    height: 300px;
    padding: 4px;
    box-sizing: border-box;
`;

const ImageInner = styled.div`
    display: flex;
    min-width: 0;
    overflow: hidden;
`;

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`;
//---------------------------------------------------------------

const GalleryPresenter = () => {
    const [fillColor, setFillColor] = useState({});
    const [display, setDisplay] = useState({});

    const [nowId, setNowId] = useState("");
    const [path, setPath] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        dbService.collection("story_box").onSnapshot((snapshot) => {
            const boxArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const pathArray = [];
            const imageArray = [];

            boxArray.forEach(box => {
                pathArray.push(box.mainPath);
                imageArray.push(box.mainImages);
            });
            //TODO: image배열에 path의 ID 정보를 넣어주기.
            //---------------------------------------------------

            let fcObj = {};
            let displayObj = {};

            pathArray.forEach(element => {
                fcObj[element[0].id] = '#ff0000';
                displayObj[element[0].id] = 'off';
            })

            //------------------------------------------
            console.log(imageArray);
            setPath(pathArray);
            setImages(imageArray);
            setFillColor(fcObj);
            setDisplay(displayObj);
        });

    }, []);

    const fillColorChange = (id) => {
        let fcObj = { ...fillColor };
        fcObj[id] = "#004ff0"
        setNowId(id);
        setFillColor(fcObj);
    };
    const fillColorBack = (id) => {
        let fcObj = { ...fillColor };
        fcObj[id] = '#ff0000';
        setNowId(id);
        setFillColor(fcObj);
    };

    const displayNone = (id) => {
        let displayObj = { ...display };
        displayObj[id] = "off"
        setNowId(id);
        setDisplay(displayObj);
    }

    const displayOver = (id) => {
        let displayObj = { ...display };
        displayObj[id] = "on"
        setNowId(id);
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
                    >
                        {path ? path.map(pa => {
                            let paths = [];
                            for (let i = 0; i < pa[0].lat.length; i++) {
                                paths.push({ lat: pa[0].lat[i], lng: pa[0].lng[i] })
                            };
                            return (
                                <Poly
                                    key={pa[0].id}
                                    polyId={pa[0].id}
                                    fillColorChange={fillColorChange}
                                    fillColorBack={fillColorBack}
                                    displayNone={displayNone}
                                    displayOver={displayOver}
                                    fillColor={fillColor[pa[0].id]}
                                    paths={paths}
                                />
                            )
                        }) : null}
                    </NaverMap>
                </RenderAfterNavermapsLoaded>
            </MapContainer>
            {display[nowId] === 'on' ?
                (
                    <>
                        <PreviewContainer>
                            <ImagesContainer>

                                {images.length > 0 ? (
                                    images[0][0].imageId.map((imgId, index) => (
                                        <ImageDetail key={imgId}>
                                            <ImageInner>
                                                <Img src={images[0][0].attachmentArray[index]} />
                                            </ImageInner>
                                        </ImageDetail>
                                    ))
                                ) : null}
                            </ImagesContainer>
                        </PreviewContainer>
                    </>
                ) : null}
        </>

    )
};

export default GalleryPresenter;