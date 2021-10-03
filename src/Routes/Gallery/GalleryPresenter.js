import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Helmet from "react-helmet";

import { dbService } from "fbase";


const GalleryPresenter = () => {

    return (
        <>
            <Helmet>
                <title>Gallery | BYHOON</title>
            </Helmet>

        </>

    )
};

export default GalleryPresenter;