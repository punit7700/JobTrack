import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        jobType: "Onsite",
        jobUrl: "",
        salary: "",
        appliedDate: "",
        status: "Applied",
        notes: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getJob = async () => {
        try {
            const response = await api.get(`/jobs/${id}`);

            const job = response.data.job;

            setFormData({
                company: job.company || "",
                position: job.position || "",
                location: job.location || "",
                jobType: job.jobType || "Onsite",
                jobUrl: job.jobUrl || "",
                salary: job.salary || "",
                appliedDate: job.appliedDate
                    ? job.appliedDate.split("T")[0]
                    : "",
                status: job.status || "Applied",
                notes: job.notes || ""
            });

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/jobs/${id}`, formData);

            alert("Job application updated successfully");

            navigate("/jobs");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update job"
            );
        }
    };

    if (loading) {
        return <p>Loading job...</p>;
    }

    if (error) {
        return <p className="edit-job-error">{error}</p>;
    }

    return (
        <div className="edit-job-page">

            <div className="edit-job-header">
                <h1>Edit Job Application</h1>
                <p>Update your job application details.</p>
            </div>

            <form className="edit-job-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="company">Company</label>

                    <input
                        id="company"
                        type="text"
                        name="company"
                        placeholder="Enter company name"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="position">Position</label>

                    <input
                        id="position"
                        type="text"
                        name="position"
                        placeholder="Enter job position"
                        value={formData.position}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>

                    <input
                        id="location"
                        type="text"
                        name="location"
                        placeholder="Enter job location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="jobType">Job Type</label>

                    <select
                        id="jobType"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                    >
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="jobUrl">Job URL</label>

                    <input
                        id="jobUrl"
                        type="url"
                        name="jobUrl"
                        placeholder="https://example.com/job"
                        value={formData.jobUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salary</label>

                    <input
                        id="salary"
                        type="text"
                        name="salary"
                        placeholder="e.g. 5 LPA"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="appliedDate">Applied Date</label>

                    <input
                        id="appliedDate"
                        type="date"
                        name="appliedDate"
                        value={formData.appliedDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>

                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>

                    <textarea
                        id="notes"
                        name="notes"
                        placeholder="Add any notes about this application"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                <button className="update-job-button" type="submit">
                    Update Job
                </button>

            </form>
        </div>
    );
};

export default EditJob;