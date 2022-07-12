import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  cancelEvent,
  cleanCanceledEventStatus,
  clearRegistrationNotificationStatus,
  clearRegistrationResponseStatus,
  fetchEvents,
  fetchUserEvents,
  getCanceledEvent,
  getEvents,
  getFilter,
  getLoggedUserData,
  getRegistrationNotificationStatus,
  getRegistrationResponseStatus,
  getUserEvents,
  registerForEvent,
  sendRegistrationResponse,
} from "../../features/eventsSlice";
import { Grid } from "@mui/material";
import Event from "./Event";
import Notifications from "./Notifications";

const Events = ({ socket }) => {
  const events = useSelector(getEvents);
  const userEvents = useSelector(getUserEvents);
  const cancelEventStatus = useSelector(getCanceledEvent);

  const registrationNotificationStatus = useSelector(
    getRegistrationNotificationStatus
  );
  const registrationResponseStatus = useSelector(getRegistrationResponseStatus);
  const [registrationNotification, setRegistrationNotification] = useState([]);
  const [registrationResponse, setRegistrationResponse] = useState([]);

  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUserData);

  useEffect(() => {
    if (loggedUser?.user) {
      socket?.on("getRegistrationNotification", (data) => {
        dispatch(fetchEvents());
        dispatch(fetchUserEvents(loggedUser.user._id));
        setRegistrationNotification([...registrationNotification, data]);
      });

      socket?.on("getRegistrationResponse", (data) => {
        dispatch(fetchEvents());
        dispatch(fetchUserEvents(loggedUser.user._id));
        setRegistrationResponse([...registrationResponse, data]);
      });
      socket?.on("getCreatedEventNotification", () => {
        dispatch(fetchEvents());
      });
      socket?.on("getCanceledEventNotification", () => {
        dispatch(fetchEvents());
        dispatch(fetchUserEvents(loggedUser.user._id));
      });

      if (registrationNotificationStatus?.message) {
        dispatch(fetchEvents());
        dispatch(clearRegistrationNotificationStatus());
      }

      if (registrationResponseStatus?.message) {
        dispatch(fetchUserEvents(loggedUser.user._id));
        dispatch(clearRegistrationResponseStatus());
      }

      if (cancelEventStatus?.message) {
        dispatch(fetchUserEvents(loggedUser.user._id));
        dispatch(fetchEvents());
        dispatch(cleanCanceledEventStatus());
      }
    }
  }, [
    socket,
    registrationNotification,
    registrationResponse,
    registrationNotificationStatus,
    registrationResponseStatus,
    cancelEventStatus,
    loggedUser,
  ]);

  const register = (id, title, eventId, description) => {
    const event = {
      id: eventId,
      userId: loggedUser.user._id,
      email: loggedUser.user.email,
      title: title,
      description: description,
    };

    dispatch(registerForEvent(event));

    socket.emit("sendRegistrationNotification", {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
    });
  };

  const removeNotification = (title, email) => {
    setRegistrationNotification([
      ...registrationNotification.filter(
        (data) => data.email !== email || data.title !== title
      ),
    ]);
  };

  const removeResponse = (title, email) => {
    setRegistrationResponse([
      ...registrationResponse.filter(
        (data) => data.email !== email || data.title !== title
      ),
    ]);
  };

  const approveRegistration = (email, title, userId) => {
    const id = registrationNotification.filter((item) => item.id === userId)[0]
      .id;

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

    dispatch(sendRegistrationResponse(event));

    socket.emit("sendRegistrationResponse", {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
      response: "approved",
    });
    setRegistrationNotification([
      ...registrationNotification.filter(
        (data) => data.email !== email || data.title !== title
      ),
    ]);
    const data = {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
      response: "approved",
    };
    setRegistrationResponse([...registrationResponse, data]);

    dispatch(fetchEvents());
  };

  const rejectRegistration = (email, title, userId) => {
    const id = registrationNotification.filter((item) => item.id === userId)[0]
      .id;

    let participantsArr = [];

    let participants = [
      ...userEvents.events.filter((item) => item.title === title)[0]
        .participants,
    ];

    const object = {
      ...participants.filter((item) => item.participant === id)[0],
    };

    object.status = "rejected";

    participantsArr = [
      object,
      ...participants.filter((item) => item.participant !== userId),
    ];

    const event = {
      id: userEvents.events.filter((item) => item.title === title)[0]._id,
      participants: participantsArr,
    };

    dispatch(sendRegistrationResponse(event));

    const data = {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
      response: "approved",
    };
    setRegistrationResponse([...registrationResponse, data]);

    socket.emit("sendRegistrationResponse", {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
      response: "rejected",
    });
    setRegistrationNotification([
      ...registrationNotification.filter(
        (data) => data.email !== email || data.title !== title
      ),
    ]);
  };

  const cancel = (id) => {
    dispatch(cancelEvent(id));
    socket.emit("cancelEvent");
  };

  return (
    <>
      {loggedUser?.user ? (
        <Grid container spacing={1} marginTop={2} justifyContent="space-evenly">
          <Grid item xs={12} md={12} lg={12} xl={12}>
            {(filter === "myEvents" || filter === "allEvents") && (
              <>
                <h1 style={{ marginLeft: "5%", marginBottom: "0" }}>
                  My events
                </h1>
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
          Object.keys(loggedUser).length !== 0 &&
          (filter === "myEvents" || filter === "allEvents") ? (
            <Event
              events={_.chain(
                events.events.filter(
                  (item) => item.createdBy === loggedUser.user._id
                )
              )
                .orderBy(["dateOfCreation"], ["desc"])
                .value()}
              userEvents={true}
              register={register}
              cancel={cancel}
            />
          ) : null}

          {Object.keys(events).length !== 0 &&
          events.events.filter((item) => item.createdBy === loggedUser.user._id)
            .length === 0 ? (
            <h2 style={{ color: "limegreen" }}>
              You do not have any events yet
            </h2>
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
          Object.keys(loggedUser).length !== 0 &&
          (filter === "courses" || filter === "allEvents") ? (
            <Event
              events={_.chain(
                events.events.filter(
                  (item) =>
                    item.category === "courses" &&
                    item.createdBy !== loggedUser.user._id
                )
              )
                .orderBy(["participants"], ["desc"])
                .value()}
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
          Object.keys(loggedUser).length !== 0 &&
          (filter === "meetups" || filter === "allEvents") ? (
            <Event
              events={_.chain(
                events.events.filter(
                  (item) =>
                    item.category === "meetups" &&
                    item.createdBy !== loggedUser.user._id
                )
              )
                .orderBy(["date", "participants"], ["desc"])
                .value()}
              register={register}
            />
          ) : null}
        </Grid>
      ) : null}
      {Object.keys(registrationNotification).length !== 0 ? (
        <Notifications
          registrationArr={registrationNotification.filter(
            (user) => user.senderId !== loggedUser.user._id
          )}
          approve={approveRegistration}
          remove={removeNotification}
          open={
            Object.keys(registrationNotification).length > 0 &&
            registrationNotification.filter(
              (item) => item.email !== loggedUser.user.email
            ).length > 0
              ? true
              : false
          }
          removeNotification={removeNotification}
          reject={rejectRegistration}
        />
      ) : null}

      {Object.keys(registrationResponse).length !== 0 ? (
        <Notifications
          registrationArr={registrationResponse.filter(
            (user) => user.senderId !== loggedUser.user._id
          )}
          approve={approveRegistration}
          remove={removeNotification}
          open={
            Object.keys(registrationResponse).length > 0 &&
            registrationResponse.filter(
              (user) => user.senderId !== loggedUser.user._id
            ).length > 0
              ? true
              : false
          }
          removeResponse={removeResponse}
        />
      ) : null}
    </>
  );
};

export default Events;
