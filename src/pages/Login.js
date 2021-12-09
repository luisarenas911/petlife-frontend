import React, { useState, useEffect } from "react";

import { login } from "../store/user/actions";
import { selectToken } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button, makeStyles, TextField } from "@material-ui/core";

import { Container, FormLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 80,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(4),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <Container className={classes.container}>
      <h1 className="mt-5 mb-5">Login</h1>
      <form className={classes.form} autoComplete="off">
        <div className={classes.item}>
          <FormLabel>E-mail</FormLabel>
          <br />
          <br />
          <TextField
            id="standard-bassic"
            label="type your E-mail"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </div>
        <div className={classes.item}>
          <FormLabel>Password</FormLabel>
          <TextField
            id="standard-bassic"
            label="type your password"
            variant="outlined"
            style={{ width: "100%" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </div>

        <Button variant="primary" type="submit" onClick={submitForm}>
          Log in
        </Button>
        <Link to="/signup" style={{ textAlign: "center" }}>
          Click here to sign up
        </Link>
      </form>
    </Container>
  );
}
