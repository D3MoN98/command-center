import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar(props) {
  let location = useLocation();
  let [subNavType, setSubNavType] = useState("dashboard");

  const navRoutes = [
    {
      head: "dashboard",
      paths: ["dashboard"],
    },
    {
      head: "settings",
      paths: ["user", "role", "permission"],
    },
  ];

  useEffect(() => {
    const segments = location.pathname.split("/");
    const headNav = _.find(navRoutes, function (o) {
      return o.paths.includes(segments[1]);
    });
    setSubNavType(headNav.head);
  }, [location]);

  return (
    <>
      <Col className="sidebar-col" lg={!props.isNavbarCollapsed ? 4 : 1}>
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

                <Nav.Link
                  data-tip="Settings"
                  className="mt-auto"
                  onClick={() => setSubNavType("settings")}
                >
                  <FontAwesomeIcon icon="fa-solid fa-gear" />
                </Nav.Link>
              </Nav>

              <div className="vr"></div>

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
      <Col lg={!props.isNavbarCollapsed ? 3 : 1}></Col>
    </>
  );
}

export const SubNavs = (key = "settings") => {
  switch (key) {
    case "dashboard":
      return (
        <Nav>
          <h6>Dashboard</h6>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : " nav-link"
            }
            to="/dashboard"
          >
            <FontAwesomeIcon icon="fa-solid fa-house-user" /> Home
          </NavLink>
        </Nav>
      );
      break;
    case "settings":
      return (
        <Nav>
          <h6>Users settings</h6>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : " nav-link"
            }
            to="/user"
          >
            <FontAwesomeIcon icon="fa-solid fa-users" /> Users
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : " nav-link"
            }
            to="/role"
          >
            <FontAwesomeIcon icon="fa-solid fa-user-shield" /> Roles
          </NavLink>
          <Nav.Link>
            <FontAwesomeIcon icon="fa-solid fa-user-lock" /> Permissions
          </Nav.Link>
        </Nav>
      );
      break;

    default:
      break;
  }
};
