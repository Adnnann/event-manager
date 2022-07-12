import moment from "moment";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Card,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getEvents } from "../../features/eventsSlice";

const Notifications = ({
  registrationArr,
  approve,
  reject,
  open,
  removeNotification,
  removeResponse,
}) => {
  const events = useSelector(getEvents);

  return (
    <Dialog open={open} maxWidth={"xl"}>
      <DialogTitle>Event registration notifications</DialogTitle>
      {registrationArr.map((item, index) => {
        return (
          <Card key={index}>
            <DialogActions
              key={`${index} - ${item.id}`}
              style={{
                marginLeft: "auto",
                fontSize: "240px !important",
              }}
            >
              {item.type === "registration notification" ? (
                <Button
                  startIcon={<FontAwesomeIcon icon={faClose} />}
                  style={{
                    marginLeft: "auto",
                    fontSize: "240px !important",
                  }}
                  onClick={() => removeNotification(item.title, item.email)}
                />
              ) : null}
            </DialogActions>
            <DialogContent key={index}>
              <Typography variant="h5">{item.title}</Typography>

              {item.type === "registration response" && (
                <DialogContentText>
                  {" "}
                  {`User ${item.email} `}{" "}
                  <span style={{ fontWeight: "bold" }}>{item.response}</span>{" "}
                  {` your registration request `}
                </DialogContentText>
              )}
              {item.type === "registration notification" && (
                <DialogContentText>
                  <span>{`Date: ${moment(
                    events.events.filter(
                      (event) => event.title === item.title
                    )[0].date
                  ).format("L")} `}</span>
                  <span>{`Event price: ${
                    events.events.filter(
                      (event) => event.title === item.title
                    )[0].price
                  } `}</span>
                  <span>{`User Email: ${item.email} `}</span>
                </DialogContentText>
              )}
            </DialogContent>
            <DialogActions
              style={{
                justifyContent: "space-around",
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "black",
              }}
            >
              {item.type === "registration notification" && (
                <>
                  <Button
                    autoFocus="autoFocus"
                    variant="contained"
                    onClick={() => approve(item.email, item.title, item.id)}
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
                    onClick={() => reject(item.email, item.title, item.id)}
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
                </>
              )}
              {item.type === "registration response" && (
                <Button
                  color="error"
                  variant="contained"
                  autoFocus="autoFocus"
                  onClick={() => removeResponse(item.title, item.email)}
                  fullWidth
                  style={{
                    marginLeft: "0",
                    borderTopLeftRadius: "0",
                    borderTopBottomRadius: "0",
                    borderRadius: "0",
                  }}
                >
                  Close notification
                </Button>
              )}
            </DialogActions>
          </Card>
        );
      })}
    </Dialog>
  );
};

export default Notifications;
