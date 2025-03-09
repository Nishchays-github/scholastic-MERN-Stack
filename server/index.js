const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("./model"); // User Schema
const Discussion = require("./discussion"); // Discussion Schema

const app = express();
const PORT = 5000;
const radius = 10000;
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://manu:manu2004@cluster0.llkyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// -------------------- User Registration --------------------
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// -------------------- User Login (Simplified) --------------------
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ email, password }); // Simple match
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        res.json({ message: "Login successful", userId: user._id, name: user.name });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// -------------------- Get User's Current Location --------------------
app.get("/api/location", async (req, res) => {
    try {
        const response = await axios.get(`http://api.ipstack.com/check?access_key=6f61cc230baef3ff75bb1be0871bba1e`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching location data" });
    }
});

// -------------------- Search for a Location --------------------
app.post("/api/search", async (req, res) => {
    const { location } = req.body;
    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }
    try {
        const response = await axios.get("https://api.api-ninjas.com/v1/geocoding", {
            params: { city: location, country: "India" },
            headers: { "X-Api-Key": "/grzDUcTJIzNo+ICUV/jfA==hVV7sqYupbVGQ72P" }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching location coordinates" });
    }
});

// -------------------- Get Nearby Schools --------------------
app.get("/api/schools", async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }
    try {
        const url = `https://api.olamaps.io/places/v1/nearbysearch?location=${latitude},${longitude}&types=school&radius=${radius}&withCentroid=false&rankBy=popular&limit=50&api_key=1IyYo0305btp776JXy73Lydn3g4mKClKtn5sQa4S`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching schools:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch school data" });
    }
});

// -------------------- Post a Question --------------------
app.post("/api/discussions", async (req, res) => {
    try {
        const { userId, question } = req.body;
        if (!userId || !question) {
            return res.status(400).json({ error: "User ID and question are required" });
        }
        const newDiscussion = new Discussion({ userId, question });
        await newDiscussion.save();
        res.status(201).json({ message: "Question posted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// -------------------- Post an Answer --------------------
app.post("/api/discussions/:id/answer", async (req, res) => {
    try {
        const { userId, answer } = req.body;
        const discussionId = req.params.id;
        if (!userId || !answer) {
            return res.status(400).json({ error: "User ID and answer are required" });
        }
        await Discussion.findByIdAndUpdate(discussionId, { $push: { answers: { userId, answer } } });
        res.status(201).json({ message: "Answer posted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// -------------------- Fetch All Discussions --------------------
app.get("/api/discussions", async (req, res) => {
    try {
        const discussions = await Discussion.find().populate("userId", "name");
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// -------------------- Start Server --------------------
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
