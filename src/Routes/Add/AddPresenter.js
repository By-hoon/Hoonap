import React, { useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { dbService } from "fbase";
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';

const MapContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`

const SubmitForm = styled.form``;

const SubmitInput = styled.input``;

const AddPresenter = () => {
    const [path, setPath] = useState([]);
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
            <Helmet>
                <title>Add | BYHOON</title>
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
                            pathAdd([e.coord.lat(), e.coord.lng()]);
                        }}
                    >
                    </NaverMap>
                </RenderAfterNavermapsLoaded>
            </MapContainer>
            <SubmitForm onSubmit={onSubmit}>
                <SubmitInput type="submit" value="&rarr;" />
            </SubmitForm>
            {/* {path ? path.map((pa, i) => (
                <span key={i}>{pa.lat}</span>
            )) : null} */}
        </>

    )
};

export default AddPresenter;