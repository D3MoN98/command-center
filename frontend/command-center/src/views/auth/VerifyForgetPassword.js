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

export default function VerifyForgetPassword() {
  let [hasFormSubmited, setHasFormSubmited] = useState(false);
  const verifyForgetPassword = (e) => {
    e.preventDefault();

    setHasFormSubmited((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Title className="text-center">Verify Account</Card.Title>
              <Card.Body>
                <Card.Text className="text-muted">
                  An email with your verification code has been sent to
                  exa****@co********.com
                </Card.Text>
                <Form onSubmit={verifyForgetPassword}>
                  <Form.Group className="form-group">
                    <Form.Label>Enter 6 digit code below</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="number"
                      onKeyPress={(e) =>
                        !/[0-9]/.test(e.key) ? e.preventDefault() : null
                      }
                      placeholder="123456"
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
                        "Verify"
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
