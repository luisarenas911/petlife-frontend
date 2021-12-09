import { Button, FormLabel, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Card } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(4),
  },
  itemn: {
    marginBottom: theme.spacing(5),
  },
}));

export default function PetSearch() {
  const classes = useStyles();

  const [petId, setPetId] = useState("");

  useEffect(() => {}, []);
  return (
    <Card
      style={{
        display: "flex",
        width: "65%",
        padding: "10px",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "10% auto 5% auto",
      }}
    >
      <form className={classes.form} autoComplete="off">
        <FormLabel>Serch for a Pet</FormLabel>
        <br />
        <br />
        <TextField
          id="standard-bassic"
          label="Provide a pet ID"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setPetId(e.target.value)}
        ></TextField>
        <br />
        <br />
        <Link to={`/pets/${petId}`}>
          <Button variant="outlined" color="secondary">
            Search
          </Button>
        </Link>
      </form>
    </Card>
  );
}
