import { Button, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="inner">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="inner-landing text-center text-white">
              <h1>Dev Connector</h1>
              <p>
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <Link to="/register">
                <Button className="landing-btn" variant="primary">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button className="landing-btn" variant="light">
                  Login
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Landing;
