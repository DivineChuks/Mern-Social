import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="main-footer py-5 text-white">
      <Container>
        <Row>
          <Col md={3} className="p-3">
            <img src="" alt="" />
            <p className="text-white">
              Your one-stop shop for all your real estate and fashion needs.
              Whether you want bespoke attires or you need customized
              architectural designs for your housing projects.
            </p>
          </Col>
          <Col md={3} className="mb-3 p-2">
            <h4 className="mb-2">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-3">Home</li>
              <li className="mb-3">About Us</li>
              <li className="mb-3">Services</li>
              <li className="mb-3">Faq</li>
              <li className="mb-3">Contact Us</li>
            </ul>
          </Col>
          <Col md={3} className="mb-3 p-2">
            <h4 className="mb-3">Contacts</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <i className="fas fa-phone"></i>&nbsp; +234 813 099 382
              </li>
              <li className="mb-3">
                <i className="fas fa-envelope"></i>&nbsp;
                contact@richsoftmine.com
              </li>
              <li className="mb-3">
                <i className="fas fa-address-card"></i>&nbsp;{" "}
                <span>Address</span>
                <p className="pt-2">
                  139 ughelli patani road, opposite Matrix filling station,
                  ughelli Delta state
                </p>
              </li>
            </ul>
          </Col>
          <Col md={3} className="p-2">
            <h4 className="mb-3">Newsletter</h4>
            <ul className="list-unstyled">
              <li>
                <p>
                  Sign up our newletter to get update information, news or
                  insight.
                </p>
                <Form>
                  <Form.Group>
                    <Form.Control type="email" className="mb-2" />
                    <div className="d-grid gap-2">
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row className="text-center text-white p-2">
          <Col>
            <span>Copyright &copy; 2022 Devconnector</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
