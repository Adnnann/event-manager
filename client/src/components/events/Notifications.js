import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
  } from "@mui/material";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

const Notifications = ({registrationArr, remove, approve, reject, open}) => {


return(
<Dialog open={open}>
<DialogTitle>Event registration notifications</DialogTitle>

{ registrationArr.map((item, index) => {
    console.log(registrationArr)
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
              onClick={() => remove(item.title)}
            />
          </DialogActions>
          <DialogContent key={index}>
            <DialogContentText>
              
              {registrationArr.type === 'registration notification' && registrationArr?.status ? 
              `User ${item.email} ${item.status} your registration request for event`
              : `User ${item.email} would like to register for your event`}{" "}
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
                approve(item.email, item.title, item.id)
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
          </DialogActions>
        </>
      );
    })
}
</Dialog>
)
}

export default Notifications

