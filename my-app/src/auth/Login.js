import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <Row className="justify-content-center py-5">
      <Col md={6}>
        <h1 className="mb-3">Sign In</h1>
        <h4 className="mb-3">
          <i className="fas fa-user"></i> Sign Into Your Account
        </h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-none"
              placeholder="Email Address"
            />
            <Form.Text>
              The site uses gravatar, so if you want a profile picture use your
              gravatar email
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-none"
              placeholder="Password"
            />
          </Form.Group>
          <Button type="submit" className="mb-3 shadow-none site-button">
            Login
          </Button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
