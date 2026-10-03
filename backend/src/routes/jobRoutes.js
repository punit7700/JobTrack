const express = require("express");

const {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    getJobStats
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createJob);

router.get("/", protect, getJobs);

router.get("/stats", protect, getJobStats);

router.get("/:id", protect, getJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;