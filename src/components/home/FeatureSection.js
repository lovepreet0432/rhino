import React from 'react'
import {  Col, Container, Row } from 'react-bootstrap'
import { FeatureStyle } from '../../assets/css/homeStyle';
import BannerImage from "../../assets/images/mainpicture.png";

const FeatureSection = ({content}) => {
  return (
    <FeatureStyle className='featured-product' data-aos="fade-up" data-aos-duration="1000">
        <Container>
         <Row className='d-flex align-items-center'>
            <Col lg={6} className='text-start order-2 order-sm-1 mt-5 mt-sm-0'>
              <h2>Features of product</h2>
              <p>
              {content}
                </p>
            </Col>
            <Col lg={6} className='text-start order-1 order-sm-2'>
              <img src={BannerImage}/>
           </Col>
         </Row>
        </Container>
    </FeatureStyle>
  )
}

export default FeatureSection;
