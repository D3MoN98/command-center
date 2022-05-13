import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";

export default function Dashboard(props) {
  return (
    <>
      <Col className="main" md={!props.isNavbarCollapsed ? 9 : 11}>
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
    </>
  );
}
