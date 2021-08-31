import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../image/logo.jpg';

const Container = styled.div`
    /* overflow:hidden; */
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

// const ImageContainer = styled.div``;

const ToyLink = styled(Link)`
    margin: 20px 120px;
    display: flex;
    justify-content: center;
`;

const Image = styled.img.attrs({
    src: logo,
})`
    width: 55%;
`;

const imgUrl = logo;

const items = [
    { id: 1, projectName: "hoonap", url: imgUrl },
    { id: 2, projectName: "hoowitter", url: imgUrl },
    { id: 3, projectName: "hooflix", url: imgUrl },

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
                    {items.map(item => {
                        const toylink = `/toyprojects/${items.projectName}`;
                        return (
                            <div key={item.id}>
                                <ToyLink to={toylink}>
                                    <Image src={item.url} />
                                </ToyLink>
                            </div>
                        );
                    })}
                </StyledSlider>
            </Container>
        );
    }
}