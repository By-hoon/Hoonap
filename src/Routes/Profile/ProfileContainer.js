import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";

import { dbService } from "fbase";

export default ({ userObj, refreshUser }) => {
    const { id, part } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [storyObj, setStoryObj] = useState({});
    const [likeObj, setLikeObj] = useState({});
    const [commentObj, setCommentObj] = useState({});
    const [imageObj, setImageObj] = useState({});

    const history = useHistory();
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        dbService.doc(`userInfo/${id}`).onSnapshot((snapshot) => {
            const profileObj = snapshot.data();
            if (!profileObj) {
                alert("없는 사용자입니다.");
                history.push("/");
            }
            if (isMounted.current) {
                if (id === userObj.uid) {
                    dbService.collection("imageLike").onSnapshot((snapshot) => {
                        const InfoObj = {};
                        snapshot.docs.forEach(doc => {
                            InfoObj[doc.id] = doc.data();
                        })
                        if (isMounted.current) {
                            setLikeObj(InfoObj);
                        }
                    });

                    dbService.collection("imageComment").onSnapshot((snapshot) => {
                        const InfoObj = {};
                        snapshot.docs.forEach(doc => {
                            InfoObj[doc.id] = doc.data();
                        })
                        if (isMounted.current) {
                            setCommentObj(InfoObj);
                        }
                    });
                    dbService.collection("image_box").onSnapshot((snapshot) => {
                        const InfoObj = {};
                        snapshot.docs.forEach(doc => {
                            InfoObj[doc.id] = doc.data();
                        })
                        if (isMounted.current) {
                            setImageObj(InfoObj);
                        }
                    });
                }
                dbService.collection("story_box").onSnapshot((snapshot) => {
                    const InfoObj = {};
                    snapshot.docs.forEach(doc => {
                        InfoObj[doc.id] = doc.data();
                    })
                    if (isMounted.current) {
                        setStoryObj(InfoObj);
                    }
                });
                setUserInfo(profileObj);
            }
        });

        return () => (isMounted.current = false);
    }, []);

    return (
        <>
            <ProfilePresenter
                userInfo={userInfo}
                userObj={userObj}
                refreshUser={refreshUser}
                isOwner={id === userObj.uid}
                part={part}
                storyObj={storyObj}
                likeObj={likeObj}
                commentObj={commentObj}
                imageObj={imageObj}
            />
        </>
    )
}