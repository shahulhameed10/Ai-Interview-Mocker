import React from "react";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
