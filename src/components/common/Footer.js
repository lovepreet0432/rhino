import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FooterStyle } from "../../assets/css/commonStyle";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    // <Wrapper className="footer" data-aos="fade-up" data-aos-duration="500">
    <FooterStyle className="footer" >
      <Container>
        <Row className="justify-content-between">
          <Col className="text-start">
            <div className="ft-heading">Heading</div>
            <ul>
              <li>
                <Link to="/" onClick={scrollToTop}>Home</Link>
              </li>
              <li>
                <Link to="/scan" onClick={scrollToTop}>Scan</Link>
              </li>
              <li>
                <Link to="/subscription" onClick={scrollToTop}>Subscription</Link>
              </li>
            </ul>
          </Col>

          <Col>
            <div className="ft-heading">Social Links</div>
            <ul className="d-flex social-icon">
              <li>
                <Link to="https://www.facebook.com/rhinolister" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link to="https://www.twitter.com/rhinolister" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link to="https://www.tiktok.com/@rhinolister" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col sm={12}>
            <div className="copywrite text-center">
              {" "}
              <p>Copyright All Rights Reserved</p>
            </div>
          </Col>
        </Row>
      </Container>
    </FooterStyle>
  );
};

export default Footer;