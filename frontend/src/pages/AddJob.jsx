import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddJob = () => {
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

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/jobs", formData);

            console.log(response.data);

            alert("Job application added successfully");

            navigate("/jobs");

            setFormData({
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

        } catch (error) {
            console.error(error.response?.data || error.message);

            alert(
                error.response?.data?.message ||
                "Failed to add job application"
            );
        }
    };

    return (
        <div className="add-job-page">

            <div className="add-job-header">
                <h1>Add Job Application</h1>
                <p>Add a new job application to your JobTrack.</p>
            </div>

            <form className="add-job-form" onSubmit={handleSubmit}>

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

                <button className="add-job-submit" type="submit">
                    Add Job
                </button>

            </form>
        </div>
    );
};

export default AddJob;