import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommnetPresenter from "./CommnetPresenter";

import { dbService } from "fbase";

export default ({ userObj }) => {
    const { id } = useParams();
    const [images, setImages] = useState({});
    const [imageLikes, setImageLikes] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;

        dbService.doc(`image_box/${id}`).onSnapshot((snapshot) => {
            const imageObj = snapshot.data();
            imageObj['imageId'] = id;
            if (isMounted.current) {
                setImages(imageObj);
            }
        });

        dbService.doc(`imageLike/${id}`).onSnapshot((snapshot) => {
            const likeObj = snapshot.data();
            if (isMounted.current) {
                setImageLikes(likeObj);
            }
        });

        dbService.doc(`userInfo/${userObj.uid}`).onSnapshot((snapshot) => {
            const InfoObj = snapshot.data();
            if (isMounted.current) {
                setUserInfo(InfoObj);
            }
        });

        return () => (isMounted.current = false);
    }, []);

    return (
        <>
            <CommnetPresenter
                imageLikes={imageLikes}
                imageObj={images}
                userObj={userObj}
                userInfo={userInfo}
            />
        </>
    )
}