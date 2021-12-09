import React from "react";
import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <>
      <Link to="/login">
        <label>Login</label>
      </Link>
    </>
  );
}
