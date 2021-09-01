import React, { Component } from "react";
import styled from "styled-components";
import { Polygon } from 'react-naver-maps';



class Poly extends Component {
    render() {
        return (
            <Polygon
                paths={
                    [this.props.paths]
                }
                clickable={true}
                fillColor={this.props.fillColor}
                fillOpacity={0.3}
                strokeColor={'#ff0000'}
                strokeOpacity={0.6}
                strokeWeight={3}
                onMouseover={this.props.fillColorChange}
                onMouseout={this.props.fillColorBack}
            />
        )
    }
}

export default Poly;