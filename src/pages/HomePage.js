import { useSelector, useDispatch } from "react-redux";
import { fetchVets } from "../store/vet/actions";
import { useEffect } from "react";
import { selectVets } from "../store/vet/selectors";

import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
  },
  card: {
    marginBottom: theme.spacing(5),
  },
  div: {
    paddingTop: theme.spacing(10),
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const vets = useSelector(selectVets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVets);
  }, [dispatch]);
  return (
    <div className={classes.div}>
      <h2>Vets</h2>

      {vets
        ? vets.map((vet) => {
            return (
              <Card key={vet.id} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={vet.imageUrl}
                    title={vet.name}
                  />
                  <CardContent>
                    <Typography variant="h6">
                      Vet Name {vet.name}, ID {vet.id}
                    </Typography>
                    <Typography variant="body1">
                      Address: {vet.address}{" "}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to={`/vets/${vet.id}`}>
                    <Button size="small" color="primary">
                      Details
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })
        : null}
    </div>
  );
}
