import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSignupUserForm,
  setSigninUserForm,
  signupUser,
  getSignedUser,
  cleanSignupMessage,
} from "../../features/eventsSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Icon,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextFieldsGenerator from "../utils/TextFieldsGenerator";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    textAlign: "center",
    margin: "0 auto !important",
    marginTop: "100px !important",
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      maxWidth: 260,
      margin: "0 auto",
      marginTop: "10px !important",
    },
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  title: {
    marginBottom: "10px",
    fontSize: "20px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(2),
      maxWidth: 220,
    },
  },
  submit: {
    margin: "auto !important",
    marginBottom: theme.spacing(2),
    textTransform: "none !important",
    color: "white !important",
    fontWeight: "900 !important",
    fontSize: "20px !important",
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.spacing(0),
    },
  },
  hasAccount: {
    margin: "auto",
    marginBottom: theme.spacing(1),
    marginRight: "0",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "30px",
    },
  },
  signin: {
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
  signUpForMentorAccount: {
    color: "green",
  },
  largeScreens: {
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  smallScreens: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mentorAccount: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  textFields: {
    minWidth: "320px",
  },
}));
const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signedUser = useSelector(getSignedUser);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "student",
    confirmationPassword: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    let course = {};

    if (name === "mentorAccount") {
      course = {
        role: event.target.value === "mentor" ? "student" : "mentor",
      };

      return setValues({
        ...values,
        ...course,
      });
    }

    course = {
      [name]: event.target.value,
    };

    setValues({
      ...values,
      ...course,
    });
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  const clickSubmit = () => {
    const user = {
      firstName: formatUserData(values.firstName) || undefined,
      lastName: formatUserData(values.lastName) || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      role: values.role,
    };

    setValues({ ...values, error: "" });

    dispatch(signupUser(user));
  };
  const redirectToSignin = () => {
    dispatch(setSignupUserForm(false));
    dispatch(setSigninUserForm(true));
    dispatch(cleanSignupMessage());
  };

  const signupData = ["firstName", "lastName", "email", "password"];

  const labels = ["Firstname", "Lastname", "Email", "Password"];

  const types = ["text", "text", "text", "password", "password"];

  const placeholder = ["Firstname", "Lastname", "Email", "Password"];

  const multiline = [false, false, false, false];

  return (
    <>
      <Card className={classes.card}>
        <Grid container justifyContent="center">
          <CardContent>
            <p className={classes.title}>
              Please <span style={{ fontWeight: "bold" }}>Register</span> for a
              new account
            </p>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <TextFieldsGenerator
                array={signupData}
                handleChange={handleChange}
                values={values}
                value={signupData}
                labels={labels}
                className={classes.textFields}
                types={types}
                multiline={multiline}
                placeholder={placeholder}
              />

              {signedUser?.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}></Icon>
                  {signedUser.error}
                </Typography>
              )}
            </Grid>
          </CardContent>
          <Grid item xs={12} md={7} lg={7} xl={7}>
            <CardActions>
              <Button
                fullWidth
                color="error"
                variant="contained"
                onClick={clickSubmit}
                className={classes.submit}
              >
                Submit
              </Button>
            </CardActions>
          </Grid>

          <Grid item xs={12} md={7} lg={7} xl={7}>
            <CardActions>
              <Button
                fullWidth
                color="info"
                variant="contained"
                onClick={clickSubmit}
                className={classes.submit}
                onClick={redirectToSignin}
              >
                Login instead?
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>

      <Dialog open={signedUser?.message ? true : false}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus="autoFocus"
            onClick={redirectToSignin}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Signup;
