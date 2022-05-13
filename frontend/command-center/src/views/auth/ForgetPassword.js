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
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../../components/FormError";
import { authActionCreator } from "../../store/auth";

export default function ForgetPassword() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [hasFormSubmited, setHasFormSubmited] = useState(false);

  let user = {
    email: {
      value: null,
      required: "Email is required",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "invalid email address",
      },
    },
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: "all" });

  const forgetPassword = (data) => {
    setHasFormSubmited(true);

    dispatch(authActionCreator.forgotPasswordAction(data))
      .then(() => {
        reset({ email: null });
        setHasFormSubmited(false);
      })
      .catch(() => {
        setHasFormSubmited(false);
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Title className="text-center">Forget Password?</Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit(forgetPassword)}>
                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@email.com"
                      className={errors.email ? "is-invalid" : ""}
                      {...register("email", user.email)}
                    />
                    <FormError errors={errors} name="email" />
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
                        "Request Link"
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
