import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { signUp } from "../store/user/actions";
import { selectToken } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { Button, makeStyles, TextField } from "@material-ui/core";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "lpsty2kc");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/delvoxvyc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    setImageUrl(file.url);
  };

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();
    dispatch(signUp(name, email, password, address, phone, imageUrl));
    setEmail("");
    setPassword("");
    setName("");
    setAddress("");
    setPhone("");
    setImageUrl("");
  }

  return (
    <Container className={classes.container}>
      <h1 className="mt-5 mb-5">Signup</h1>

      <form className={classes.form} autoComplete="off">
        <div className={classes.item}>
          <TextField
            id="standard-bassic"
            label="type your Name"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <br />
          <br />
          <TextField
            id="standard-bassic"
            label="type your E-mail"
            variant="outlined"
            style={{ width: "100%" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <br />
          <br />
          <TextField
            id="standard-bassic"
            label="type your Password"
            variant="outlined"
            style={{ width: "100%" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <br />
          <br />
          <TextField
            id="standard-bassic"
            label="type your Phone number"
            variant="outlined"
            style={{ width: "100%" }}
            type="number"
            onChange={(e) => setPhone(e.target.value)}
          ></TextField>
          <br />
          <br />
          <TextField
            id="standard-bassic"
            label="type your Address"
            variant="outlined"
            style={{ width: "100%" }}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          ></TextField>
          <br />
          <br />
          <input type="file" onChange={uploadImage} />
          <br />
          <br />
          <div>
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              }
              alt="name"
              width="100"
            />
            {imageUrl ? (
              <title style={{ fontSize: 20 }}>Succesfully uploaded!</title>
            ) : (
              ""
            )}
          </div>
          <br />
          <br />
          <Button variant="outlined" color="secondary" onClick={submitForm}>
            Sign up
          </Button>
        </div>
        <Link to="/login">Click here to log in</Link>
      </form>
    </Container>
  );
}
