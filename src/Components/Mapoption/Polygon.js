import React, { Component } from "react";
import styled from "styled-components";
import { Polygon } from 'react-naver-maps';



class Poly extends Component {
    mouseOverHandle = () => {
        this.props.fillColorChange()
        this.props.displayOver()
    }
    mouseOutHandle = () => {
        this.props.fillColorBack()
        this.props.displayNone()
    }
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
                onMouseover={this.mouseOverHandle}
                onMouseout={this.mouseOutHandle}
            />
        )
    }
}

export default Poly;