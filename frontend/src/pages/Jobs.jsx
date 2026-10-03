import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [jobTypeFilter, setJobTypeFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("Latest");

    const getJobs = async () => {
        try {
            const response = await api.get("/jobs");

            setJobs(response.data.jobs);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch jobs"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    if (loading) {
        return <p>Loading jobs...</p>;
    }

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("All");
        setJobTypeFilter("All");
        setSortOrder("Latest");
    };

    const filteredJobs = jobs
        .filter((job) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                job.company.toLowerCase().includes(searchText) ||
                job.position.toLowerCase().includes(searchText) ||
                (job.location || "").toLowerCase().includes(searchText);

            const matchesStatus =
                statusFilter === "All" ||
                job.status === statusFilter;

            const matchesJobType =
                jobTypeFilter === "All" ||
                job.jobType === jobTypeFilter;

            return matchesSearch && matchesStatus && matchesJobType;
        })
        .sort((a, b) => {
            const dateA = new Date(a.appliedDate || a.createdAt);
            const dateB = new Date(b.appliedDate || b.createdAt);

            return sortOrder === "Latest"
                ? dateB - dateA
                : dateA - dateB;
        });

    return (
        <div className="jobs-page">

            <div className="jobs-header">
                <div>
                    <h1>My Job Applications</h1>
                    <p>Track, filter and manage your job applications.</p>
                </div>

                <Link className="add-job-button" to="/jobs/new">
                    + Add New Job
                </Link>
            </div>

            <div className="filters-container">

                <input
                    type="text"
                    placeholder="Search company or position"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <select
                    value={jobTypeFilter}
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                >
                    <option value="All">All Job Types</option>
                    <option value="Remote">Remote</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="Latest">Latest</option>
                    <option value="Oldest">Oldest</option>
                </select>

                <button onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>

            <p className="jobs-count">
                Showing {filteredJobs.length} application
                {filteredJobs.length !== 1 ? "s" : ""}
            </p>

            {error && <p>{error}</p>}

            {filteredJobs.length === 0 ? (
                <p>No matching job applications found.</p>
            ) : (
                <div className="jobs-grid">
                    {filteredJobs.map((job) => (
                        <div className="job-card" key={job._id}>

                            <div className="job-card-header">
                                <h2>{job.company}</h2>
                                <span className={`status-badge status-${job.status.toLowerCase()}`}>
                                    {job.status}
                                </span>
                            </div>

                            <p>
                                <strong>Position:</strong> {job.position}
                            </p>

                            <p>
                                <strong>Location:</strong>{" "}
                                {job.location || "Not specified"}
                            </p>
                            <p>
                                <strong>Job Type:</strong>{" "}
                                {job.jobType || "Not specified"}
                            </p>

                            <p>
                                <strong>Applied Date:</strong>{" "}
                                {job.appliedDate
                                    ? new Date(job.appliedDate).toLocaleDateString()
                                    : "Not specified"}
                            </p>

                            <Link className="job-action primary" to={`/jobs/${job._id}`}>
                                View Details
                            </Link>

                            <Link className="job-action secondary" to={`/jobs/${job._id}/edit`}>
                                Edit
                            </Link>

                            {job.jobUrl && (
                                <a
                                    className="job-action secondary"
                                    href={job.jobUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Job Posting
                                </a>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;