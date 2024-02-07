import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ServerErrorStyle } from "../assets/css/pagesStyle";

const ServerError = () => {
  return (
    <ServerErrorStyle className="not-found">
      <Container>
      <h1>500 - Server Error</h1>
      <p>Something went wrong please try again later...</p>
      <Link to="/" className="custom-btn btn">Home</Link>
      </Container>
    </ServerErrorStyle>
  );
};

export default ServerError;