import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  signinUser,
  userToken,
  setSigninUserForm,
  setSignupUserForm,
  getLoggedUserData,
  cleanLoginMessage,
  fetchEvents,
  fetchUserEvents,
} from "../../features/eventsSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
  Grid,
} from "@mui/material";
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
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    [theme.breakpoints.only("xs")]: {
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
  signup: {
    margin: "0 auto !important",
    marginBottom: theme.spacing(1),
    marginLeft: "10px !important",
  },
}));

const Login = ({ socket }) => {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loggedUser?.token) {
      dispatch(userToken());
    }

    if (loggedUser?.user) {
      const user = {
        id: loggedUser.user._id,
        email: loggedUser.user.email,
        name: loggedUser.user.name,
      };
      socket?.emit("newUser", user);
      dispatch(fetchEvents());
      dispatch(fetchUserEvents(loggedUser.user._id));
      navigate("/dashboard");
    }
  }, [loggedUser, socket]);

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    dispatch(signinUser(user));
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const redirectToSignup = () => {
    dispatch(setSigninUserForm(false));
    dispatch(setSignupUserForm(true));
    dispatch(cleanLoginMessage());
  };

  return (
    <Card className={classes.card}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <CardContent>
            <Typography variant="h6" className={classes.tittle}>
              LOGIN
            </Typography>

            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
            />
            <br />

            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
            />
            <br />
            {
              //display error returned from server
              Object.keys(loggedUser).length !== 0 && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}></Icon>
                  {loggedUser.error}
                </Typography>
              )
            }
          </CardContent>
        </Grid>
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
              onClick={redirectToSignup}
            >
              New Account
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Login;
