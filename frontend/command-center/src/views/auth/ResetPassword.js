import { React, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

export default function ReetPassword() {
  let [hasFormSubmited, setHasFormSubmited] = useState(false);
  const reetPassword = (e) => {
    e.preventDefault();

    setHasFormSubmited((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Title className="text-center">Reset Password</Card.Title>
              <Card.Body>
                <Form onSubmit={reetPassword}>
                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="password"
                      placeholder="******"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="password"
                      placeholder="******"
                    />
                  </Form.Group>
                  <Form.Group className="form-group text-center">
                    <Button
                      className={hasFormSubmited ? "w-spinner" : "w-100"}
                      variant="primary"
                      type="submit"
                    >
                      {hasFormSubmited ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </Form.Group>
                  <Card.Text className="text-center">
                    <a href="" className="link">
                      Back to login
                    </a>
                  </Card.Text>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
