import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThankyouStyle } from "../assets/css/pagesStyle";

const Thankyou = () => {
  return (
    <ThankyouStyle className="thankyou">
      <Container>
        <Row className="justify-content-center">
          <Col sm="6">
            <h2>Thank You !</h2>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making
            </p>

            <p>
              <span>
                <FaCheck />
              </span>
            </p>
            <p>Check Your Email</p>
            <p>Contrary to popular belief, Lorem Ipsum</p>
            {/* <Button className="btn">Back to home page</Button> */}
            <Link className="btn" to="/">
              Back to home page
            </Link>
          </Col>
        </Row>
      </Container>
    </ThankyouStyle>
  );
};

export default Thankyou;