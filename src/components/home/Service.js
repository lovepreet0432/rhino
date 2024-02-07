import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import scannerthumb from "../../assets/images/scannerthumb.png";
import pricing_calculator from "../../assets/images/pricing_calculator.png";
import productivity from "../../assets/images/productivity.png";
import exporting from "../../assets/images/exporting.PNG";
import { ServiceStyle } from "../../assets/css/homeStyle";

const Service = ({ services }) => {

  const serviceData = [ scannerthumb,pricing_calculator, productivity, exporting ];

  return (
    <ServiceStyle className="service" data-aos="fade-up" data-aos-duration="1000">
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Row>
              <Col sm={12} className="mb-2">
                <h2>Our service</h2>
              </Col>
              {services.map((service, index) => (
                <Col key={index} sm={6} md={6} lg={3} className="pb-4 d-flex">
                  <div className="card-row">
                    <div className="product-img">
                      <img src={serviceData[index]} />
                      </div>
                    <h4>{service.servicesHeading}</h4>
                    <p>{service.servicesContent}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </ServiceStyle>
  );
};

export default Service;
