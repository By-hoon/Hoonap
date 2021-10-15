import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommnetPresenter from "./CommnetPresenter";

import { dbService } from "fbase";

export default () => {
    const { id } = useParams();
    const [images, setImages] = useState({});

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        dbService.doc(`image_box/${id}`).onSnapshot((snapshot) => {
            const imageObj = snapshot.data();
            if (isMounted.current) {
                setImages(imageObj);
            }
        });

        return () => (isMounted.current = false);
    }, []);

    return (
        <>
            <CommnetPresenter images={images} />
        </>
    )
}