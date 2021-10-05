import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Helmet from "react-helmet";

import { dbService } from "fbase";

const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
`;

const Imagebox = styled.div`
    display: inline-flex;
    border-radius: 2;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 200px;
    height: 200px;
    padding: 4px;
    box-sizing: border-box;
`;

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const GalleryPresenter = () => {
    const history = useHistory();
    const isMounted = useRef(false);

    const [images, setImages] = useState([]);

    useEffect(() => {
        isMounted.current = true;

        dbService.collection("story_box").onSnapshot((snapshot) => {
            const boxArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            boxArray.forEach(box => {
                box.mainImages[0].attachmentArray.forEach((attachment, index) => {
                    const imageObj = {
                        storyId: box.id,
                        imgId: box.mainImages[0].imageId[index],
                        attachmentArray: attachment,
                    }
                    setImages((prev) => [imageObj, ...prev]);
                })
            });
        });

        return () => (isMounted.current = false);
    }, []);
    return (
        <>
            <Helmet>
                <title>Gallery | BYHOON</title>
            </Helmet>
            <ImageContainer>
                {images.length > 0 ?
                    (images.map((img) => (
                        <Imagebox key={img.imgId}>
                            <Img src={img.attachmentArray} />
                        </Imagebox>
                    ))) : null}
            </ImageContainer>
        </>

    )
};

export default GalleryPresenter;