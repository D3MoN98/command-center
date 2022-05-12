import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActionCreator } from "../../store/auth";

export default function Header() {
  let dispatch = useDispatch();
  let [isSearchBarHidden, setIsSearchBarHidden] = useState(true);
  let navigate = useNavigate();

  const toggleSearchBar = (e) => {
    e.preventDefault();
    setIsSearchBarHidden((prev) => {
      return !prev;
    });
  };

  const logout = () => {
    dispatch(authActionCreator.logoutAction()).then(() => {
      navigate("/login");
    });
  };

  return (
    <Navbar fixed="top">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Form.Control
          type="text"
          placeholder="Placeholder text"
          className={isSearchBarHidden ? "search-input hidden" : "search-input"}
        />

        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link onClick={toggleSearchBar}>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </Nav.Link>
          </Nav.Item>
          <NavDropdown title={<FontAwesomeIcon icon="fa-solid fa-bell" />}>
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={<FontAwesomeIcon icon="fa-solid fa-user" />}>
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
