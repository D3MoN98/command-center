import React from "react";
import { Card } from 'react-bootstrap';

export default function ExpensesItem (props) {
    return (
      <Card className="my-3 p-3 expense-item">
        <span>{props.item.name} ({props.item.date.toLocaleDateString("en-Us", {month: 'long', day: 'numeric', year: 'numeric'})})</span> <span>Rs {props.item.amount}</span>
      </Card>
    );
}
