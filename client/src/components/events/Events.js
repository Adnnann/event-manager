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
      <Grid container spacing={1} marginTop={2} justifyContent="space-evenly">
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

        {Object.keys(events).length !== 0
          ? events.events.map((item) => {
              return item.category === "courses" &&
                (filter === "courses" || filter === "allEvents") ? (
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
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        textTransform: "none",
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                      onClick={() => register(item.createdBy, item.title)}
                    >
                      Registration Request
                    </Button>
                  </CardActions>
                </Grid>
              ) : null;
            })
          : null}
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
        {Object.keys(events).length !== 0
          ? events.events.map((item) => {
              return item.category === "meetups" &&
                (filter === "meetups" || filter === "allEvents") ? (
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
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        textTransform: "none",
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                      onClick={() => register(item.createdBy, item.title)}
                    >
                      Registration Request
                    </Button>
                  </CardActions>
                </Grid>
              ) : null;
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
