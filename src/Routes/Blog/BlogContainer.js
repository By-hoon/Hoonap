import React, { useRef, useState, useEffect } from "react";
import BlogPresenter from "./BlogPresenter";

import { dbService } from "fbase";

//  TODO: 댓글 수 좋아요 수 등.. 타이틀 이미지 호버시 보이게 하기.

export default class extends React.Component {
    state = {
        titleIds: null,
        titleImgs: null,
        titleName: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        try {
            const idArray = [], imgArray = [], nameArray = [];
            dbService.collection("story_box").onSnapshot((snapshot) => {
                const boxArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                boxArray.forEach(box => {
                    idArray.push(box.id);
                    imgArray.push(box.mainImages.attachmentArray);
                    nameArray.push(box.mainStory.title)
                });
                this.setState({
                    titleIds: idArray,
                    titleImgs: imgArray,
                    titleName: nameArray,
                });
            });
        } catch {
            this.setState({
                error: "Can't find story information."
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const { titleImgs, titleIds, titleName, error, loading } = this.state;
        return (
            <BlogPresenter
                titleIds={titleIds}
                titleImgs={titleImgs}
                titleName={titleName}
                error={error}
                loading={loading}
            />
        )
    }
}