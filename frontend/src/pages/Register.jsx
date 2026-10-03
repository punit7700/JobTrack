import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register", formData);

            setMessage(response.data.message);

            setFormData({
                name: "",
                email: "",
                password: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Start tracking your job applications with JobTrack.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button className="auth-submit" type="submit">
                        Register
                    </button>

                    <p style={{ textAlign: "center", paddingTop: "10px" }}>
                        You have Already an Account <Link to="/login">Login</Link> here.
                    </p>
                </form>

                {message && <p className="auth-message">{message}</p>}

            </div>
        </div>
    );
};

export default Register;