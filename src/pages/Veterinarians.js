import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/user/actions";
import { selectDetailUser } from "../store/user/selectors";
import {
  Card,
  CardMedia,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";

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

export default function Veterinarians() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const detailVet = useSelector(selectDetailUser);

  const vetId = parseInt(useParams().id);

  useEffect(() => {
    dispatch(fetchUser(vetId));
  }, [dispatch, vetId]);

  return (
    <div style={{ width: "120vw", margin: "0 auto" }}>
      <h1>Detail Vet page</h1>

      {detailVet ? (
        <div>
          <Card
            style={{
              display: "flex",
              width: "65%",
              padding: "10px",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "10% auto 5% auto",
              marginLeft: "100px",
            }}
          >
            <CardMedia
              className={classes.media}
              image={detailVet.imageUrl}
              title={detailVet.name}
            />
            <Typography variant="h6">
              Name {detailVet.name},<br /> ID {detailVet.id}
            </Typography>
            <Typography variant="body1">
              {detailVet.description}
              <br />
              Phone: {detailVet.phone}
              <br />
              E-mail: {detailVet.email}
              <br />
              Addres: {detailVet.address}
            </Typography>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
