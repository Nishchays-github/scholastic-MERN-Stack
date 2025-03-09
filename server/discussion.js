const mongoose = require("mongoose");

const DiscussionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true },
    answers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            answer: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Discussion", DiscussionSchema);