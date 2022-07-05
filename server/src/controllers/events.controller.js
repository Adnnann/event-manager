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

const registerForEvent = (req, res) => {
  console.log(req.body)

  Event.findOneAndUpdate(
  {_id:req.body.eventId},
  {$push: {participants: req.body.participant}})
    .exec((err,event)=>{
      if(err)console.log(error)
      return res.send({message:event})
    });
 
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
  eventByID,
};
