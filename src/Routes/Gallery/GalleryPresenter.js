import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import { RenderAfterNavermapsLoaded, NaverMap, Polygon } from 'react-naver-maps';
import Poly from "Components/Mapoption/Polygon"
import Preview from "Components/Mapoption/Preview"
import { render } from "@testing-library/react";

const MapContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`

const paths = [
    { lat: 37.37544345085402, lng: 127.11224555969238 },
    { lat: 37.37230584065902, lng: 127.10791110992432 },
    { lat: 37.35975408751081, lng: 127.10795402526855 },
    { lat: 37.359924641705476, lng: 127.11576461791992 },
    { lat: 37.35931064479073, lng: 127.12211608886719 },
    { lat: 37.36043630196386, lng: 127.12293148040771 },
    { lat: 37.36354029942161, lng: 127.12310314178465 },
    { lat: 37.365211629488016, lng: 127.12456226348876 },
    { lat: 37.37544345085402, lng: 127.11224555969238 }
];

class GalleryPresenter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fillColor: '#ff0000',
            display: 'off',
        };
    }

    fillColorChange = () => {
        this.setState({
            fillColor: "#004ff0",
        });
    };
    fillColorBack = () => {
        this.setState({
            fillColor: "#ff0000",
        });
    };

    displayNone = () => {
        this.setState({
            display: 'off',
        });
    }

    displayOver = () => {
        this.setState({
            display: 'on',
        });
    }

    render() {
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
                            <Poly
                                fillColorChange={this.fillColorChange}
                                fillColorBack={this.fillColorBack}
                                displayNone={this.displayNone}
                                displayOver={this.displayOver}
                                fillColor={this.state.fillColor}
                                paths={paths}
                            />
                        </NaverMap>
                    </RenderAfterNavermapsLoaded>
                </MapContainer>
                {this.state.display === 'on' ? <Preview /> : null}
            </>

        )
    }
};

export default GalleryPresenter;