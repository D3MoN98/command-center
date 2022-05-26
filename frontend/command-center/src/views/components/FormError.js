import { ErrorMessage } from "@hookform/error-message";
import React from "react";

export default function FormError(props) {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ messages, message }) => {
        if (message) {
          return message && <span className="invalid-feedback">{message}</span>;
        } else {
          return (
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <span className="invalid-feedback" key={type}>
                {message}
              </span>
            ))
          );
        }
      }}
    />
  );
}
