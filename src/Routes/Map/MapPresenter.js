import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Helmet from "react-helmet";
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';
import { dbService } from "fbase";
import Poly from "Components/Mapoption/Polygon"

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: minmax(500px, 1000px) 800px;
    *{
        box-sizing: border-box;
    }
`;

const NaverContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    margin-right: 20px;
`

//------------------------------------IMAGE PART
const PreviewContainer = styled.div`
    display: grid;
    grid-template-rows: 250px  minmax(250px, 1fr);
    margin-left: 20px;
    margin-right: 20px;
    border: 1px solid #eaeaea;
    box-shadow : 2px 5px 8px #999;
    padding: 20px;
    border-radius: 10px;
`

const ProfileContainer = styled.div`
    display: grid;
    grid-template-columns: 250px 550px;
`;

const ProfileImg = styled.div`
    width: 100%;
    border-radius: 50%;
    display: block;
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(${(props) => props.imgUrl}); 
    :after {
        transform: scale(0.95) translateY(20px) translateZ(-30px);
        border-radius: 50%;
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
`

const ProfileInfoCon = styled.div`
    margin-top: 20px;
    margin-left: 30px;
    padding: 10px;
    display: grid;
`;

const SpanContainer = styled.div`
    width: 80%;
    text-align: ${props => (props.center ? 'center' : 'none')};
    margin-bottom: 20px;
`;

const TitleSpan = styled.span`
    font-size: 30px;
    font-weight: 900;
`;

const ProfileNameSpan = styled.span`
    @import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');

    @font-face {
        font-family: 'BBTreeGB';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_nine_@1.1/BBTreeGB.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'BBTreeGB';
    font-size: 25px;
    color: white;
    background-color: #74b9ff;
    padding: 7px;
    border-radius: 10px;
`;

const LikeContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 80%;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const LikeSpan = styled.span`
    font-size: 15px;
    margin-left: 10px;
`;

const ProfileTimeSpan = styled.span`
    font-size: 15px;
    color: #b2bec3;
`;

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 40px;
`;

const ImageDetail = styled.div`
    display: inline-flex;
    border-radius: 15px;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 160px;
    height: 160px;
    padding: 4px;
    box-sizing: border-box;
`;

const Img = styled.img`
    object-fit: contain;
    border-radius: 15px;
    width: 100%;
    height: 100%;
`;

//---------------------------------------------------------------

const MapPresenter = ({ userObj }) => {
    const history = useHistory();
    const isMounted = useRef(false);

    const [fillColor, setFillColor] = useState({});
    const [display, setDisplay] = useState({});

    const [nowId, setNowId] = useState("");
    const [path, setPath] = useState([]);
    const [images, setImages] = useState({});
    const [ids, setIds] = useState([]);
    const [titles, setTitles] = useState({});
    const [likes, setLikes] = useState({});
    const [created, setCreated] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        isMounted.current = true;

        dbService.collection("story_box").onSnapshot((snapshot) => {
            const boxArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const pathArray = [];
            const imageObj = {};
            const titleObj = {};
            const createdObj = {};
            const likesObj = {};
            const idArray = [];

            let fcObj = {};
            let displayObj = {};

            boxArray.forEach(box => {
                pathArray.push(box.mainPath);
                imageObj[box.id] = {
                    attachmentArray: box.mainImages.attachmentArray,
                    imageId: box.mainImages.imageId,
                }
                createdObj[box.id] = box.userId;
                titleObj[box.id] = box.mainStory.title
                idArray.push(box.id);
                fcObj[box.id] = '#ff0000';
                displayObj[box.id] = 'off';
                likesObj[box.id] = {
                    likes: 0,
                    comments: 0,
                }
                box.mainImages.imageId.forEach(image => {
                    dbService.doc(`imageLike/${image}`).onSnapshot((snapshot) => {
                        if (snapshot) {
                            likesObj[box.id].likes += Object.keys(snapshot.data()).length;
                        }
                    });

                    dbService.doc(`imageComment/${image}`).onSnapshot((snapshot) => {
                        if (snapshot) {
                            Object.keys(snapshot.data()).forEach(uid => {
                                likesObj[box.id].comments += Object.keys(snapshot.data()[uid]).length;
                            })
                        }
                    });
                })
            });
            //---------------------------------------------------
            setPath(pathArray);
            setImages(imageObj);
            setIds(idArray);
            setTitles(titleObj);
            setCreated(createdObj);
            setLikes(likesObj);
            setFillColor(fcObj);
            setDisplay(displayObj);
        });
        dbService.collection(`userInfo`).onSnapshot((snapshot) => {
            const InfoArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const userObj = {};

            InfoArray.forEach(info => {
                userObj[info.id] = {
                    profileImg: info.profileAttachment,
                    userName: info.userName,
                }
            })
            if (isMounted.current) {
                setUser(userObj);
            }
        });

        return () => (isMounted.current = false);
    }, []);

    const fillColorChange = (id) => {
        let fcObj = { ...fillColor };
        fcObj[id] = "#004ff0"
        setNowId(id);
        setFillColor(fcObj);
    };
    const fillColorBack = (id) => {
        let fcObj = { ...fillColor };
        fcObj[id] = '#ff0000';
        setNowId(id);
        setFillColor(fcObj);
    };

    const displayNone = (id) => {
        let displayObj = { ...display };
        displayObj[id] = "off"
        setNowId(id);
        setDisplay(displayObj);
    }

    const displayOver = (id) => {
        let displayObj = { ...display };
        displayObj[id] = "on"
        setNowId(id);
        setDisplay(displayObj);
    }

    const clickPoly = (id) => {
        history.push(`/blog/${id}`);
    }

    return (
        <>
            <Helmet>
                <title>Gallery | BYHOON</title>
            </Helmet>
            <GridContainer>
                <NaverContainer>
                    <RenderAfterNavermapsLoaded
                        ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
                    >
                        <NaverMap
                            mapDivId={'maps-getting-started-uncontrolled'}
                            style={{
                                width: '100%',
                                height: '70vh',
                            }}
                            defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
                            defaultZoom={10}
                        >
                            {path ? path.map((pa, index) => {
                                let paths = [];
                                for (let i = 0; i < pa.lat.length; i++) {
                                    paths.push({ lat: pa.lat[i], lng: pa.lng[i] })
                                };
                                return (
                                    <Poly
                                        key={index}
                                        polyId={ids[index]}
                                        fillColorChange={fillColorChange}
                                        fillColorBack={fillColorBack}
                                        displayNone={displayNone}
                                        displayOver={displayOver}
                                        moveStory={clickPoly}
                                        fillColor={fillColor[ids[index]]}
                                        paths={paths}
                                    />
                                )
                            }) : null}
                        </NaverMap>
                    </RenderAfterNavermapsLoaded>
                </NaverContainer>
                <PreviewContainer>
                    {display[nowId] === 'on' ?
                        (
                            <>
                                <ProfileContainer>
                                    <ProfileImg imgUrl={user[created[nowId]].profileImg} />
                                    <ProfileInfoCon>
                                        <SpanContainer>
                                            <ProfileNameSpan>{user[created[nowId]].userName}</ProfileNameSpan>
                                        </SpanContainer>
                                        <SpanContainer center>
                                            <TitleSpan>{titles[nowId]}</TitleSpan>
                                        </SpanContainer>
                                        <LikeContainer>
                                            <LikeSpan>좋아요 {likes[nowId].likes}개</LikeSpan>
                                            <LikeSpan>댓글 {likes[nowId].comments}개</LikeSpan>
                                        </LikeContainer>
                                        <ProfileTimeSpan>2021년 11월 02일</ProfileTimeSpan>
                                    </ProfileInfoCon>
                                </ProfileContainer>
                                <ImagesContainer>
                                    {
                                        images[nowId].imageId.map((imgId, index) => {
                                            return (
                                                <ImageDetail key={imgId}>
                                                    <Img src={images[nowId].attachmentArray[index]} />
                                                </ImageDetail>
                                            )
                                        })
                                    }
                                </ImagesContainer>
                            </>
                        ) : null}
                </PreviewContainer>
            </GridContainer>
        </>

    )
};

export default MapPresenter;