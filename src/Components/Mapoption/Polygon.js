import React from "react";
import styled from "styled-components";
import { Polygon } from 'react-naver-maps';


const Poly = (paths) => (
    <Polygon
        paths={
            [paths.paths]
        }
        clickable={true}
        fillColor={'#ff0000'}
        fillOpacity={0.3}
        strokeColor={'#ff0000'}
        strokeOpacity={0.6}
        strokeWeight={3}
    />
)

export default Poly;