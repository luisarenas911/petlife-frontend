import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { Link } from "react-router-dom";
import { addAPet } from "../store/pet/actions";
import { getUserWithStoredToken } from "../store/user/actions";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Button,
  Modal,
  Container,
  FormLabel,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    height: 600,
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
  media: {
    height: 200,
    width: 200,
  },
  media2: {
    height: 300,
  },
  card: {
    marginBottom: theme.spacing(5),
    alignItems: "left",
  },
  div: {
    paddingTop: theme.spacing(10),
  },
  content: {
    alignItems: "left",
  },
  itemn: {
    marginBottom: theme.spacing(5),
  },
}));

export default function MyProfile() {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [petName, setPetName] = useState();
  const [petBreed, setPetBreed] = useState();
  const [petAge, setPetAge] = useState();
  const [petSex, setPetSex] = useState("m");
  const [petImageUrl, setPetImageUrl] = useState();
  const dispatch = useDispatch();

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
    setPetImageUrl(file.url); //put the url in local state, next step you can send it to the backend
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getUserWithStoredToken);
  }, [dispatch]);
  return (
    <div style={{ width: "95vw", margin: "0 auto" }}>
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
        <CardMedia
          className={classes.media}
          image={user.imageUrl}
          title={user.name}
        />
        <div>
          <Typography variant="h6">
            Name {user.name}, ID {user.id}
          </Typography>
          <Typography variant="body1">
            {user.description}Address: {user.address}{" "}
          </Typography>
          <Typography variant="h6">
            Phone: {user.phone}, Email: {user.email}
          </Typography>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            Add a pet
          </Button>
        </div>
        <div>
          <Modal open={open}>
            <Container className={classes.container}>
              <div className={classes.div}>
                <div className={classes.item}>
                  <FormLabel>Add a Pet Form</FormLabel>
                  <br />
                  <br />
                  <TextField
                    id="standard-bassic"
                    label="Pet Name"
                    //defaultValue="type any observations about the procedure made to the pet"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setPetName(e.target.value)}
                  ></TextField>
                  <br />
                  <br />
                  <TextField
                    id="standard-bassic"
                    label="Pet Breed"
                    //defaultValue="type any observations about the procedure made to the pet"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setPetBreed(e.target.value)}
                  ></TextField>
                  <br />
                  <br />
                  <TextField
                    type="number"
                    id="standard-bassic"
                    label="Pet Age"
                    //defaultValue="type any observations about the procedure made to the pet"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setPetAge(e.target.value)}
                  ></TextField>
                  <FormLabel>Pet Sex: </FormLabel>
                  <select onChange={(e) => setPetSex(e.target.value)}>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                </div>
                <br />
                <input type="file" onChange={uploadImage} />
                <br />
                <br />
                <div>
                  <img
                    src={
                      petImageUrl
                        ? petImageUrl
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    }
                    alt="name"
                    width="100"
                  />
                  {petImageUrl ? (
                    <title style={{ fontSize: 20 }}>
                      Succesfully uploaded!
                    </title>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  console.log("DENTRO?!");
                  if (petName && petBreed && petAge && petSex && petImageUrl) {
                    dispatch(
                      addAPet(
                        petName,
                        petBreed,
                        petAge,
                        petSex,
                        petImageUrl,
                        user.token,
                        user.id
                      )
                    );
                    setOpenAlert(true);
                    setPetName("");
                    setPetBreed("");
                    setPetAge("");
                    setPetSex("m");
                    setPetImageUrl("");
                  }
                }}
              >
                Add a pet!
              </Button>
            </Container>
          </Modal>
          <Snackbar
            open={openAlert}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MuiAlert onClose={handleClose} severity="success">
              The pet was added succesfully!
            </MuiAlert>
          </Snackbar>
        </div>
      </Card>

      {user.pets
        ? user.pets.map((pet) => {
            return (
              <Link
                key={pet.id}
                to={`/pets/${pet.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card className={classes.card}>
                  <CardContent className={classes.content}>
                    {/* <CardMedia
                      image={pet.imageUrl}
                      title={pet.name}
                      className={classes.media2}
                    /> */}
                    <img src={pet.imageUrl} alt={pet.name} width="400" />
                    <Typography variant="h6">
                      Pet name: {pet.name}
                      <br /> Age: {pet.age}, breed: {pet.breed}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        : null}
    </div>
  );
}
