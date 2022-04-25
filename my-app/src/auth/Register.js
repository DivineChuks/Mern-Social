import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setAlert } from "../action/alert";
import { useDispatch } from "react-redux";
import { registerUser } from "../action/auth";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setAlert("passwords do not match", "danger"));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <Row className="justify-content-center py-5">
      <Col md={6}>
        <h1 className="mb-3">Sign Up</h1>
        <h4 className="mb-3">
          <i className="fas fa-user"></i> Create Your Account
        </h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-none"
              placeholder="Enter Name"
            />
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow-none"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Button type="submit" className="mb-3 shadow-none site-button">
            Register
          </Button>
          <p>
            Don't already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
