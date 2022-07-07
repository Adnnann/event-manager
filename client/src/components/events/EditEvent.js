import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  getUploadUserImageStatus,
  cleanUploadImageStatus,
  getLoggedUserData,
  cleanAddEventMessage,
  getCreateCourseMessage,
  getUserToken,
  userToken,
  createEvent,
  fetchEvents,
  getCreateEventMessage,
  getEventToEdit,
  fetchUserEvents,
  getUpdateEventStatus,
  cleanUpdateEventStatus,
  updateEvent,
} from "../../features/eventsSlice";
import { Button, Card, CardMedia, Grid, TextField } from "@mui/material";
import SelectComponent from "../utils/SelectComponent";
import ImagePlaceholder from "../../assets/imagePlaceholder.png";
import TextFieldsGenerator from "../utils/TextFieldsGenerator";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  tittle: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  save: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
    marginRight: theme.spacing(2),
  },
  cancel: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
  },
  userImagePlaceholder: {
    width: 130,
    height: 130,
    marginTop: "40px",
    marginBottom: "20px",
    margin: "0 auto",
  },
  uploadPhoto: {
    minWidth: "125px",
  },
  selectFields: {
    height: "60px",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: "1px",
  },
  addEventContainer: {
    backgroundColor: "lightBlue",
    minHeight: "50px",
    marginBottom: "20px",
  },
  addEventTitle: {
    textAlign: "center",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  buttonContainer: { marginTop: "20px" },
  durationSelectFieldLabel: { marginBottom: "0" },
  error: { color: "red" },
}));

const EditEvent = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventToEdit = useSelector(getEventToEdit);
  const updateEventStatus = useSelector(getUpdateEventStatus);

  const uploadImageStatus = useSelector(getUploadUserImageStatus);
  const loggedUser = useSelector(getLoggedUserData);
  const classes = useStyles();
  const token = useSelector(getUserToken);

  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    category: "",
    error: "",
  });

  useEffect(() => {
    setValues({
      title: eventToEdit.title,
      description: eventToEdit.description,
      price: eventToEdit.price,
      date: moment(eventToEdit.date).format("YYYY-MM-DD"),
      category: eventToEdit.category,
      error: "",
    });

    socket?.on("getUpdatedEventNotification", () => {
      dispatch(fetchEvents());
      dispatch(fetchUserEvents(loggedUser.user._id));
    });

    if (updateEventStatus?.message) {
      socket.emit("updateEvent");
      dispatch(fetchUserEvents(loggedUser.user._id));
      dispatch(fetchEvents());
      dispatch(cleanUpdateEventStatus());

      setValues({
        title: "",
        description: "",
        price: "",
        date: "",
        category: "",
        error: "",
      });
      dispatch(cleanUploadImageStatus());
      navigate("/dashboard");
    }
  }, [updateEventStatus]);

  const handleChange = (name) => (event) => {
    const eventToAdd = {
      [name]: event.target.value,
    };
    setValues({
      ...values,
      ...eventToAdd,
    });
  };

  const types = ["text", "text", "text", "date"];
  const categories = ["courses", "meetups"];
  const labels = [
    "Title",
    "Event description",
    "Event price",
    "Event date",
    "Duration",
  ];
  const textFields = ["title", "description", "price", "date"];
  const placeholder = [
    "Event Title",
    "Event Description",
    "Event Price 0.00 BAM",
  ];
  const multiline = [false, true, false, false];

  const clickSubmit = () => {
    const event = {
      param: eventToEdit._id,
      data: {
        title: values.title,
        description: values.description,
        price: values.price,
        date: values.date,
        category: values.category,
        eventImage: uploadImageStatus?.imageUrl
          ? uploadImageStatus.imageUrl
          : "",
      },
    };

    dispatch(updateEvent(event));
  };

  const cancel = () => {
    dispatch(cleanUploadImageStatus());
    navigate("/dashboard");
  };

  const uploadPhoto = () => {
    document.getElementById("uploadImage").click();
  };

  const handleUpload = (event) => {
    let formData = new FormData();
    formData.append(
      "userImage",
      event.target.files[0],
      `${eventToEdit.title.replace(/\s+/g, "")}-${Date.now()}.${
        event.target.files[0].name.split(".")[1]
      }`
    );
    dispatch(uploadImage(formData, { id: "test" }));
  };

  return (
    <Card className={classes.card}>
      {/* {addEventStatus?.error || values.error ? (
        <p className={classes.error}>{addEventStatus.error || values.error}</p>
      ) : null} */}
      <h2 className={classes.addEventTitle}>Edit Event</h2>
      <p>Upload photo</p>
      <CardMedia
        onClick={uploadPhoto}
        className={classes.userImagePlaceholder}
        style={{ width: "260px" }}
        src={
          uploadImageStatus?.message
            ? uploadImageStatus.imageUrl
            : eventToEdit?.eventImage && eventToEdit.eventImage !== ""
            ? eventToEdit.eventImage
            : ImagePlaceholder
        }
        component="img"
      ></CardMedia>

      <input
        type="file"
        style={{ visibility: "hidden" }}
        id="uploadImage"
        onChange={handleUpload}
      />

      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextFieldsGenerator
            array={textFields}
            handleChange={handleChange}
            values={values}
            value={textFields}
            labels={labels}
            types={types}
            placeholder={placeholder}
            multiline={multiline}
          />

          <SelectComponent
            label={"Category"}
            selectedValue={values.category}
            array={categories}
            handleChange={handleChange("category")}
            className={classes.selectFields}
          />

          <Button
            fullWidth
            color="error"
            variant="contained"
            style={{
              marginRight: "10px",
              marginTop: "20px",
              fontSize: "20px",
              textTransform: "none",
            }}
            onClick={clickSubmit}
          >
            Edit Event
          </Button>
          <Button
            color="info"
            variant="contained"
            onClick={cancel}
            fullWidth
            style={{
              marginRight: "10px",
              marginTop: "20px",
              fontSize: "20px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EditEvent;
