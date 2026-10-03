import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

    <Link className="navbar-brand" to="/dashboard">
        JobTrack
    </Link>

    <div className="navbar-links">
        <Link to="/dashboard">
            Dashboard
        </Link>

        <Link to="/jobs">
            My Jobs
        </Link>

        <Link to="/jobs/new">
            Add Job
        </Link>

        <Link to="/profile">
            Profile
        </Link>

        <button className="navbar-logout" onClick={handleLogout}>
    Logout
</button>
    </div>

</nav>
    );
};

export default Navbar;