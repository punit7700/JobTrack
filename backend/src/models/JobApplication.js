const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true
        },

        position: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            trim: true
        },

        jobType: {
            type: String,
            enum: ["Remote", "Onsite", "Hybrid"],
            default: "Onsite"
        },

        jobUrl: {
            type: String,
            trim: true
        },

        salary: {
            type: String,
            trim: true
        },

        appliedDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Shortlisted",
                "Interview",
                "Selected",
                "Rejected"
            ],
            default: "Applied"
        },

        notes: {
            type: String,
            trim: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);