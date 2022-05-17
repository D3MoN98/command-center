import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Pagination, Table } from "react-bootstrap";
import { useTable } from "react-table";
import {
  usePagination,
  useSortBy,
} from "react-table/dist/react-table.development";

function DataTable({
  data,
  totalPage,
  children,
  tableData,
  columns,
  sort,
  total,
  pagination,
  search,
}) {
  let [searchKeyword, setSearchKeyword] = useState(null);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [],
      },
      manualPagination: true,
      manualSortBy: true,
      pageCount: totalPage,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    tableData({ pageIndex, pageSize, sortBy });
  }, [pageIndex, pageSize, sortBy]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      tableData({ pageIndex, pageSize, sortBy, searchKeyword });
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchKeyword]);

  // Render the UI for your table
  return (
    <>
      {search ? (
        <div className="d-flex justify-content-end my-2">
          <Form.Control
            type="text"
            style={{ width: "50%" }}
            placeholder="Search"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      ) : null}

      <Table borderless responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("header")}
                  {sort ? (
                    column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon="fa-solid fa-sort-down" />
                      ) : (
                        <FontAwesomeIcon icon="fa-solid fa-sort-up" />
                      )
                    ) : null
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {children
            ? children
            : page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </Table>
      {pagination ? (
        <div className="d-flex justify-content-between p-2 mt-3">
          <div>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
              entries <strong>{total}</strong>
            </span>
          </div>
          <Pagination>
            <Pagination.First
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <Pagination.Prev
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <Pagination.Next
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <Pagination.Last
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </Pagination>
        </div>
      ) : null}
    </>
  );
}

DataTable.defaultProps = {
  data: [],
  pagination: true,
  sort: true,
  search: true,
};

export default DataTable;
