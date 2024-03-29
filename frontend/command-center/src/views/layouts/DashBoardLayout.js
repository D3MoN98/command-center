import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import Header from "../includes/Header";
import Sidebar from "../includes/Sidebar";

export default function DashBoardLayout({ children }) {
  let [isNavbarCollapsed, setIsNavbarFullWidth] = useState(false);

  const toggleNavbar = (e) => {
    setIsNavbarFullWidth((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <ReactTooltip
        place="right"
        type="light"
        effect="solid"
        className="shadow-sm"
      ></ReactTooltip>
      <Toaster position="bottom-center" duration="4000" />
      <Header />
      <Container fluid>
        <Row>
          <Sidebar isNavbarCollapsed={isNavbarCollapsed} />

          <Col className="main" md="12" lg={!isNavbarCollapsed ? 9 : 11}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}
