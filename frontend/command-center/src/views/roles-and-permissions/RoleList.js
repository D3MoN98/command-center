import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { roleActionCreator } from "../../store/role";
import DataTable from "../components/DataTable";

export default function RoleList(props) {
  let dispatch = useDispatch();
  let roles = useSelector((state) => state.role.roles);
  let total = useSelector((state) => state.role.total);
  let totalPage = useSelector((state) => state.role.totalPage);

  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessor: "name",
      },
      {
        header: "Identifier",
        accessor: "identifier",
      },
      {
        header: "Permissions",
        accessor: "permissions",
      },
      {
        header: "",
        accessor: "action",
        disableSortBy: true,
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(roleActionCreator.fetchRolesAction());
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col md={12}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                Roles <FontAwesomeIcon icon="fa-solid fa-info" />
              </Card.Title>
              <hr />
              <DataTable
                tableData={() => {}}
                totalPage={totalPage}
                total={total}
                columns={columns}
                pagination={false}
                search={false}
              >
                {roles.map((role) => {
                  return (
                    <tr key={role.id}>
                      <td>{role.label}</td>
                      <td>{role.name}</td>
                      <td>{role.permissions.length}</td>
                      <td>
                        <Link
                          className="btn btn-link"
                          key={role.id}
                          to={`/role/${role.id}`}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-pencil" />
                        </Link>
                        {/* <Link
                          className="text-danger"
                          key={role.id}
                          to={`/role/${role.id}`}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-trash" />
                        </Link> */}
                      </td>
                    </tr>
                  );
                })}
              </DataTable>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
