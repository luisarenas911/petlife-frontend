import { useSelector, useDispatch } from "react-redux";
import { fetchVets } from "../store/vet/actions";
import { useEffect } from "react";
import { selectVets } from "../store/vet/selectors";
import { Container, Row, Card, Col } from "react-bootstrap";

import {
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
// const useStyles = makeStyles((theme) => ({
//   media: {
//     height: 300,
//   },
//   card: {
//     marginBottom: theme.spacing(5),
//   },
//   div: {
//     paddingTop: theme.spacing(10),
//   },
// }));

export default function HomePage() {
  // const classes = useStyles();

  const vets = useSelector(selectVets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVets);
  }, [dispatch]);
  return (
    <div>
      <h2>Vets</h2>

      <Container fluid>
        <Row lg={4} xs={1} md={2} className="g-4">
          {vets
            ? vets.map((vet) => {
                return (
                  <Col key={vet.id}>
                    <Card
                      // className={classes.card}
                      style={{
                        height: "450px",
                        maxWidth: "100%",
                        maxHeight: "450px",
                      }}
                    >
                      <Card.Img
                        // className={classes.media}
                        variant="top"
                        src={vet.imageUrl}
                        title={vet.name}
                        style={{
                          maxWidth: "300px",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                      <Card.Body>
                        <Card.Title>
                          Vet Name {vet.name}, ID {vet.id}
                        </Card.Title>
                        <Card.Text variant="body1">
                          Address: {vet.address}{" "}
                        </Card.Text>
                        <Link to={`/vets/${vet.id}`}>
                          <Button size="small" color="primary">
                            Details
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
}
