import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  fetchUserEvents,
  getEvents,
  getFilter,
  getLoggedUserData,
  getUserEvents,
  registerForEvent,
  registrationResponse,
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
import Event from "./Event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import UserEvents from "./UserEvents";
import { findIndex, indexOf } from "lodash";

const Events = ({ socket }) => {
  const events = useSelector(getEvents);
  const userEvents = useSelector(getUserEvents);
  const [receiverData, setData] = useState([]);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      dispatch(fetchUserEvents(loggedUser.user._id));
      setData([...receiverData, data]);
    });
  }, [socket, receiverData]);

  const loggedUser = useSelector(getLoggedUserData);

  const register = (id, title, eventId, description) => {
    const event = {
      id: eventId,
      userId: loggedUser.user._id,
      title: title,
      description: description,
    };

    dispatch(registerForEvent(event));

    socket.emit("sendNotification", {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
    });
  };

  const removeNotification = (title) => {
    setData([...receiverData.filter((data) => data.title !== title)]);
  };

  const approveRegistration = (email, title, userId) => {
    const id = receiverData.filter((item) => item.id === userId)[0].id;

    let participantsArr = [];

    let participants = [
      ...userEvents.events.filter((item) => item.title === title)[0]
        .participants,
    ];

    const object = {
      ...participants.filter((item) => item.participant === id)[0],
    };

    object.status = "approved";

    participantsArr = [
      object,
      ...participants.filter((item) => item.participant !== userId),
    ];

    const event = {
      id: userEvents.events.filter((item) => item.title === title)[0]._id,
      participants: participantsArr,
    };

    dispatch(registrationResponse(event));

    console.log(participantsArr);
    // setData([
    //   ...receiverData.filter(
    //     (data) => data.email !== email || data.title !== title
    //   ),
    // ]);
  };

  return (
    <>
      <Grid container spacing={1} marginTop={2} justifyContent="space-evenly">
        <Grid item xs={12} md={12} lg={12} xl={12}>
          {(filter === "myEvents" || filter === "allEvents") && (
            <>
              <h1 style={{ marginLeft: "5%", marginBottom: "0" }}>My events</h1>
              <hr
                style={{
                  width: "95%",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              />
            </>
          )}
        </Grid>

        {Object.keys(events).length !== 0 &&
        (filter === "myEvents" || filter === "allEvents") ? (
          <Event
            events={events.events.filter(
              (item) => item.createdBy === loggedUser.user._id
            )}
            register={register}
          />
        ) : null}

        <Grid item xs={12} md={12} lg={12} xl={12}>
          {(filter === "courses" || filter === "allEvents") && (
            <>
              <h1 style={{ marginLeft: "5%", marginBottom: "0" }}>Courses</h1>
              <hr
                style={{
                  width: "95%",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              />
            </>
          )}
        </Grid>
        {Object.keys(events).length !== 0 &&
        (filter === "courses" || filter === "allEvents") ? (
          <Event
            events={events.events.filter(
              (item) =>
                item.category === "courses" &&
                item.createdBy !== loggedUser.user._id
            )}
            register={register}
          />
        ) : null}

        <Grid item xs={12} md={12} lg={12} xl={12}>
          {(filter === "meetups" || filter === "allEvents") && (
            <>
              <h1 style={{ marginLeft: "5%", marginBottom: "0" }}>Meetups</h1>
              <hr
                style={{
                  width: "95%",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              />
            </>
          )}
        </Grid>
        {Object.keys(events).length !== 0 &&
        (filter === "meetups" || filter === "allEvents") ? (
          <Event
            events={events.events.filter(
              (item) =>
                item.category === "meetups" &&
                item.createdBy !== loggedUser.user._id
            )}
            register={register}
          />
        ) : null}
      </Grid>
      <Dialog open={Object.keys(receiverData).length > 0 ? true : false}>
        <DialogTitle>Event registration notifications</DialogTitle>

        {Object.keys(receiverData).length > 0
          ? receiverData.map((item, index) => {
              return (
                <>
                  <DialogActions
                    style={{
                      marginLeft: "auto",
                      fontSize: "240px !important",
                    }}
                  >
                    <Button
                      startIcon={<FontAwesomeIcon icon={faClose} />}
                      style={{
                        marginLeft: "auto",
                        fontSize: "240px !important",
                      }}
                      onClick={() => removeNotification(item.title)}
                    />
                  </DialogActions>
                  <DialogContent key={index}>
                    <DialogContentText>
                      {`User ${item.email} would like to register for your event `}{" "}
                      <span style={{ fontWeight: "900" }}>{item.title}</span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    style={{
                      justifyContent: "space-around",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                      borderBottomColor: "black",
                    }}
                  >
                    <Button
                      autoFocus="autoFocus"
                      variant="contained"
                      onClick={() =>
                        approveRegistration(item.email, item.title, item.id)
                      }
                      fullWidth
                      style={{
                        marginLeft: "0",
                        borderTopRightRadius: "0",
                        backgroundColor: "grey",
                        borderRadius: "0",
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      autoFocus="autoFocus"
                      onClick={() => {
                        setData([
                          ...receiverData.filter(
                            (data) => data.title !== item.title
                          ),
                        ]);
                      }}
                      fullWidth
                      style={{
                        marginLeft: "0",
                        borderTopLeftRadius: "0",
                        borderTopBottomRadius: "0",
                        borderRadius: "0",
                      }}
                    >
                      Reject
                    </Button>
                  </DialogActions>
                </>
              );
            })
          : null}
      </Dialog>
    </>
  );
};

export default Events;
