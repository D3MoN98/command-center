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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authActionCreator } from "../../store/auth";
import FormError from "../components/FormError";

export default function ResetPassword() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let [hasFormSubmited, setHasFormSubmited] = useState(false);

  let user = {
    email: {
      value: searchParams.get("email"),
    },
    token: {
      value: searchParams.get("token"),
    },
    password: {
      value: null,
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be atleast 6 characters",
      },
    },
    password_confirmation: {
      value: null,
      required: "Password confirmation is required",
      minLength: {
        value: 6,
        message: "Password must be atleast 6 characters",
      },
      validate: (value) => {
        if (watch("password") != value) {
          return "Passwords confirmation did not match";
        }
      },
    },
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({ criteriaMode: "all" });

  const ResetPassword = (data) => {
    setHasFormSubmited(true);
    dispatch(authActionCreator.resetPasswordAction(data))
      .then(() => {
        reset({
          email: null,
          token: null,
          password: null,
          password_confirmation: null,
        });
        setHasFormSubmited(false);
        navigate("/login");
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
              <Card.Title className="text-center">Reset Password</Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit(ResetPassword)}>
                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="password"
                      placeholder="******"
                      className={errors.password ? "is-invalid" : ""}
                      {...register("password", user.password)}
                    />
                    <FormError errors={errors} name="password" />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="password"
                      placeholder="******"
                      className={
                        errors.password_confirmation ? "is-invalid" : ""
                      }
                      {...register(
                        "password_confirmation",
                        user.password_confirmation
                      )}
                    />
                    <FormError errors={errors} name="password_confirmation" />
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
                    <Link to="/login">Back to login</Link>
                  </Card.Text>
                  <input
                    type="hidden"
                    {...register("email", user.email)}
                  ></input>
                  <input
                    type="hidden"
                    {...register("token", user.token)}
                  ></input>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
