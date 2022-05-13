import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import React, { useState } from "react";
import { Card, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Header from "../includes/Header";

export default function Dashboard() {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let [isNavbarCollapsed, setIsNavbarFullWidth] = useState(false);

  const toggleDropdown = (e) => {
    let _this = e.target;
    let target = document.querySelector(_this.getAttribute("data-target"));
    target.style.display = target.style.display == "block" ? "none" : "block";
  };

  const toggleNavbar = (e) => {
    setIsNavbarFullWidth((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <Toaster position="bottom-center" duration="4000" />

      <Header />

      <Container fluid>
        <Row>
          <Col className="sidebar-col" md={!isNavbarCollapsed ? 4 : 1}>
            <div
              className={!isNavbarCollapsed ? "sidebar" : "sidebar collapsed"}
            >
              <div className="sidebar-wrapper">
                <div className="logo">
                  <div className="logo-img">
                    <img src="http://via.placeholder.com/128x128" alt="..." />
                  </div>
                  <a
                    className="author-name"
                    href="http://www.creative-tim.com"
                  ></a>
                </div>
                <div className="navs">
                  <Nav>
                    <Nav.Link>
                      <FontAwesomeIcon icon="fa-solid fa-table-cells-large" />
                    </Nav.Link>
                    <Nav.Link>
                      <FontAwesomeIcon icon="fa-solid fa-users" />
                    </Nav.Link>
                    <Nav.Link>
                      <FontAwesomeIcon icon="fa-solid fa-envelope" />
                    </Nav.Link>
                    <Nav.Link>
                      <FontAwesomeIcon icon="fa-solid fa-table-columns" />
                    </Nav.Link>
                    <Nav.Link>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
                    </Nav.Link>

                    <Nav.Link>
                      <FontAwesomeIcon icon="fa-solid fa-gear" />
                    </Nav.Link>
                  </Nav>

                  <Nav>
                    <h6>Users, Roles, Permissions</h6>

                    <Nav.Link>Users</Nav.Link>
                    <Nav.Link>Roles</Nav.Link>
                    <Nav.Link>Permissions</Nav.Link>
                  </Nav>
                </div>
              </div>
              {/* <Button className="hamburger-btn" onClick={toggleNavbar}>
                {!isNavbarCollapsed ? (
                  <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                ) : (
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                )}
              </Button> */}
            </div>
          </Col>
          <Col md={!isNavbarCollapsed ? 3 : 1}></Col>
          <Col className="main" md={!isNavbarCollapsed ? 9 : 11}>
            {[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }].map((e, i) => (
              <Row key={i}>
                <Col md={12}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>
                        Card Title <FontAwesomeIcon icon="fa-solid fa-info" />
                      </Card.Title>
                      <hr />
                      <Table borderless responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
