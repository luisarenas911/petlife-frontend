import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { fetchUsers } from "../store/user/actions";
import { selectUsers } from "../store/user/selectors";
import { Card, makeStyles, TextField } from "@material-ui/core";
import { FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(4),
  },
  itemn: {
    marginBottom: theme.spacing(5),
  },
}));

export default function VetSearch() {
  const classes = useStyles();
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [vetId, setVetId] = useState("");
  const vets = users.filter((user) => user.isVet);

  useEffect(() => {
    dispatch(fetchUsers);
  }, [dispatch]);
  return (
    <div>
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
          <FormLabel>Serch for a Vet</FormLabel>
          <br />
          <br />
          <TextField
            id="standard-bassic"
            label="Provide a pet ID"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setVetId(e.target.value)}
          ></TextField>
          <br />
          <br />
          <Link to={`/veterinarians/${vetId}`}>
            <Button variant="outlined" color="secondary">
              Search
            </Button>
          </Link>
        </form>
      </Card>
      <br />
      <br />
      <h1>Vets</h1>
      {vets
        ? vets.map((vet) => {
            return (
              <div key={vet.id}>
                <img src={vet.imageUrl} alt={vet.name} width="300" />
                <h3>{vet.name}</h3>
                <h3>{vet.address}</h3>
                <h3>{vet.phone}</h3>
                <h3>{vet.description}</h3>
                <h3>{vet.email}</h3>
              </div>
            );
          })
        : null}
    </div>
  );
}
