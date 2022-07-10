import express from "express";
import eventCtrl from "../controllers/events.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/events")
  .post(authCtrl.isSignedUser, eventCtrl.createEvent)
  .get(authCtrl.isSignedUser, eventCtrl.getEvents);

router
  .route("/api/userEvents/")
  .post(authCtrl.isSignedUser, eventCtrl.getUserEvents);

router
  .route("/api/event/:eventId")
  .get(authCtrl.isSignedUser, eventCtrl.getEvent)
  .put(authCtrl.isSignedUser, eventCtrl.updateEvent)
  .delete(authCtrl.isSignedUser, eventCtrl.removeEvent);

router.route("/api/eventRegistration").post(eventCtrl.registerForEvent);

router
  .route("/api/eventRegistrationResponse")
  .post(eventCtrl.registrationResponse);

router.route("/api/cancelEvent").post(eventCtrl.cancelEvent);

router.param("eventId", eventCtrl.eventByID);

export default router;
