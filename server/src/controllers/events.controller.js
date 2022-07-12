import _ from "lodash";
import jwtDecode from "jwt-decode";
import Event from "../models/events.model.js";
import dbErrorHandlers from "./helpers/dbErrorHandlers.js";

const createEvent = (req, res) => {
  const event = new Event(req.body);
  event.dateOfCreation = Date.now();
  event.save((err) => {
    if (err) {
      return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
    }
    return res.send({ message: "Event successfuly created" });
  });
};
const getEvents = (req, res) => {
  Event.find({}).exec((err, events) => {
    if (err) {
      return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
    }
    return res.send({ events });
  });
};

const getUserEvents = (req, res) => {
  Event.find({})
    .where({ createdBy: req.body.id })
    .exec((err, events) => {
      if (err) {
        return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
      }
      return res.send({ events });
    });
};

const getEvent = (req, res) => {
  res.status(200).json(req.profile);
};
const updateEvent = (req, res, next) => {
  let event = req.event;
  event = _.extend(event, req.body);
  event.updated = Date.now();
  event.save((err) => {
    if (err) {
      return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
    }
    return res.send({ message: "Data updated" });
  });
};

const removeEvent = (req, res, next) => {
  const event = req.profile;
  event.remove((err) => {
    if (err) {
      return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
    }
    res.send({ message: "Event deleted" });
  });
};

const registerForEvent = (req, res) => {
  Event.findOneAndUpdate(
    { _id: req.body.eventId },
    {
      $push: {
        participants: {
          participant: req.body.participant,
          email: req.body.email,
          status: "pending",
          title: req.body.title,
          description: req.body.description,
        },
      },
    }
  ).exec((err, event) => {
    if (err) console.log(error);
    return res.send({ message: event });
  });
};

const registrationResponse = (req, res) => {
  Event.findOneAndUpdate(
    { _id: req.body.eventId },
    { participants: req.body.participants }
  ).exec((err, event) => {
    if (err) console.log(error);
    return res.send({ message: event });
  });
};

const cancelEvent = (req, res) => {
  Event.findOneAndUpdate({ _id: req.body.id }, { status: "canceled" }).exec(
    (err, event) => {
      if (err) return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
      return res.send({ message: "Event canceled" });
    }
  );
};

const eventByID = (req, res, next, id) => {
  Event.findById(id).exec((err, event) => {
    if (err || !event) {
      return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
    }
    req.event = event;
    next();
  });
};

export default {
  createEvent,
  getEvents,
  updateEvent,
  removeEvent,
  getEvent,
  getUserEvents,
  registerForEvent,
  registrationResponse,
  cancelEvent,
  eventByID,
};
