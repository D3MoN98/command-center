import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Nav } from "react-bootstrap";

export default function Sidebar(props) {
  let [subNavType, setSubNavType] = useState("dashboard");

  return (
    <>
      <Col className="sidebar-col" md={!props.isNavbarCollapsed ? 4 : 1}>
        <div
          className={!props.isNavbarCollapsed ? "sidebar" : "sidebar collapsed"}
        >
          <div className="sidebar-wrapper">
            <div className="logo">
              <div className="logo-img">
                <img src="http://via.placeholder.com/128x128" alt="..." />
              </div>
              <a className="author-name" href="http://www.creative-tim.com"></a>
            </div>
            <div className="navs">
              <Nav>
                <Nav.Link
                  data-tip="Dashboard"
                  onClick={() => setSubNavType("dashboard")}
                >
                  <FontAwesomeIcon icon="fa-solid fa-table-cells-large" />
                </Nav.Link>
                <Nav.Link data-tip="Employees">
                  <FontAwesomeIcon icon="fa-solid fa-users" />
                </Nav.Link>
                <Nav.Link data-tip="Mails">
                  <FontAwesomeIcon icon="fa-solid fa-envelope" />
                </Nav.Link>
                <Nav.Link>
                  <FontAwesomeIcon icon="fa-solid fa-table-columns" />
                </Nav.Link>
                <Nav.Link>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
                </Nav.Link>

                <Nav.Link
                  data-tip="Settings"
                  className="mt-auto"
                  onClick={() => setSubNavType("settings")}
                >
                  <FontAwesomeIcon icon="fa-solid fa-gear" />
                </Nav.Link>
              </Nav>

              {SubNavs(subNavType)}
            </div>
          </div>
          {/* <Button className="hamburger-btn" onClick={toggleNavbar}>
                {!props.isNavbarCollapsed ? (
                  <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                ) : (
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                )}
              </Button> */}
        </div>
      </Col>
      <Col md={!props.isNavbarCollapsed ? 3 : 1}></Col>
    </>
  );
}

export const SubNavs = (key = "settings") => {
  switch (key) {
    case "dashboard":
      return (
        <Nav>
          <h6>Dashboard</h6>

          <Nav.Link to="/dashboard">Home</Nav.Link>
        </Nav>
      );
      break;
    case "settings":
      return (
        <Nav>
          <h6>Users, Roles, Permissions</h6>

          <Nav.Link>Users</Nav.Link>
          <Nav.Link>Roles</Nav.Link>
          <Nav.Link>Permissions</Nav.Link>
        </Nav>
      );
      break;

    default:
      break;
  }
};
