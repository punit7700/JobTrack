import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getJob = async () => {
        try {
            const response = await api.get(`/jobs/${id}`);

            setJob(response.data.job);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch job"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJob();
    }, [id]);

    if (loading) {
        return <p>Loading job...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job application?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/jobs/${id}`);

            alert("Job application deleted successfully");

            navigate("/jobs");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete job application"
            );
        }
    };

    return (
        <div className="job-details-page">

            <div className="job-details-header">
                <div>
                    <h1>{job.company}</h1>
                    <p>{job.position}</p>
                </div>
            </div>

            <div className="job-info-card">

                <p>
                    <strong>Position:</strong> {job.position}
                </p>

                <p>
                    <strong>Location:</strong> {job.location}
                </p>

                <p>
                    <strong>Job Type:</strong> {job.jobType}
                </p>

                <p>
                    <strong>Salary:</strong> {job.salary || "Not specified"}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status-badge status-${job.status.toLowerCase()}`}>
                        {job.status}
                    </span>
                </p>

                <p>
                    <strong>Applied Date:</strong>{" "}
                    {new Date(job.appliedDate).toLocaleDateString()}
                </p>

                <p>
                    <strong>Notes:</strong> {job.notes || "No notes"}
                </p>

            </div>

            {job.jobUrl && (
                <p className="job-posting-action">
                    <a
                        className="job-action primary"
                        href={job.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View Job Posting
                    </a>
                </p>
            )}

            <div className="job-details-actions">

                <Link
                    className="job-action primary"
                    to={`/jobs/${job._id}/edit`}
                >
                    Edit Job
                </Link>

                <button
                    className="job-action danger"
                    onClick={handleDelete}
                >
                    Delete Job
                </button>

            </div>
        </div>
    );
};

export default JobDetails;