import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authActionCreator } from "../../store/auth";
import FormError from "../components/FormError";

export default function Profile() {
  let authUser = useSelector((state) => state.auth.authUser);
  let dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  useEffect(() => {
    setValue("name", authUser.name);
    setValue("email", authUser.email);
    setValue("contact_no", authUser.contact_no);
  }, [authUser]);

  const profileEdit = (data) => {
    dispatch(authActionCreator.profileEditAction(data)).catch((error) => {
      if (error.response.status == 422) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          if (Object.hasOwnProperty.call(errors, key)) {
            setError(key, {
              type: "server",
              message: errors[key].join(", "),
            });
          }
        }
      }
    });
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                Edit Profile <FontAwesomeIcon icon="fa-solid fa-info" />
              </Card.Title>
              <Form onSubmit={handleSubmit(profileEdit)}>
                <Form.Group className="form-group">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("name", {
                      required: "Name field is required.",
                    })}
                    className={errors.name ? "is-invalid" : ""}
                  />
                  <FormError errors={errors} name="name" />
                </Form.Group>{" "}
                <Form.Group className="form-group">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", {
                      required: "Email field is required.",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email address is not valid.",
                      },
                    })}
                    className={errors.email ? "is-invalid" : ""}
                  />
                  <FormError errors={errors} name="email" />
                </Form.Group>{" "}
                <Form.Group className="form-group">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type="tel"
                    {...register("contact_no", {
                      required: "Contact No field is required.",
                      pattern: {
                        value:
                          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                        message: "Contact no is not valid.",
                      },
                    })}
                    className={errors.contact_no ? "is-invalid" : ""}
                  />
                  <FormError errors={errors} name="contact_no" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
