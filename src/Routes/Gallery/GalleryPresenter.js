import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

import { dbService } from "fbase";

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const ImageContainer = styled.div`
    margin: 40px;
    width: 250px;
    height: 250px;
    border-radius: 10px;
    display: block;
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(${(props) => props.imgUrl}); 
    :after {
        transform: scale(0.95) translateY(36px) translateZ(-30px);
        filter: blur(20px);
        opacity: 0.9;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: inherit; 
        background-size: contain;
        z-index: -1;
        transition: filter .3s ease;
    }
`;

// const LightContainer = styled.div`
//     background: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%,rgba(255,255,255,0) 60%);
//     background-blend-mode: lighten;
//     position: fixed;
//     pointer-events: none;
// `;

const ImageLink = styled(Link)``;

const GalleryPresenter = () => {
    const isMounted = useRef(false);

    const [images, setImages] = useState([]);

    useEffect(() => {
        isMounted.current = true;

        dbService.collection("image_box").onSnapshot((snapshot) => {
            const imageArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            imageArray.forEach(image => {
                setImages((prev) => [image, ...prev]);
            });
        });

        return () => (isMounted.current = false);
    }, []);
    return (
        <>
            <Helmet>
                <title>Gallery | BYHOON</title>
            </Helmet>
            <FlexContainer>
                {images.length > 0 ?
                    (images.map((img) => (
                        <ImageLink key={img.id} to={`/comment/${img.id}`}>
                            <ImageContainer imgUrl={img.attachmentId} />
                            {/* <LightContainer /> */}
                        </ImageLink>
                    ))) : null}
            </FlexContainer>
        </>

    )
};

export default GalleryPresenter;