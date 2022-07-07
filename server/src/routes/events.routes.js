import express from "express";
import eventCtrl from "../controllers/events.controller";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router
  .route("/api/events")
  .post(eventCtrl.createEvent)
  .get(eventCtrl.getEvents);

router.route("/api/userEvents/").post(eventCtrl.getUserEvents);

router
  .route("/api/event/:eventId")
  .get(eventCtrl.getEvent)
  .put(eventCtrl.updateEvent)
  .delete(eventCtrl.removeEvent);

router.route("/api/eventRegistration").post(eventCtrl.registerForEvent);

router
  .route("/api/eventRegistrationResponse")
  .post(eventCtrl.registrationResponse);

router.route("/api/cancelEvent").post(eventCtrl.cancelEvent);

router.param("eventId", eventCtrl.eventByID);

export default router;
