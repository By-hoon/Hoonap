import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

const StoryPresenter = ({ error, loading, storyObj }) => {
    console.log(storyObj);
    return (
        <>
            <Helmet>
                <title>Story | BYHOON</title>
            </Helmet>
        </>
    )
};

export default StoryPresenter;