import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HomeBannerStyle } from "../../assets/css/homeStyle";
import Thumbnail from "../../assets/images/video-image.png";
const HomeBanner = ({heading,content}) => {
  return (
    <HomeBannerStyle className="banner">
      <Container>
        <Row className="align-items-center">
          <Col sm={6} className="text-start order-2 order-sm-1" data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-uppercase">
            {heading}
            </h1>
            <p>
           {content}
            </p>
            {<Link to="#" className="custom-btn btn-3">
              <span>Read More </span>
            </Link>}
          </Col>
          <Col
            sm={6}
            className="text-end order-1 order-sm-2"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <video width="100%" controls poster={Thumbnail}>
              <source src="/videos/intro.mp4" type="video/mp4" />
            </video>
          </Col>
        </Row>
      </Container>
    </HomeBannerStyle>
  );
};

export default HomeBanner;
