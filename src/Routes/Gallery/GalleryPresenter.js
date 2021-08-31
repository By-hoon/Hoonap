import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';

const GalleryPresenter = () => (
    <>
        <Helmet>
            <title>Gallery | BYHOON</title>
        </Helmet>
        <RenderAfterNavermapsLoaded
            ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
        >
            <NaverMap
                mapDivId={'maps-getting-started-uncontrolled'}
                style={{
                    width: '70%',
                    height: '80vh',
                }}
                defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
                defaultZoom={10}
            />
        </RenderAfterNavermapsLoaded>

    </>
);

export default GalleryPresenter;