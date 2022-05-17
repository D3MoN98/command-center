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
import { authActionCreator } from "../../store/auth";
import FormError from "../components/FormError";

export default function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let [hasFormSubmited, setHasFormSubmited] = useState(false);

  let user = {
    email: {
      value: "sjgalaxy98@gmail.com",
      required: "Email is required",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "invalid email address",
      },
    },
    password: {
      value: "password",
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be atleast 6 characters",
      },
    },
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: "all" });

  const login = (data) => {
    setHasFormSubmited(true);
    dispatch(authActionCreator.loginAction(data))
      .then(() => {
        setHasFormSubmited(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setHasFormSubmited(false);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Title className="text-center">
                Command Center Login
              </Card.Title>

              <Card.Body>
                <Form onSubmit={handleSubmit(login)}>
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
                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="******"
                      className={errors.password ? "is-invalid" : ""}
                      {...register("password", user.password)}
                    />
                    <FormError errors={errors} name="password" />
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
                        "Login"
                      )}
                    </Button>
                  </Form.Group>
                  <Card.Text className="text-center">
                    <Link to="/forget-password" className="link">
                      Forget Password?
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
