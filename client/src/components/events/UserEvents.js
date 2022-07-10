import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRegistrationResponseStatus,
  fetchEvents,
  fetchUserEvents,
  getLoggedUserData,
  getRegistrationResponseStatus,
  getUserEvents,
  sendRegistrationResponse,
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

const UserEvents = ({ socket }) => {
  const userEvents = useSelector(getUserEvents);

  const registrationResponseStatus = useSelector(getRegistrationResponseStatus);
  const dispatch = useDispatch();
  const classes = useStyles();

  const loggedUser = useSelector(getLoggedUserData);

  useEffect(() => {
    if (registrationResponseStatus?.message) {
      dispatch(fetchEvents());
      dispatch(fetchUserEvents(loggedUser.user._id));
      dispatch(clearRegistrationResponseStatus());
    }
  }, [registrationResponseStatus]);

  const approveRegistration = (eventId, participantId, title) => {
    let participantsArr = [];

    let participants = [
      ...userEvents.events.filter((item) => item._id === eventId)[0]
        .participants,
    ];

    const object = {
      ...participants.filter((item) => item.participant === participantId)[0],
    };

    object.status = "approved";

    participantsArr = [
      object,
      ...participants.filter((item) => item.participant !== participantId),
    ];

    const event = {
      id: eventId,
      participants: participantsArr,
    };

    dispatch(sendRegistrationResponse(event));

    socket.emit("sendRegistrationResponse", {
      senderId: loggedUser.user._id,
      receiverId: participantId,
      eventTitle: title,
      response: "approved",
    });
  };

  const rejectRegistration = (eventId, participantId, title) => {
    let participantsArr = [];

    let participants = [
      ...userEvents.events.filter((item) => item._id === eventId)[0]
        .participants,
    ];

    const object = {
      ...participants.filter((item) => item.participant === participantId)[0],
    };

    object.status = "rejected";

    participantsArr = [
      object,
      ...participants.filter((item) => item.participant !== participantId),
    ];

    const event = {
      id: eventId,
      participants: participantsArr,
    };

    dispatch(sendRegistrationResponse(event));

    socket.emit("sendRegistrationResponse", {
      senderId: loggedUser.user._id,
      receiverId: participantId,
      eventTitle: title,
      response: "rejected",
    });
  };

  return (
    <Grid container spacing={1} marginTop={2} justifyContent="center">
      {Object.keys(userEvents).length !== 0
        ? userEvents.events
            .filter((item) => item.participants.length > 0)
            .map((item) => {
              return item.participants.map((event, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={3}
                    lg={3}
                    xl={3}
                    key={event.participant}
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
                        {`Title: ${event.title}`}
                      </Typography>
                      <Typography
                        component={"p"}
                      >{`Description: ${event.description}`}</Typography>
                      <Typography component={"p"}>
                        Status:{" "}
                        <span
                          style={{
                            color:
                              event.status === "pending"
                                ? "red"
                                : event.status === "rejected"
                                ? "orange"
                                : "green",
                          }}
                        >
                          {event.status}
                        </span>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {event.status === "pending" && (
                        <>
                          <Button
                            autoFocus="autoFocus"
                            variant="contained"
                            fullWidth
                            style={{
                              marginLeft: "0",
                              borderTopRightRadius: "0",
                              backgroundColor: "grey",
                              borderRadius: "0",
                            }}
                            onClick={() => {
                              approveRegistration(
                                item._id,
                                event.participant,
                                item.title
                              );
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            autoFocus="autoFocus"
                            fullWidth
                            style={{
                              marginLeft: "0",
                              borderTopLeftRadius: "0",
                              borderTopBottomRadius: "0",
                              borderRadius: "0",
                            }}
                            onClick={() =>
                              rejectRegistration(
                                item._id,
                                event.participant,
                                item.title
                              )
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Grid>
                );
              });
            })
        : null}
    </Grid>
  );
};

export default UserEvents;
