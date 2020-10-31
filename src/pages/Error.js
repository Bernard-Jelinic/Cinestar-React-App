import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <Link to="/" className="error">
      <h1>404</h1>
      <div></div>
      <p>Page Not Found</p>
      Povratak na početak
    </Link>
  );
}

export default Error;
