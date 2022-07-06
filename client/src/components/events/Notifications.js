import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography
  } from "@mui/material";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

const Notifications = ({registrationArr,  approve, reject, open, removeNotification, removeResponse}) => {


return(
<Dialog open={open}>
<DialogTitle>Event registration notifications</DialogTitle>

{ registrationArr.map((item, index) => {
 
      return (
        <>
          <DialogActions
            style={{
              marginLeft: "auto",
              fontSize: "240px !important",
            }}
          >
          { item.type === 'registration notification' ? 
            <Button
                startIcon={<FontAwesomeIcon icon={faClose} />}
                style={{
                  marginLeft: "auto",
                  fontSize: "240px !important",
                }}
               onClick={()=>removeNotification(item.title, item.email)}
              />
          : null
        }
          </DialogActions>
          <DialogContent key={index}>
            <Typography variant="h5">
            {item.title}
            </Typography>
            <DialogContentText>
              
              {item.type === 'registration response' ? 
             <> {`User ${item.email} `} <span style={{fontWeight:'bold'}}>{item.response}</span> {` your registration request`}</>
              : `User ${item.email} would like to register for your event`}{" "}
        
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

            {item.type === 'registration notification' ?
            <>
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
            </>
            : <Button
            color="error"
            variant="contained"
            autoFocus="autoFocus"
            onClick={()=>removeResponse(item.title, item.email)}
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
            }
          </DialogActions>
        </>
      );
    })
}
</Dialog>
)
}

export default Notifications

