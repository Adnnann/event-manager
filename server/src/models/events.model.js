import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: "Title must be unique",
    required: "Event title is required!",
    maxlength: [55, "Title must be less than 55 characters"],
  },
  description: {
    type: String,
    required: "Event description is required!",
  },
  price: {
    type: String,
    required: "Price is required!",
  },
  date: {
    type: Date,
    required: "Date of event is required!",
  },
  eventImage: {
    type: String,
  },
  createdBy: {
    type: String,
    default: Date.now,
  },
  status: {
    type: String,
    default: "active",
  },
  category: {
    type: String,
    required: "Category is required!",
  },
  participants: {
    type: Array,
  },
  dateOfCreation: {
    type: Date,
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

export default mongoose.model("Events", EventsSchema);
