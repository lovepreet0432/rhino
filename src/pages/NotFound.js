import React from 'react';
import {Link} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { NotFoundStyle } from "../assets/css/pagesStyle";

const NotFound = () => {
  return (
    <NotFoundStyle className="not-found">
      <Container>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="custom-btn btn">Home</Link>
      </Container>
    </NotFoundStyle>
  );
}

export default NotFound;