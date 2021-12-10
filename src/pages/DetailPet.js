import { useSelector, useDispatch } from "react-redux";
import { selectDetailPet } from "../store/pet/selectors";
import { useEffect, useState } from "react";
import { fetchDetailPet } from "../store/pet/actions";
import { useParams } from "react-router";
import { fetchProcedureTypes } from "../store/procedureType/actions";
import { fetchVets } from "../store/vet/actions";
import { selectProcedureTypes } from "../store/procedureType/selectors";
import { selectVets } from "../store/vet/selectors";
import { postProcedure } from "../store/pet/actions";
import { selectToken } from "../store/user/selectors";
import MuiAlert from "@material-ui/lab/Alert";
import { selectUsers } from "../store/user/selectors";
import { fetchUsers } from "../store/user/actions";

import {
  Button,
  CardContent,
  CardMedia,
  Container,
  Fab,
  FormLabel,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { Card } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
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
  itemn: {
    marginBottom: theme.spacing(5),
  },
  media: {
    height: 200,
    width: 200,
  },
  content: {
    backgroundColor: "#1F90E4",
    color: "white",
    width: "100%",
  },
}));

export default function DetailPet() {
  const classes = useStyles();
  const detailPet = useSelector(selectDetailPet);
  const procedureTypes = useSelector(selectProcedureTypes);
  const petId = parseInt(useParams().id);
  const token = useSelector(selectToken);
  const users = useSelector(selectUsers);

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [vetId, setVetId] = useState(1);
  const [procedureTypeId, setProcedureTypeId] = useState(1);
  const [observations, setObservations] = useState("");
  const dispatch = useDispatch();

  const vets = users.filter((user) => user.isVet);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchDetailPet(petId));
    dispatch(fetchProcedureTypes);
    dispatch(fetchVets);
    dispatch(fetchUsers);
  }, [dispatch, petId]);

  return (
    <div style={{ width: "30vw", margin: "0 auto" }}>
      <h1>Detail page</h1>
      {detailPet ? (
        <div>
          <Card
            style={{
              display: "flex",
              width: "100%",
              padding: "10px",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "10% auto 5% auto",
            }}
          >
            <CardMedia
              className={classes.media}
              image={detailPet.imageUrl}
              title={detailPet.name}
              style={{ minWidth: "80%", width: "30px", height: "200px" }}
            />
            <Typography variant="h6">
              Name {detailPet.name},<br /> ID {detailPet.id}
            </Typography>
            <Typography variant="body1">
              Age {detailPet.age}
              <br />
              Breed: {detailPet.breed}
            </Typography>
          </Card>
          <h2>Medical Procedures</h2>

          {detailPet.procedures.map((p) => {
            return (
              <Card
                key={p.id}
                style={{
                  display: "flex",
                  width: "65%",
                  padding: "2px",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  margin: "1% auto 1% auto",
                }}
              >
                <CardContent className={classes.content}>
                  procedure name: {p.procedureType.name}
                  <br />
                  Observations: {p.observations} <br />
                  Performed by: {p.vet.name}
                  <br />
                  date: {p.createdAt}
                </CardContent>
              </Card>
            );
          })}
          <Tooltip title="add" aria-label="add" onClick={() => setOpen(true)}>
            <Fab color="primary" className={classes.fab}>
              <Add />
            </Fab>
          </Tooltip>
          <Modal open={open}>
            <Container className={classes.container}>
              <form className={classes.form} autoComplete="off">
                <div className={classes.item}>
                  <FormLabel>Add a Procedure Form</FormLabel>
                  <br />
                  <br />
                  <TextField
                    id="standard-bassic"
                    label="Observations"
                    multiline
                    rows={4}
                    //defaultValue="type any observations about the procedure made to the pet"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setObservations(e.target.value)}
                  ></TextField>
                </div>
                <br />
                <br />
                <div className={classes.item}>
                  <FormLabel>Procedure Type: </FormLabel>
                  <select onChange={(e) => setProcedureTypeId(e.target.value)}>
                    {procedureTypes
                      ? procedureTypes.map((pt) => (
                          <option key={pt.id} value={pt.id}>
                            {pt.name}
                          </option>
                        ))
                      : null}
                  </select>
                  <br />
                  <br />
                </div>
                <div className={classes.item}>
                  {/* <TextField select label="Vet" value="Gloria Clarck">
                    {vets
                      ? vets.map((vet) => (
                          <MenuItem key={vet.id} value={vet.id}>
                            {vet.name}
                          </MenuItem>
                        ))
                      : null}
                    <MenuItem value="option 1">"option 1"</MenuItem>
                    <MenuItem value="option 2">"option 2"</MenuItem>
                    <MenuItem value="option ">"option 1"</MenuItem>
                  </TextField> */}
                  <FormLabel>Vet: </FormLabel>
                  <select onChange={(e) => setVetId(e.target.value)}>
                    {vets
                      ? vets.map((vet) => (
                          <option key={vet.id} value={vet.id}>
                            {vet.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <br />
                <br />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    if (observations !== "") {
                      setOpenAlert(true);
                      dispatch(
                        postProcedure(
                          procedureTypeId,
                          observations,
                          vetId,
                          petId,
                          token
                        )
                      );
                      setObservations("");
                      setVetId(1);
                      setProcedureTypeId(1);
                      dispatch(fetchDetailPet(petId));
                    }
                  }}
                >
                  Submit
                </Button>
              </form>
            </Container>
          </Modal>
          <Snackbar
            open={openAlert}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MuiAlert onClose={handleClose} severity="success">
              The procedure was added succesfully
            </MuiAlert>
          </Snackbar>
        </div>
      ) : null}
    </div>
  );
}
