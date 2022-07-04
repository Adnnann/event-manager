const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: "Title must be unique",
    required: "Course title is required!",
    maxlength: [55, "Title must be less than 55 characters"],
  },
  description: {
    type: String,
    required: "Course description is required!",
  },
  price: {
    type: String,
    required: "Course level is required!",
  },
  date: {
    type: Date,
    required: "Date of event is required!",
  },
  courseImage: {
    type: String,
  },
  createdBy: {
    type: String,
    default: Date.now,
  },
  status: {
    type: String,
  },
  category: {
    type: String,
  },
  updated: Date,
});

EventsSchema.path("title").validate(async function (title) {
  const course = await this.constructor.findOne({ title });
  if (course) {
    if (this.id === course.id) {
      return true;
    }
    return false;
  }
  return true;
}, "Event name must be unique!");

const Events = mongoose.model("Events", EventsSchema);
module.exports = Events;
