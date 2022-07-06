import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "events/signedupUser",
  async (user) => {
    return await axios
      .post(`api/users/`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const signinUser = createAsyncThunk(
  "users/loggedUser",
  async (userData) => {
    return await axios
      .post("/auth/signin", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const signoutUser = createAsyncThunk("users/user", async () => {
  const response = await axios.post("/auth/signout");
  return response.data;
});

export const userToken = createAsyncThunk("users/protected", async () => {
  return await axios
    .get("/protected", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => response.data)
    .catch((error) => error.message);
});

export const fetchEvents = createAsyncThunk("events/events", async () => {
  return await axios
    .get(`/api/events`)
    .then((response) => response.data)
    .catch((error) => error);
});

export const fetchUserEvents = createAsyncThunk(
  "events/userEvents",
  async (id) => {
    return await axios
      .post(`/api/userEvents/`, { id: id })
      .then((response) => response.data)
      .catch((error) => error);
  }
);
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (course) => {
    return await axios
      .post(`/api/events`, course, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);
export const uploadImage = createAsyncThunk(
  "events/uploadImage",
  async (file) => {
    return await axios
      .post("/uploadImage", file)
      .then((response) => response.data)
      .catch((error) => error);
  }
);
export const registerForEvent = createAsyncThunk(
  "events/registration",
  async (event) => {
    return await axios
      .post(`/api/eventRegistration/`, {
        participant: event.userId,
        eventId: event.id,
        title: event.title,
        description: event.description,
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);
export const sendRegistrationResponse = createAsyncThunk(
  "events/registrationResponse",
  async (event) => {
    return await axios
      .post(`/api/eventRegistrationResponse`, {
        eventId: event.id,
        participants: event.participants,
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);
const initialState = {
  singinUserForm: true,
  singupUserForm: false,
  signedupUser: {},
  uploadImage: {},
  userData: {},
  loggedUser: {},
  signedOut: {},
  userToken: {},
  addEvent: {},
  courseOverviewModal: [],
  events: {},
  userEvents: {},
  filter: "allEvents",
  registration: {},
  registrationResponse: {},
  eventToEdit: {},
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setSigninUserForm: (state, action) => {
      state.singinUserForm = action.payload;
    },
    setSignupUserForm: (state, action) => {
      state.singupUserForm = action.payload;
    },
    cleanSignupMessage: (state, action) => {
      state.signedupUser = {};
    },
    cleanLoginMessage: (state, action) => {
      state.loggedUser = {};
    },
    userDataToDisplay: (state, action) => {
      state.userDataToDisplay = action.payload;
    },
    cleanEventData: (state, action) => {
      state.addEvent = {};
    },
    cleanUserFetchDataStatus: (state, action) => {
      delete state.loggedUser["message"];
    },
    cleanUploadImageStatus: (state, action) => {
      state.uploadImage = {};
    },
    cleanAddEventMessage: (state, action) => {
      state.addEvent = {};
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setLoggedUserStatus: (state, action) => {
      state.loggedUser = "signout";
    },
    setClearSignoutUserMessage: (state, action) => {
      state.loggedUser = {};
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearRegistrationNotificationStatus: (state, action) => {
      state.registration = {};
    },
    clearRegistrationResponseStatus: (state, action) => {
      state.registrationResponse = {};
    },
    setEventToEdit: (state, action) => {
      state.eventToEdit = action.payload;
    },
    //reset store state after logout or delete of account
    resetStore: () => initialState,
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      return { ...state, signedupUser: payload };
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      return { ...state, loggedUser: payload };
    },
    [signoutUser.fulfilled]: (state, { payload }) => {
      return { ...state, signedOut: payload };
    },
    [userToken.fulfilled]: (state, { payload }) => {
      return { ...state, userToken: payload };
    },
    [createEvent.fulfilled]: (state, { payload }) => {
      return { ...state, addEvent: payload };
    },
    ///////////////
    [fetchEvents.fulfilled]: (state, { payload }) => {
      return { ...state, events: payload };
    },
    [fetchUserEvents.fulfilled]: (state, { payload }) => {
      return { ...state, userEvents: payload };
    },
    [uploadImage.fulfilled]: (state, { payload }) => {
      return { ...state, uploadImage: payload };
    },
    [registerForEvent.fulfilled]: (state, { payload }) => {
      return { ...state, registration: payload };
    },
    [sendRegistrationResponse.fulfilled]: (state, { payload }) => {
      return { ...state, registrationResponse: payload };
    },
  },
});

export const getSigninUserFormStatus = (state) => state.events.singinUserForm;
export const getSignupUserFormStatus = (state) => state.events.singupUserForm;
export const getSignedUser = (state) => state.events.signedupUser;
export const getLoggedUserData = (state) => state.events.loggedUser;
export const getUploadUserImageStatus = (state) => state.events.uploadImage;
export const getUserToken = (state) => state.events.userToken;
export const getEvents = (state) => state.events.events;
export const getUserEvents = (state) => state.events.userEvents;
export const getEventData = (state) => state.events.addEvent;
export const getFilter = (state) => state.events.filter;
export const getCreateEventMessage = (state) => state.events.addEvent;
export const getSignedOutUserStatus = (state) => state.events.signedOut;
export const getRegistrationNotificationStatus = (state) =>
  state.events.registration;
export const getRegistrationResponseStatus = (state) =>
  state.events.registrationResponse;
export const getEventToEdit = (state) => state.events.eventToEdit;

export const {
  setSigninUserForm,
  setSignupUserForm,
  setFilter,
  cleanLoginMessage,
  cleanSignupMessage,
  cleanUploadImageStatus,
  cleanAddEventMessage,
  clearRegistrationNotificationStatus,
  clearRegistrationResponseStatus,
  setEventToEdit,
  resetStore,
} = eventsSlice.actions;

export default eventsSlice.reducer;
