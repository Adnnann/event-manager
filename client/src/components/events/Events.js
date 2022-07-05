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
import Event from "./Event";

const Events = ({ socket }) => {
  const events = useSelector(getEvents);
  const [receiverData, setData] = useState([]);
  const filter = useSelector(getFilter);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setData([...receiverData, data]);
    });
  }, [socket, receiverData]);

  const loggedUser = useSelector(getLoggedUserData);

  const register = (id, title) => {
    socket.emit("sendNotification", {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
    });
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

        {Object.keys(events).length !== 0 ? (
          <Event
            events={events.events.filter((item) =>
              item.participants.includes(loggedUser.user._id)
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
        {Object.keys(events).length !== 0 ? (
          <Event
            events={events.events.filter((item) => item.category === "courses")}
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
        {Object.keys(events).length !== 0 ? (
          <Event
            events={events.events.filter((item) => item.category === "meetups")}
            register={register}
          />
        ) : null}
      </Grid>
      <Dialog open={Object.keys(receiverData).length > 0 ? true : false}>
        <DialogTitle>Event registration notification</DialogTitle>

        {Object.keys(receiverData).length > 0
          ? receiverData.map((item) => {
              return (
                <>
                  <DialogContent>
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
                      onClick={() => setData({})}
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
                      onClick={() => setData({})}
                      fullWidth
                      style={{
                        marginLeft: "0",
                        borderTopLeftRadius: "0",
                        borderTopBottomRadius: "0",
                        borderRadius: "0",
                      }}
                    >
                      Cancel
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
