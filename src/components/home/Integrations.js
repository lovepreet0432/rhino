import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { IntegrationStyle } from '../../assets/css/homeStyle';

const Integrations = ({ shopifyList, ebayList, hibidList, amazonList, whatnotList }) => {

  return (
    <IntegrationStyle className='Integrations' data-aos="fade-up" data-aos-duration="1000">
      <Container>
        <Row className='align-items-center'>
          <Col sm={12} className="text-start pb-4">
            <h2>Export Integrations</h2>
          </Col>
        </Row>
        <Row className='align-items-center'>

          <Col md={2} className="text-center">
            <Card className='card-row'>
              <div className='logo-shop'> <h4>Shopify</h4> </div>
              {/* <p>Export Directly to Your Online Store</p> */}
              <ul>
                {shopifyList.map((featureList, index) => (
                  <li key={`shopify-${index}`}>{featureList}</li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col md={2} className="text-center">
            <Card className='card-row'>
              <div className='logo-shop'><h4>eBay</h4></div>
              {/* <p>Direct Export Coming Soon</p> */}
              <ul>
                {ebayList.map((featureList, index) => (
                  <li key={`ebay-${index}`}>{featureList}</li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col md={2} className="text-center">
            <Card className='card-row'>
              <div className='logo-shop'><h4>HiBiD</h4></div>
              {/* <p>Hi-Bid Export Template Available</p> */}
              <ul>
                {hibidList.map((featureList, index) => (
                  <li key={`hibid-${index}`}>{featureList}</li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col md={2} className="text-center">
            <Card className='card-row'>
              <div className='logo-shop'><h4> Amazon </h4> </div>
              {/* <p>Amazon Support Coming Soon</p> */}
              <ul>
                {amazonList.map((featureList, index) => (
                  <li key={`amazon-${index}`}>{featureList}</li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col md={2} className="text-center">
            <Card className='card-row'>
                <div className='logo-shop'> <h4>WhatNot</h4></div>
                {/* <p>WhatNot Export Template Available</p> */}
                <ul>
                  {whatnotList.map((featureList, index) => (
                    <li key={`whatnot-${index}`}>{featureList}</li>
                  ))}
                </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </IntegrationStyle>
  )
}

export default Integrations;