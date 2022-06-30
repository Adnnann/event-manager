import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import {
  fetchEvents,
  getEvents,
  getLoggedUserData,
} from "../../features/eLearningSlice";
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

const Events = ({ socket }) => {
  const [receiverData, setData] = useState([]);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      console.log(data);
      setData([...receiverData, data]);
    });
    console.log(receiverData);
  }, [socket, receiverData]);

  const loggedUser = useSelector(getLoggedUserData);
  const events = useSelector(getEvents);
  const dispatch = useDispatch();
  const classes = useStyles();

  const register = (id, title) => {
    console.log(id);
    socket.emit("sendNotification", {
      senderId: loggedUser.user._id,
      receiverId: id,
      eventTitle: title,
    });
  };

  return (
    <>
      <Grid container spacing={2} marginTop={2} justifyContent="center">
        <h1>
          {" "}
          {receiverData?.email
            ? `User ${receiverData.email} would like to register for your event`
            : null}
        </h1>
        {Object.keys(events).length !== 0
          ? events.events.map((item) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={3}
                  lg={2}
                  xl={2}
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
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => register(item.createdBy, item.title)}
                    >
                      Register
                    </Button>
                  </CardActions>
                </Grid>
              );
            })
          : null}
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
                      color="success"
                      autoFocus="autoFocus"
                      variant="contained"
                      onClick={() => setData({})}
                    >
                      Approve
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      autoFocus="autoFocus"
                      onClick={() => setData({})}
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
