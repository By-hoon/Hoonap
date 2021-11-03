import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailPresenter from "./DetailPresenter";

import { dbService } from "fbase";

export default ({ userObj }) => {
    const { id } = useParams();
    const [images, setImages] = useState({});
    const [imageLikes, setImageLikes] = useState({});
    const [imageComments, setImageComments] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [users, setUsers] = useState({});
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState([]);
    const [imageCon, setImageCon] = useState({});

    const isMounted = useRef(false);

    const getTitle = async (storyId) => {
        const storyDoc = await dbService.doc(`story_box/${storyId}`).get();
        const storyObj = storyDoc.data();
        setTitle(storyObj.mainStory.title);
    }

    useEffect(() => {
        isMounted.current = true;

        dbService.doc(`image_box/${id}`).onSnapshot((snapshot) => {
            const imageObj = snapshot.data();
            imageObj['imageId'] = id;
            if (isMounted.current) {
                setImages(imageObj);
                getTitle(imageObj.storyId);
            }
        });

        dbService.doc(`imageLike/${id}`).onSnapshot((snapshot) => {
            const likeObj = snapshot.data();
            if (isMounted.current) {
                setImageLikes(likeObj);
            }
        });

        dbService.doc(`imageComment/${id}`).onSnapshot((snapshot) => {
            const commentObj = snapshot.data();
            if (isMounted.current) {
                setImageComments(commentObj);
                const commentArray = [];
                const userKeys = Object.keys(commentObj);
                userKeys.forEach(userKey => {
                    const dateKeys = Object.keys(commentObj[userKey]);
                    dateKeys.forEach(dateKey => {
                        commentArray.push({
                            comment: commentObj[userKey][dateKey],
                            createdAt: dateKey,
                            createdBy: userKey,
                            imageId: id,
                        });
                    })
                })
                setComments(commentArray);
            }
        });

        dbService.doc(`userInfo/${userObj.uid}`).onSnapshot((snapshot) => {
            const InfoObj = snapshot.data();
            if (isMounted.current) {
                setUserInfo(InfoObj);
            }
        });

        dbService.collection("userInfo").onSnapshot((snapshot) => {
            const InfoObj = {};
            snapshot.docs.forEach(doc => {
                InfoObj[doc.id] = doc.data();
            })
            if (isMounted.current) {
                setUsers(InfoObj);
            }
        });

        dbService.doc(`imageContent/${id}`).onSnapshot((snapshot) => {
            const contentObj = snapshot.data();
            if (isMounted.current) {
                setImageCon(contentObj);
            }
        });

        return () => (isMounted.current = false);
    }, []);

    return (
        <>
            <DetailPresenter
                imageLikes={imageLikes}
                imageComments={imageComments}
                imageObj={images}
                userObj={userObj}
                userInfo={userInfo}
                title={title}
                commentArray={comments}
                users={users}
                imageCon={imageCon}
            />
        </>
    )
}