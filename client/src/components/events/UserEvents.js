import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import {
  fetchEvents,
  getEvents,
  getUserEvents,
} from "../../features/eventsSlice";
import { Grid, Card, CardMedia, CardContent } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Button, CardActions, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.only("md")]: {
      maxWidth: 600,
    },
  },
  title: {
    textAlign: "left",
    marginLeft: "10px",
    marginBottom: "20px !important",
  },

  cardText: {
    marginBottom: "2px",
  },
  image: {
    width: "240px",
    height: "220px",
    marginTop: "10px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "10px",
    },
  },
}));

const UserEvents = () => {
  const userEvents = useSelector(getUserEvents);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Grid container spacing={2} marginTop={2} justifyContent="center">
      {Object.keys(userEvents).length !== 0
        ? userEvents.events.map((item) => {
            return (
              <Grid
                item
                xs={12}
                md={3}
                lg={3}
                xl={3}
                key={item.title}
                style={{
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  marginRight: "5px",
                  paddingRight: "15px",
                  marginBottom: "10px",
                }}
              >
                <Card>
                  <CardMedia
                    className={classes.image}
                    component={"img"}
                    src={
                      "https://media-exp1.licdn.com/dms/image/C561BAQE-51J-8KkMZg/company-background_10000/0/1548357920228?e=2147483647&v=beta&t=wrOVYN8qrGon9jILrMQv78FsyOV4IMQxr_3UjYtUREI"
                    }
                  ></CardMedia>
                </Card>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", marginTop: "10px" }}
                >
                  {item.title}
                </Typography>
                <CardContent style={{ textAlign: "left" }}>
                  <Typography component={"p"}>{item.description}</Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-around" }}>
                  <Button variant="contained" color="primary">
                    Reserve
                  </Button>
                  <Button variant="contained" color="secondary">
                    Cancel
                  </Button>
                </CardActions>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default UserEvents;
