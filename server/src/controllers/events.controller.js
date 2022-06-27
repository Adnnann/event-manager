import _ from "lodash";
import jwtDecode from "jwt-decode";
import Event from "../models/events.model";
import dbErrorHandlers from "./helpers/dbErrorHandlers";

const createEvent = (req, res) => {
  const event = new Event(req.body);
  event.save((err) => {
    if (err) {
      return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
    }
    return res.send({ message: "Event successfuly created" });
  });
};
const getEvents = (req, res) => {
  // get id to enable filtering of data
  const user = jwtDecode(req.cookies.userJwtToken);

  // filter data - get transactions for last three days
  Event.find({})
    .where("userId")
    .equals(userId)
    // sort data in descending order
    .sort({ created: -1 })
    .exec((err, transactions) => {
      if (err) {
        return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
      }
      res.send({ transactions });
    });
};

const getEvent = (req, res) => {
  res.status(200).json(req.profile);
};
const updateEvent = (req, res, next) => {
  let event = req.event;
  event = _.extend(event, req.body);
  event.updated = Date.now();
  Event.save((err) => {
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

const eventByID = (req, res, next, id) => {
  Event.findById(id).exec((err, Event) => {
    if (err || !Event) {
      return res.send({ error: dbErrorHandlers.getErrorMessage(err) });
    }
    req.Event = Event;
    next();
  });
};

export default {
  createEvent,
  getEvents,
  updateEvent,
  removeEvent,
  getEvent,
  eventByID,
};
