import express from "express";
import eventCtrl from "../controllers/events.controller";

const router = express.Router();

router.route("/api/events").post(eventCtrl.createEvent).get(eventCtrl.getEvent);

router
  .route("/api/event/:eventId")
  .get(eventCtrl.getEvent)
  .put(eventCtrl.updateEvent)
  .delete(eventCtrl.removeEvent);

router.param("eventId", eventCtrl.eventByID);

export default router;
