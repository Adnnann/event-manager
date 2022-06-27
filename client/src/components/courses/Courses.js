import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import {
  cleanEnrollInCourseMessage,
  cleanReloginStatus,
  cleanUserFetchDataStatus,
  enrollInCourse,
  fetchCourses,
  fetchMentors,
  fetchUserCourses,
  fetchUserData,
  getCourses,
  getCoursesDisplayPage,
  getEnrollInCourseMessage,
  getLoggedUserData,
  getSelectedFilterTerm,
  getStudentFilters,
  getUserToken,
  reLoginUser,
  setCoursesDisplayPage,
  setStudentFilters,
  setUserToken,
  userToken,
} from "../../features/eLearningSlice";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import PaginationComponent from "../utils/Pagination";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "50px",
    position: "fixed",
    [theme.breakpoints.only("xs")]: {
      overflowY: "clip",
    },
  },
  filtersToggleButton: {
    marginTop: "50px",
    marginBottom: "20px !important",
    minWidth: "300px !important",
    minHeight: "60px !important",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0px",
      width: "220px",
    },
    [theme.breakpoints.only("md")]: {
      minWidth: "220px !important",
    },
  },
  filterLevels: {
    display: "flex",
    flexDirection: "column",
    borderStyle: "solid",
    paddingLeft: "10px",
    minWidth: "300px !important",
    [theme.breakpoints.only("md")]: {
      minWidth: "200px !important",
    },
  },
  filterDurations: {
    display: "flex",
    flexDirection: "column",
    borderStyle: "solid",
    paddingLeft: "10px",
    marginTop: "20px",
    [theme.breakpoints.only("md")]: {
      minWidth: "200px !important",
    },
  },
  enrolledInCourseMessage: {
    marginTop: "20px",
    color: "red",
    marginBottom: "20px ",
    textAlign: "center",
  },
  displayCoursesContainer: {
    maxHeight: "60vh",
    overflow: "auto",
    paddingBottom: "20px",
  },
  paginationContainer: {
    marginBottom: "50px",
  },
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
  enrolledInCourseCardMessage: {
    marginLeft: "5px",
    fontSize: "12px",
  },
  description: {
    textAlign: "left",
    marginLeft: "10px",
    marginBottom: "20px !important",
  },
  duration: {
    textAlign: "left",
    display: "inline-flex",
    fontWeight: "bolder",
  },
  level: {
    textAlign: "left",
    display: "inline-flex",
    fontWeight: "bolder",
  },
  cardText: {
    marginBottom: "2px",
  },
  image: {
    width: "240px",
    height: "220px",
    marginTop: "10px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "10px",
    },
  },
  filterResults: {
    marginTop: "0",
    maxWidth: "320px",
    margin: "0 auto",
    marginBottom: "20px",
  },
  enrollButton: {
    marginBottom: "10px !important",
    marginLeft: "2px !important",
    marginRight: "2px !important",
  },
}));

const Courses = () => {
  const courses = useSelector(getCourses);
  const dispatch = useDispatch();
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUserData);
  const studentFilters = useSelector(getStudentFilters);
  const [checked, setChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [courseOverviewModal, setCourseOverviewModal] = useState(false);
  const [courseToDisplay, setCourseToDisplay] = useState([]);
  const page = useSelector(getCoursesDisplayPage);
  const enrollInCourseStatus = useSelector(getEnrollInCourseMessage);
  const navigate = useNavigate();
  const [displayFilters, setDisplayFilters] = useState(false);
  const filterTerm = useSelector(getSelectedFilterTerm);
  const token = useSelector(getUserToken);

  useEffect(() => {
    if (
      token?.message &&
      Object.keys(loggedUser).length === 0 &&
      token.length !== 12 &&
      token !== "user reloged" &&
      loggedUser !== "signout"
    ) {
      dispatch(userToken());
    }

    if (token?.message) {
      dispatch(reLoginUser(jwtDecode(token.message)._id));
      dispatch(setUserToken("user reloged"));
    }

    if (loggedUser?.relogin) {
      if (loggedUser?.user && loggedUser.user.role === "student") {
        const user = {
          userCourses: loggedUser.user.enrolledInCourses,
          param: loggedUser.user._id,
          id: loggedUser.user._id,
          courseId:
            loggedUser.user.enrolledInCourses[
              loggedUser.user.enrolledInCourses.length - 1
            ],
          completedCourses: loggedUser.user.completedCourses,
        };

        dispatch(fetchMentors());

        const courses = {
          firstItem: 0,
          lastItem: 12,
        };

        dispatch(fetchCourses(courses));
        dispatch(cleanReloginStatus());
      }
    }
    if (enrollInCourseStatus?.message) {
      dispatch(fetchMentors());
      dispatch(cleanEnrollInCourseMessage());
      dispatch(setCoursesDisplayPage(1));
    }

    if (Object.keys(courses).length === 0) {
      const courses = {
        firstItem: 0,
        lastItem: 12,
      };

      dispatch(fetchCourses(courses));
    }

    if (loggedUser?.message) {
      const user = {
        userCourses: loggedUser.user.enrolledInCourses,
        param: loggedUser.user._id,
        id: loggedUser.user._id,
        courseId:
          loggedUser.user.enrolledInCourses[
            loggedUser.user.enrolledInCourses.length - 1
          ],
        completedCourses: loggedUser.user.completedCourses,
      };

      dispatch(fetchUserCourses(user));
      dispatch(cleanUserFetchDataStatus());
      navigate("/dashboard");
    }
  }, [enrollInCourseStatus, loggedUser, token]);

  const [filters, setFilters] = useState({
    filterLevel: "",
    filterDuration: "",
  });

  const enroll = () => {
    const user = {
      userCourses: loggedUser.user.enrolledInCourses,
      param: loggedUser.user._id,
      id: loggedUser.user._id,
      courseId: courseToDisplay[0]._id,
      completedCourses: loggedUser.user.completedCourses,
    };

    dispatch(enrollInCourse(user));
    setCourseOverviewModal(false);
    dispatch(fetchUserData(loggedUser.user._id));
  };

  const showModal = (title) => {
    setCourseToDisplay(courses.data.filter((item) => item.title === title));
    setCourseOverviewModal(true);
  };

  const handleLevelFilter = (name) => (event) => {
    checked[0] = event.target.name === "Beginner Level" ? !checked[0] : "";
    checked[1] = event.target.name === "Intermediate Level" ? !checked[1] : "";
    checked[2] = event.target.name === "Advanced Level" ? !checked[2] : "";
    checked[3] = event.target.name === "All levels" ? !checked[3] : "";

    setFilters({
      ...filters,
      [name]: event.target.name,
    });

    const courses = {
      filterTerm: filterTerm ? filterTerm : undefined,
      filterLevel:
        checked.slice(0, 4).filter(Boolean).length > 0
          ? event.target.name
          : undefined,
      filterDuration:
        checked.slice(4, 10).filter(Boolean).length > 0
          ? filters.filterDuration
          : undefined,
      page: 1,
      firstItem: 0,
      lastItem: 12,
    };
    dispatch(setStudentFilters(courses));
    dispatch(setCoursesDisplayPage(1));
    dispatch(fetchCourses(courses));
  };

  const handleDurationFilter = (name) => (event) => {
    checked[4] = event.target.name === "0 - 3 Hours" ? !checked[4] : "";
    checked[5] = event.target.name === "3 - 6 Hours" ? !checked[5] : "";
    checked[6] = event.target.name === "6 - 12 Hours" ? !checked[6] : "";
    checked[7] = event.target.name === "1 - 2 Days" ? !checked[7] : "";
    checked[8] = event.target.name === "2 - 5 Days" ? !checked[8] : "";
    checked[9] = event.target.name === "5 - 15 Days" ? !checked[9] : "";

    setFilters({
      ...filters,
      [name]: event.target.name,
      filterByDuration: true,
    });

    const courses = {
      filterTerm: filterTerm ? filterTerm : undefined,
      filterLevel:
        checked.slice(0, 4).filter(Boolean).length > 0
          ? filters.filterLevel
          : undefined,
      filterDuration:
        checked.slice(4, 10).filter(Boolean).length > 0
          ? event.target.name
          : undefined,
      page: 1,
      firstItem: 0,
      lastItem: 12,
    };
    dispatch(setStudentFilters(courses));
    dispatch(setCoursesDisplayPage(1));
    dispatch(fetchCourses(courses));
  };

  const filterItems = [
    ["Beginner Level", "Intermediate Level", "Advanced Level", "All levels"],
    [
      "0 - 3 Hours",
      "3 - 6 Hours",
      "6 - 12 Hours",
      "1 - 2 Days",
      "2 - 5 Days",
      "5 - 15 Days",
    ],
  ];

  const handlePagination = (event, value) => {
    const courses = {
      filterLevel: checked.slice(0, 4).includes(true)
        ? filters.filterLevel
        : undefined,
      filterDuration: checked.slice(4, 10).includes(true)
        ? filters.filterDuration
        : undefined,
      page: value,
      firstItem: value * 12 - 12,
      lastItem: value * 12,
    };

    dispatch(setCoursesDisplayPage(value));
    dispatch(fetchCourses(courses));
  };

  const cancelEnroll = () => {
    setCourseOverviewModal(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        className={classes.container}
        justifyContent="center"
      >
        <Grid item xs={12} md={2} lg={3} xl={2}>
          <Box justifyContent={"center"}>
            <Button
              onClick={() => setDisplayFilters(!displayFilters)}
              className={classes.filtersToggleButton}
              startIcon={<FilterListIcon />}
              endIcon={
                displayFilters ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )
              }
              color={"info"}
              variant="contained"
            >
              Filters
            </Button>
          </Box>
          {displayFilters ? (
            <>
              <Box justifyContent={"center"} className={classes.filterLevels}>
                {filterItems[0].map((item, index) => {
                  return (
                    <FormControl key={item}>
                      <FormControlLabel
                        label={item}
                        control={
                          <Checkbox
                            name={item}
                            onChange={handleLevelFilter("filterLevel")}
                            checked={Boolean(checked[index])}
                          />
                        }
                      />
                    </FormControl>
                  );
                })}
              </Box>

              <Box
                justifyContent={"center"}
                className={classes.filterDurations}
              >
                {filterItems[1].map((item, index) => {
                  return (
                    <FormControl key={item}>
                      <FormControlLabel
                        label={item}
                        control={
                          <Checkbox
                            name={item}
                            onChange={handleDurationFilter("filterDuration")}
                            checked={Boolean(checked[index + 4])}
                          />
                        }
                      />
                    </FormControl>
                  );
                })}
              </Box>
            </>
          ) : null}
        </Grid>

        <Grid item xs={12} md={9} lg={7} xl={7}>
          {courses?.data ? (
            <Box className={classes.displayCoursesContainer}>
              {filterTerm !== "" ? (
                <Alert
                  variant="filled"
                  color="info"
                  severity="info"
                  className={classes.filterResults}
                >
                  Number of courses related to {filterTerm} is{" "}
                  {courses.data.length}
                </Alert>
              ) : null}
              <Grid
                container
                justifyContent={"center"}
                className={classes.paginationContainer}
              >
                {courses?.totalNumOfCourses &&
                Math.ceil(courses.totalNumOfCourses / 12) > 1 ? (
                  <PaginationComponent
                    page={page}
                    handleChange={handlePagination}
                    numberOfPages={Math.ceil(courses.totalNumOfCourses / 12)}
                    numberOfItems={Object.keys(courses.data).length}
                  />
                ) : null}
              </Grid>

              {_.chain(Object.values(courses.data))

                .map((item) => (
                  <Card className={classes.card} key={item.title}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        lg={4}
                        xl={4}
                        flexDirection="column"
                      >
                        <CardMedia
                          className={classes.image}
                          component={"img"}
                          src={item.courseImage}
                        ></CardMedia>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={8}
                        lg={8}
                        xl={8}
                        className={classes.cardText}
                      >
                        <DialogContent>
                          <Typography variant="h4" className={classes.title}>
                            <span onMouseEnter={() => showModal(item.title)}>
                              {item.title}
                            </span>
                            <span
                              className={classes.enrolledInCourseCardMessage}
                            >
                              {loggedUser?.user &&
                              loggedUser.user.enrolledInCourses.includes(
                                item._id
                              )
                                ? `(enrolled)`
                                : null}
                            </span>
                          </Typography>

                          <Typography
                            component={"p"}
                            className={classes.description}
                          >
                            {item.description}
                          </Typography>
                          <Typography
                            component={"p"}
                            className={classes.description}
                          >
                            Mentor: {item.mentorId}
                          </Typography>
                          <Typography
                            component={"p"}
                            className={classes.description}
                          >
                            <span
                              style={{ fontWeight: "bold", marginTop: "20px" }}
                            >
                              {`Duration: ${item.duration} ||`}

                              {` Level: ${item.level}`}
                            </span>
                          </Typography>
                        </DialogContent>
                      </Grid>
                    </Grid>
                  </Card>
                ))
                .value()}
            </Box>
          ) : (
            "Loading..."
          )}
        </Grid>
      </Grid>
      <Dialog open={courseOverviewModal}>
        <span
          style={{ marginLeft: "auto", marginRight: "10px", marginTop: "5px" }}
        >
          <CloseIcon onClick={cancelEnroll} />
        </span>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            {courseOverviewModal &&
            loggedUser.user.enrolledInCourses.includes(
              courseToDisplay[0]._id
            ) ? (
              <Typography
                component={"p"}
                className={classes.enrolledInCourseMessage}
              >
                You are already enrolled into this course
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <DialogTitle style={{ width: "400px" }}>
              What will you learn
            </DialogTitle>

            <DialogContent>
              {courseToDisplay[0]?.description
                ? courseToDisplay[0].description.split(".").map((item) => {
                    return (
                      <DialogContentText key={item}>
                        {item !== "" ? `> ${item}` : null}
                      </DialogContentText>
                    );
                  })
                : null}
            </DialogContent>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.enrollButton}
          >
            {courseOverviewModal &&
            loggedUser.user.enrolledInCourses.includes(
              courseToDisplay[0]._id
            ) ? (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => setCourseOverviewModal(false)}
              >
                Return back
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  style={{ marginBottom: "10px" }}
                  onClick={() => setCourseOverviewModal(false)}
                >
                  Return back
                </Button>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={enroll}
                >
                  Enroll
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default Courses;
