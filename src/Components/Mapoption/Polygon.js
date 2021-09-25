import React, { Component } from "react";
import styled from "styled-components";
import { Polygon } from 'react-naver-maps';



class Poly extends Component {
    mouseOverHandle = () => {
        this.props.fillColorChange(this.props.polyId)
        this.props.displayOver(this.props.polyId)
    }
    mouseOutHandle = () => {
        this.props.fillColorBack(this.props.polyId)
        this.props.displayNone(this.props.polyId)
    }
    mouseClick = () => {
        this.props.moveStory(this.props.polyId)
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
                onClick={this.mouseClick}
            />
        )
    }
}

export default Poly;