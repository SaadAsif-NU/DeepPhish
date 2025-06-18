require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {

  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  dateOfBirth: String
});

const historySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  url: String,
  isPhishing: Boolean,
  date: { type: Date, default: Date.now }
});

const emailHistorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  emailBody: String,
  isSuspicious: Boolean,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const History = mongoose.model("History", historySchema);
const HistoryEmail = mongoose.model("HistoryEmail", emailHistorySchema);

// Load known URLs
const dataFolder = path.join(__dirname, "data");
let knownSafeUrls = [];
let knownPhishingUrls = [];

const loadUrlsFromFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8").split("\n").map((url) => url.trim());
  } catch (err) {
    console.error(`Error reading file: ${filePath}`, err);
    return [];
  }
};

const loadKnownUrls = () => {
  knownSafeUrls = loadUrlsFromFile(path.join(dataFolder, "knownsafeurls.txt"));
  knownPhishingUrls = loadUrlsFromFile(path.join(dataFolder, "knownphishingurls.txt"));
};

loadKnownUrls();

// Routes

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "All fields are required" });
});

app.post("/signUp", async (req, res) => {
  const { name, email, password, dateOfBirth } = req.body;
  if (!name || !email || !password || !dateOfBirth) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, dateOfBirth });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required!" });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

app.post("/test-url", async (req, res) => {
  const { userId, url } = req.body;
  if (!userId || !url)
    return res.status(400).json({ message: "User ID and URL are required!" });

  try {
    let isPhishing = false;

    if (knownSafeUrls.includes(url)) {
      isPhishing = false;

    } else if (knownPhishingUrls.includes(url)) {
      isPhishing = true;
    } else {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict/dataURL",
        { URL: url },
        { headers: { "Content-Type": "application/json" } }
      );
      isPhishing = response.data.is_phishing;
      console.log(response.data.is_phishing);
    }

    await History.create({ userId, url, isPhishing });

    return res.status(200).json(isPhishing);
  } catch (err) {
    res.status(500).json({ message: "Error checking URL", error: err.message });
  }
});

app.post("/check-email", async (req, res) => {
  const { userId, emailBody } = req.body;

  if (!userId || !emailBody)
    return res.status(400).json({ message: "User ID and email body are required!" });

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict/dataEmail",
      { BODY: emailBody },
      { headers: { "Content-Type": "application/json" } }
    );

    const isSuspicious = response.data.is_suspicious === "suspicious";

    await HistoryEmail.create({ userId, emailBody, isSuspicious });

    res.status(200).json({ emailBody, isSuspicious });
  } catch (error) {
    res.status(500).json({ message: "Error processing email", error: error.message });
  }
});

app.get("/history/:userId", async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId }).sort({ date: -1 });

    if (!history.length)
      return res.status(404).json({ message: "No history found for this user." });

    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/get-email-history/:userId", async (req, res) => {
  try {
    const history = await HistoryEmail.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json({ message: "Email history fetched successfully", history });
  } catch (err) {
    res.status(500).json({ message: "Error fetching email history", error: err.message });
  }
});

app.post("/change-password", async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  if (!userId || !oldPassword || !newPassword)
    return res.status(400).json({ message: "All fields are required!" });

  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect!" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password", error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
