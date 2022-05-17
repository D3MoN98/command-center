import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard(props) {
  return (
    <>
      <Col className="main" md={!props.isNavbarCollapsed ? 9 : 11}>
        <Row>
          <Col md={4}>
            <Card className="p-3 d-flex flex-row justify-content-around">
              <div className="text-center">
                <h3>356</h3>
                <p>Users</p>
              </div>
              <div className="vr"></div>
              <div className="text-center">
                <h3>3</h3>
                <p>Roles</p>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 d-flex flex-row justify-content-around">
              <div className="text-center">
                <h3>500+</h3>
                <p>Employees</p>
              </div>
              <div className="vr"></div>
              <div className="text-center">
                <h3>100</h3>
                <p>Customers</p>
              </div>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 d-flex flex-row justify-content-center">
              <div className="d-flex flex-column justify-content-around">
                <Link to="/">
                  <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Add new user
                </Link>
                <Link to="/">
                  <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Add new
                  customer
                </Link>
                <Link to="/">
                  <FontAwesomeIcon icon="fa-solid fa-paper-plane" /> Send Offer
                  Letter
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
}
