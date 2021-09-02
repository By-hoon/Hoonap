import React, { Component } from "react";
import styled from "styled-components";



const PreviewContainer = styled.div`
    position: absolute;
    top:130px;
    right:0;
    width: 50%;
    height: 85vh;
    box-shadow: 
    0 0 0 3px rgba(71, 154, 191, 0.1) inset,
    0 0 0 10000px rgba(0, 0, 0, 0.637) inset;
    z-index: 10;
`

class Preview extends Component {
    render() {
        return (
            <PreviewContainer />
        )
    }
}

export default Preview;