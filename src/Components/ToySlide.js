import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Icon } from "@iconify/react";

import hoonapImg from '../image/hoonap.JPG';
import hooflixImg from '../image/hooflix.JPG';
import hoowitterImg from '../image/hoowitter.JPG'

const Container = styled.div`
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.div``;

const ToyLink = styled(Link)`
    margin: 20px 120px;
    display: flex;
    justify-content: center;
`;


const Image = styled.img`
    width: 1000px;
`;

const IconContainer = styled.div`
`;

const IconStlye = styled.span`
    font-size: 40px;
`;

const NameContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;
const ProjectName = styled.span`
`;

const items = [
    { id: 1, projectName: "Hoonap", url: hoonapImg },
    { id: 2, projectName: "Hoowitter", url: hoowitterImg },
    { id: 3, projectName: "Hooflix", url: hooflixImg },

];

export default class extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            centerMode: true,
        };
        return (
            <Container>
                <StyledSlider {...settings}>
                    {items.map((item, index) => {
                        const toyName = item.projectName.toLowerCase();
                        const toyLink = `/toyprojects/${toyName}`;
                        return (
                            <ImageContainer key={index}>
                                <NameContainer >
                                    <ProjectName>{item.projectName}</ProjectName>
                                    <IconContainer>
                                        {item.projectName === "Hoonap" ? (
                                            <IconStlye>
                                                <Icon icon="vscode-icons:file-type-js-official" style={{ marginRight: 15 }} />
                                                <Icon icon="vscode-icons:file-type-scss" style={{ marginRight: 15 }} />
                                                <Icon icon="vscode-icons:file-type-pug" style={{ marginRight: 15 }} />
                                                <Icon icon="vscode-icons:file-type-node" style={{ marginRight: 15 }} />
                                                <Icon icon="vscode-icons:file-type-mongo" style={{ marginRight: 15 }} />
                                                <Icon icon="logos:heroku-icon" />
                                            </IconStlye>
                                        ) : item.projectName === "Hoowitter" ? (
                                            <IconStlye>
                                                <Icon icon="logos:react" style={{ marginRight: 15 }} />
                                                <Icon icon="logos:firebase" style={{ marginRight: 15 }} />
                                                <Icon icon="bi:github" />
                                            </IconStlye>
                                        ) : (
                                            <IconStlye>
                                                <Icon icon="logos:react" style={{ marginRight: 15 }} />
                                                <Icon icon="logos:netlify" />
                                            </IconStlye>
                                        )}
                                    </IconContainer>
                                </NameContainer>
                                <div>
                                    <ToyLink to={toyLink}>
                                        <Image src={item.url} />
                                    </ToyLink>
                                </div>
                            </ImageContainer>
                        );
                    })}
                </StyledSlider>
            </Container>
        );
    }
}