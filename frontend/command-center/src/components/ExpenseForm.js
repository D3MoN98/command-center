import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function ExpenseForm() {
  const [expense, setExpense] = useState({
    name: "",
    description: "",
    date: "",
  });

  const nameHandler = (e) => {
    setExpense((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const descriptionHandler = (e) => {
    setExpense((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  const dateHandler = (e) => {
    setExpense((prev) => {
      return {
        ...prev,
        date: e.target.value,
      };
    });
  };

  const create = (e) => {
    e.preventDefault();
    console.log(expense);
    setExpense({
      name: "",
      description: "",
      date: "",
    });
  };

  return (
    <Card className="expense-form my-3 p-3">
      <Form onSubmit={create}>
        <Form.Group className="mb-3">
          <Form.Label>Expense Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={expense.name}
            onChange={nameHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            value={expense.description}
            placeholder="Enter details"
            onChange={descriptionHandler}
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Expense Date</Form.Label>
          <Form.Control
            type="date"
            value={expense.date}
            placeholder="Enter date"
            onChange={dateHandler}
          />
        </Form.Group>
        <Button className="btn-sm" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}
