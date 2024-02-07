import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import scan from "../../assets/images/scan-sub.svg"
import { ContentStyle } from "../../assets/css/subscriptionStyle";

const Content = () => {
  return (
    <ContentStyle className="content-sec">
      <Container>
        <Row className="align-items-center">
          <Col sm={8} className="order-2 order-sm-1">
            <h2>Bulk Lookup</h2>
            <p>
              Get all the product data you need in a formatted spreadsheet file.
              Do you need to look up a large number of products at once, without
              typing each barcode number individually into our search engine?
              Use our Bulk Lookup service to submit a list of UPC, EAN or ISBN
              codes, manufacturer part numbers with their associated brand and
              product names, or search terms. We'll track them down in our
              database and provide you with detailed product info, all presented
              in a clean, clear, easy-to-read CSV format within 24 to 48 hours.
            </p>
          </Col>

          <Col sm={4} className="text-sm-end text-center pb-4 pb-sm-0  order-1 order-sm-2">
            <img src={scan} />
          </Col>
        </Row>
      </Container>
    </ContentStyle>
  );
};

export default Content;