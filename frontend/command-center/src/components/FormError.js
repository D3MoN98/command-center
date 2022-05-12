import { ErrorMessage } from "@hookform/error-message";
import React from "react";

export default function FormError(props) {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <span className="invalid-feedback" key={type}>
            {message}
          </span>
        ))
      }
    />
  );
}
