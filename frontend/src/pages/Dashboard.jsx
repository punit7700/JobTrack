import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        shortlisted: 0,
        interview: 0,
        selected: 0,
        rejected: 0
    });

    const getStats = async () => {
        try {
            const response = await api.get("/jobs/stats");

            setStats(response.data.stats);

        } catch (error) {
            console.error(
                error.response?.data?.message ||
                "Failed to fetch statistics"
            );
        }
    };

    useEffect(() => {
        getStats();
    }, []);

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <h1>JobTrack Dashboard</h1>
                    <p>Track and manage your job applications.</p>
                </div>
            </div>

            <div className="stats-container">

                <div className="stat-card">
                    <h2>Total Applications</h2>
                    <p>{stats.total}</p>
                </div>

                <div className="stat-card">
                    <h2>Applied</h2>
                    <p>{stats.applied}</p>
                </div>

                <div className="stat-card">
                    <h2>Shortlisted</h2>
                    <p>{stats.shortlisted}</p>
                </div>

                <div className="stat-card">
                    <h2>Interviews</h2>
                    <p>{stats.interview}</p>
                </div>

                <div className="stat-card">
                    <h2>Selected</h2>
                    <p>{stats.selected}</p>
                </div>

                <div className="stat-card">
                    <h2>Rejected</h2>
                    <p>{stats.rejected}</p>
                </div>
            </div>

            <div className="dashboard-actions">
                <Link to="/jobs" className="dashboard-btn primary">
                    View My Applications
                </Link>

                <Link to="/jobs/new" className="dashboard-btn secondary">
                    Add New Job
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;