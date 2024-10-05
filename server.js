const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const BookingModel = require("./BookingModel");

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/utube")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  phoneNo: String,
  city: String,
  occupation: String,
  sports: String,
  gender: String,
  status: String,
});

const User = mongoose.model("User", UserSchema);

// Registration
app.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNo,
    city,
    occupation,
    sports,
    status,
    gender,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      phoneNo,
      password,
      city,
      occupation,
      sports,
      status,
      gender,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "Login successful", name: user.name });
      } else {
        res.status(401).send("Invalid email or password");
      }
    })
    .catch((error) => res.status(500).send("Error logging in: " + error));
});

// Haversine formula
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

// Distance Calculation API
app.post("/calculate-distance", (req, res) => {
  const { userLatitude, userLongitude, gymLatitude, gymLongitude } = req.body;

  if (!userLatitude || !userLongitude || !gymLatitude || !gymLongitude) {
    return res.status(400).json({ error: "All coordinates are required" });
  }

  const distance = haversineDistance(
    userLatitude,
    userLongitude,
    gymLatitude,
    gymLongitude
  ).toFixed(2);

  res.json({ distance: `${distance} km` });
});

app.get("/trainers", async (req, res) => {
  try {
    const trainers = await BookingModel.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainers" });
  }
});

//details
app.post("/add-trainer", async (req, res) => {
  const {
    trainerName,
    imgSrc,
    speciality,
    remuneration,
    availability,
    location,
  } = req.body;

  try {
    const newTrainer = new BookingModel({
      trainerName,
      imgSrc,
      speciality,
      remuneration,
      availability,
      location,
    });
    await newTrainer.save();
    res.status(201).json({ message: "Trainer added successfully!" });
  } catch (error) {
    console.error("Error details:", error);
    res
      .status(500)
      .json({ message: "Error adding trainer", error: error.message });
  }
});

// Email
app.post("/send-email", (req, res) => {
  const { trainerName, userEmail, userName } = req.body;

  // Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kaushikaina@gmail.com", // Replace with your actual Gmail address
      pass: "upzv qacl otbz zbmb", // Replace with your app-specific password
    },
  });

  // Mail options
  const mailOptions = {
    from: `"${userName}" <${userEmail}>`, // Send from the user's email with their name
    to: "kaushikaina@gmail.com", // Sending to yourself for testing
    subject: `Session Booking Confirmation: ${trainerName}`,
    text: `
      Hi ${trainerName},
    A new session has been selected by a user. Please be ready for the selected slot.
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);

      if (error.responseCode === 550 || error.responseCode === 554) {
        return res.status(500).json({
          message:
            "Email address not found (DNS error). Please check the recipient's email.",
        });
      }

      return res
        .status(500)
        .json({ message: "Email sending failed due to a server error." });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ message: `Email sent successfully to ${trainerName}.` });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
