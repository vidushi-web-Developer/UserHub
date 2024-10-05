const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  trainerName: { type: String, required: true, unique: true },
  imgSrc: { type: String, required: true },
  speciality: { type: String, required: true },
  remuneration: { type: String, required: true },
  availability: { type: String, required: true },
  location: { type: String, required: true },
});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
