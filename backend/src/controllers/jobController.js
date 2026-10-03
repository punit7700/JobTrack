const mongoose = require("mongoose");
const JobApplication = require("../models/JobApplication");

const createJob = async (req, res) => {
    try {
        const {
            company,
            position,
            location,
            jobType,
            jobUrl,
            salary,
            appliedDate,
            status,
            notes
        } = req.body;

        // Required fields
        if (!company || !position) {
            return res.status(400).json({
                success: false,
                message: "Company and position are required"
            });
        }

        // Create job application
        const job = await JobApplication.create({
            company,
            position,
            location,
            jobType,
            jobUrl,
            salary,
            appliedDate,
            status,
            notes,
            userId: req.userId
        });

        res.status(201).json({
            success: true,
            message: "Job application created successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create job application",
            error: error.message
        });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = await JobApplication.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch job applications",
            error: error.message
        });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await JobApplication.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job application not found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch job application",
            error: error.message
        });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await JobApplication.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job application not found"
            });
        }

        const {
            company,
            position,
            location,
            jobType,
            jobUrl,
            salary,
            appliedDate,
            status,
            notes
        } = req.body;

        job.company = company ?? job.company;
        job.position = position ?? job.position;
        job.location = location ?? job.location;
        job.jobType = jobType ?? job.jobType;
        job.jobUrl = jobUrl ?? job.jobUrl;
        job.salary = salary ?? job.salary;
        job.appliedDate = appliedDate ?? job.appliedDate;
        job.status = status ?? job.status;
        job.notes = notes ?? job.notes;

        await job.save();

        res.status(200).json({
            success: true,
            message: "Job application updated successfully",
            job
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors)[0].message
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update job application"
        });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await JobApplication.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job application not found"
            });
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            message: "Job application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete job application",
            error: error.message
        });
    }
};

const getJobStats = async (req, res) => {
    try {
        const stats = await JobApplication.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.userId)
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const result = {
            total: 0,
            applied: 0,
            shortlisted: 0,
            interview: 0,
            selected: 0,
            rejected: 0
        };

        stats.forEach((item) => {
            result.total += item.count;

            if (item._id === "Applied") {
                result.applied = item.count;
            }

            if (item._id === "Shortlisted") {
                result.shortlisted = item.count;
            }

            if (item._id === "Interview") {
                result.interview = item.count;
            }

            if (item._id === "Selected") {
                result.selected = item.count;
            }

            if (item._id === "Rejected") {
                result.rejected = item.count;
            }
        });

        res.status(200).json({
            success: true,
            stats: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch job statistics",
            error: error.message
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    getJobStats
};