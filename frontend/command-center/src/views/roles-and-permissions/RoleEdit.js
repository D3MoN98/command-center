import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { permissionActionCreator } from "../../store/permission";
import { roleActionCreator } from "../../store/role";

export default function RoleEdit() {
  let params = useParams();
  let role = useSelector((state) => state.role.role);
  let permissions = useSelector((state) => state.permission.permissions);
  let [models, setModels] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(roleActionCreator.fetchRoleAction(params.id));
    dispatch(permissionActionCreator.fetchpermissionsAction());
  }, [dispatch]);

  useEffect(() => {
    setModels(_.uniq(_.map(permissions, "model")));
  }, [permissions]);

  useEffect(() => {
    setValue("name", role.name);
    setValue("label", role.label);
    setValue("description", role.description);
  }, [role]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ criteriaMode: "all" });

  const changePermissionHandler = (e) => {
    dispatch(
      roleActionCreator.setPermisionToRoleAction(
        {
          permission_id: e.target.dataset.permission_id,
          checked: e.target.checked,
        },
        role.id
      )
    );
  };

  const RoleEdit = (data) => {
    dispatch(roleActionCreator.updateRoleAction(data, role.id));
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                Edit Role <FontAwesomeIcon icon="fa-solid fa-info" />
              </Card.Title>
              <Form onSubmit={handleSubmit(RoleEdit)}>
                <Form.Group className="form-group">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    {...register("name")}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Identifier</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    {...register("label")}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    rows={3}
                    {...register("description")}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>

              <hr />

              <Table className="my-5 text-center" borderless responsive>
                {models.map((model) => (
                  <React.Fragment key={model}>
                    <thead>
                      <tr>
                        <th></th>
                        {permissions
                          .filter((permission) => permission.model == model)
                          .map((permission) => (
                            <th key={`th${permission.id}`}>
                              {permission.label}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{_.startCase(_.toLower(model))}</th>
                        {permissions
                          .filter((permission) => permission.model == model)
                          .map((permission) => (
                            <td key={`td${permission.id}`}>
                              <Form.Check
                                checked={
                                  _.findIndex(role.permissions, permission) > -1
                                }
                                data-permission_id={permission.id}
                                onChange={changePermissionHandler}
                                id="checkbox-id"
                              />
                            </td>
                          ))}
                      </tr>
                    </tbody>
                  </React.Fragment>
                ))}
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
