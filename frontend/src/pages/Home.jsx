
import { Link } from "react-router-dom";
import "./Home.css";

const features = [
    {
        icon: "📋",
        title: "Track Applications",
        description:
            "Keep all your job applications organized in one place."
    },
    {
        icon: "📊",
        title: "Monitor Progress",
        description:
            "See your application status and understand your job search progress."
    },
    {
        icon: "🎯",
        title: "Manage Interviews",
        description:
            "Track shortlisted applications, interviews, and final outcomes."
    },
    {
        icon: "🔎",
        title: "Find Applications Fast",
        description:
            "Search, filter, and manage your applications without the mess."
    }
];

function Home() {
    const token = localStorage.getItem("token");

    return (
        <div className="home-page">
            <header className="home-header">
                <Link to="/" className="home-logo">
                    <span className="logo-icon">J</span>
                    JobTrack
                </Link>

                <nav className="home-nav">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>

                    {token ? (
                        <Link to="/dashboard" className="nav-primary">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="nav-login">
                                Sign in
                            </Link>
                            <Link to="/register" className="nav-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main>
                <section className="home-hero">
                    <div className="hero-content">
                        <div className="hero-label">
                            YOUR JOB SEARCH, ORGANIZED
                        </div>

                        <h1>
                            Your next opportunity deserves a{" "}
                            <span>better plan.</span>
                        </h1>

                        <p className="hero-description">
                            Manage your job applications, track interviews,
                            and follow every opportunity from application
                            to offer — all in one place.
                        </p>

                        <div className="hero-actions">
                            <Link
                                to={token ? "/dashboard" : "/register"}
                                className="hero-primary"
                            >
                                {token ? "Go to Dashboard" : "Start Tracking for Free"}
                                <span>→</span>
                            </Link>

                            <a href="#features" className="hero-secondary">
                                Explore Features
                            </a>
                        </div>

                        <div className="hero-note">
                            <span>✓</span>
                            Stay organized. Track progress. Take control.
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="dashboard-preview">
                            <div className="preview-heading">
                                <div>
                                    <span className="preview-eyebrow">
                                        YOUR OVERVIEW
                                    </span>
                                    <h3>Job Search Dashboard</h3>
                                </div>
                                <span className="preview-live">
                                    <span></span> Organized
                                </span>
                            </div>

                            <div className="preview-stats">
                                <div className="preview-stat">
                                    <span>Total Applications</span>
                                    <strong>Track all</strong>
                                    <small>In one place</small>
                                </div>
                                <div className="preview-stat">
                                    <span>Interviews</span>
                                    <strong>Stay ready</strong>
                                    <small>Know your next step</small>
                                </div>
                            </div>

                            <div className="preview-list-heading">
                                <strong>Application Pipeline</strong>
                                <span>Stay on top of every opportunity</span>
                            </div>

                            <div className="preview-job">
                                <div className="preview-company company-blue">
                                    T
                                </div>
                                <div className="preview-job-info">
                                    <strong>Frontend Developer</strong>
                                    <span>Example Company</span>
                                </div>
                                <span className="preview-status status-applied">
                                    Applied
                                </span>
                            </div>

                            <div className="preview-job">
                                <div className="preview-company company-purple">
                                    D
                                </div>
                                <div className="preview-job-info">
                                    <strong>Software Developer</strong>
                                    <span>Example Company</span>
                                </div>
                                <span className="preview-status status-interview">
                                    Interview
                                </span>
                            </div>

                            <div className="preview-job">
                                <div className="preview-company company-green">
                                    W
                                </div>
                                <div className="preview-job-info">
                                    <strong>Web Developer</strong>
                                    <span>Example Company</span>
                                </div>
                                <span className="preview-status status-selected">
                                    Selected
                                </span>
                            </div>

                            <p className="preview-disclaimer">
                                Illustrative preview — sample data, not live stats.
                            </p>
                        </div>

                        <div className="floating-note">
                            <span>✓</span>
                            <div>
                                <strong>Stay in control</strong>
                                <small>One organized job search</small>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-features" id="features">
                    <div className="section-heading">
                        <span>BUILT FOR YOUR JOB SEARCH</span>
                        <h2>Less chaos. More clarity.</h2>
                        <p>
                            Everything you need to keep your applications
                            organized and your next steps clear.
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature) => (
                            <article className="feature-card" key={feature.title}>
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-cta" id="about">
                    <div>
                        <span>MAKE YOUR NEXT MOVE</span>
                        <h2>Give your job search a clear direction.</h2>
                        <p>
                            Start organizing your applications and keep every
                            opportunity within reach.
                        </p>
                    </div>

                    <Link
                        to={token ? "/dashboard" : "/register"}
                        className="cta-button"
                    >
                        {token ? "Open Dashboard" : "Create Your Account"} →
                    </Link>
                </section>
            </main>

            <footer className="home-footer">
                <Link to="/" className="home-logo">
                    <span className="logo-icon">J</span>
                    JobTrack
                </Link>

                <p>Make every application count.</p>
                <span>© {new Date().getFullYear()} JobTrack</span>
            </footer>
        </div>
    );
}

export default Home;
