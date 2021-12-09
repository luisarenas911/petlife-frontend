import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
//import { selectUser } from "../../store/user/selectors";
import { Link } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  //const user = useSelector(selectUser);
  return (
    <Link to={"/"}>
      <label onClick={() => dispatch(logOut())}>Logout</label>
    </Link>
  );
}
