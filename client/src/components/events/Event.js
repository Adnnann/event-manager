import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getEvents,
  getFilter,
  getLoggedUserData,
} from "../../features/eventsSlice";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, CardActions, Typography } from "@mui/material";
import DropdownButtons from "../utils/DropdownButtons";

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
    width: "100%",
    height: "220px",
    marginTop: "10px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "10px",
    },
  },
}));

const Event = ({ events, register }) => {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUserData)
  return (
    <Grid container spacing={1} marginTop={2} justifyContent="space-evenly">
      {Object.keys(events).length !== 0
        ? events.map((item) => {
            return (
              <Grid
                key={item._id}
                item
                xs={12}
                md={3}
                lg={2}
                xl={2}
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

                <CardContent style={{ textAlign: "left" }}>
                  <Typography
                    variant="h5"
                    style={{ textAlign: "left", marginTop: "10px" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography component={"p"}>
                    Date: {moment(item.data).format("L")}
                  </Typography>
                  <Typography component={"p"}>
                    Event price: {parseFloat(item.price).toFixed(2)}
                  </Typography>
                  <Typography component={"p"}>
                    Date: {moment(item.date).format("L")}
                  </Typography>
                  <Typography
                    component={"p"}
                    style={{ wordBreak: "break-all" }}
                  >
                    Event description: {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
              {item.createdBy !== loggedUser.user._id ?

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      textTransform: "none",
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                    disabled={item.participants.includes(loggedUser.user._id) ? true : false}
                    onClick={() => register(item.createdBy, item.title, item._id)}
                  >
                    Registration Request
                  </Button> : null
        }
                </CardActions>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default Event;
