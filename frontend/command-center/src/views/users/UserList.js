import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userActionCreator } from "../../store/user";
import DataTable from "../components/DataTable";

export default function UserList(props) {
  let dispatch = useDispatch();
  let users = useSelector((state) => state.user.users);
  let total = useSelector((state) => state.user.total);
  let totalPage = useSelector((state) => state.user.totalPage);
  let [pageIndex, setpageIndex] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  let [sortBy, setSortBy] = useState(null);
  let [searchKeyword, setSearchKeyword] = useState("");

  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessor: "name",
      },
      {
        header: "Email",
        accessor: "email",
      },

      {
        header: "Contact No",
        accessor: "contact_no",
      },
      {
        header: "Status",
        accessor: "status",
      },
      {
        header: "Deleted",
        accessor: "deleted_at",
      },
      {
        header: "Last Login",
        accessor: "last_login_at",
      },
      {
        header: "",
        accessor: "action",
        disableSortBy: true,
      },
    ],
    []
  );

  const tableData = (data) => {
    setpageIndex(data.pageIndex + 1);
    setPageSize(data.pageSize);
    setSortBy(data.sortBy);
    setSortBy(data.sortBy);
    setSearchKeyword(data.searchKeyword);
  };

  useEffect(() => {
    if (sortBy != null) {
      dispatch(
        userActionCreator.fetchUsersAction({
          page: pageIndex,
          per_page: pageSize,
          sort_by: JSON.stringify(sortBy),
          keyword: searchKeyword,
        })
      );
    }
  }, [pageIndex, pageSize, sortBy, searchKeyword]);

  const changeStatus = (id, e) => {
    dispatch(
      userActionCreator.updateUserAction(id, { status: e.target.value })
    ).then((response) => {
      dispatch(
        userActionCreator.fetchUsersAction({
          page: pageIndex,
          per_page: pageSize,
          sort_by: JSON.stringify(sortBy),
        })
      );
    });
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                Users <FontAwesomeIcon icon="fa-solid fa-info" />
              </Card.Title>
              <hr />
              <DataTable
                tableData={tableData}
                totalPage={totalPage}
                total={total}
                columns={columns}
              >
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        <a href="mailto:{user.email}">{user.email}</a>
                      </td>
                      <td>
                        <a href="tel:{user.contact_no}">{user.contact_no}</a>
                      </td>
                      <td>
                        <Form.Select
                          onChange={(e) => changeStatus(user.id, e)}
                          value={user.status ? "1" : "0"}
                        >
                          <option value={1}>Active</option>
                          <option value={0}>In Active</option>
                        </Form.Select>
                      </td>
                      <td>{user.deleted_at}</td>
                      <td>{user.last_login_at}</td>
                      <td>
                        <DropdownButton
                          title={
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                          }
                        >
                          <Dropdown.Item eventKey="1">View</Dropdown.Item>
                          <Dropdown.Item eventKey="2">Edit</Dropdown.Item>
                          <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                        </DropdownButton>
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
