import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getLoggedUserData, setEventToEdit } from "../../features/eventsSlice";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import EditEvent from "./EditEvent";

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

const Event = ({ events, register, userEvents, cancel }) => {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editEvent = (id) => {
    dispatch(setEventToEdit(...events.filter((item) => item._id === id)));
    navigate("/editEvent");
  };

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
                    src={item.eventImage}
                  ></CardMedia>
                </Card>

                <CardContent style={{ textAlign: "left" }}>
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: "left",
                      marginTop: "10px",
                      textDecoration:
                        item.status === "canceled" ? "line-through" : "none",
                      color: item.status === "canceled" ? "red" : "black",
                    }}
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
                  {item?.updated && (
                    <Typography component={"p"} color="green">
                      {`Event updated at ${moment(item.updated).format(
                        "L HH:MM"
                      )}`}
                    </Typography>
                  )}
                  {item.participants.length > 0 &&
                  item.participants.filter(
                    (item) => item.participant === loggedUser.user._id
                  ).length > 0 ? (
                    <Typography
                      component={"p"}
                      style={{ wordBreak: "break-all" }}
                    >
                      Reservation status:
                      <span
                        style={{
                          color:
                            item.participants.filter(
                              (item) => item.participant === loggedUser.user._id
                            )[0].status === "pending"
                              ? "red"
                              : item.participants.filter(
                                  (item) =>
                                    item.participant === loggedUser.user._id
                                )[0].status === "rejected"
                              ? "orange"
                              : "green",
                        }}
                      >
                        {
                          item.participants.filter(
                            (item) => item.participant === loggedUser.user._id
                          )[0].status
                        }
                      </span>
                    </Typography>
                  ) : null}
                </CardContent>
                <CardActions>
                  {item.createdBy !== loggedUser.user._id &&
                  item.status !== "canceled" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        textTransform: "none",
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                      disabled={
                        item.participants.length > 0 &&
                        item.participants.filter(
                          (item) => item.participant === loggedUser.user._id
                        ).length > 0
                          ? true
                          : false
                      }
                      onClick={() =>
                        register(
                          item.createdBy,
                          item.title,
                          item._id,
                          item.description
                        )
                      }
                    >
                      Registration Request
                    </Button>
                  ) : item.status !== "canceled" ? (
                    <>
                      <Button
                        variant="contained"
                        color="info"
                        fullWidth
                        style={{
                          textTransform: "none",
                          fontSize: "18px",
                          marginBottom: "10px",
                        }}
                        onClick={() => editEvent(item._id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="warning"
                        fullWidth
                        onClick={() => cancel(item._id)}
                        style={{
                          textTransform: "none",
                          fontSize: "18px",
                          marginBottom: "10px",
                        }}
                      >
                        Remove
                      </Button>
                    </>
                  ) : (
                    <Typography variant="h5" color="red">
                      Event canceled
                    </Typography>
                  )}
                </CardActions>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default Event;
