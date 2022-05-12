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
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  let [hasFormSubmited, setHasFormSubmited] = useState(false);
  const forgetPassword = (e) => {
    e.preventDefault();

    setHasFormSubmited((prev) => !prev);
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Title className="text-center">Forget Password?</Card.Title>
              <Card.Body>
                <Form onSubmit={forgetPassword}>
                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@email.com"
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
                        "Request Password Reset"
                      )}
                    </Button>
                  </Form.Group>
                  <Card.Text className="text-center">
                    <Link to="/login" className="link">
                      Back to login
                    </Link>
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
