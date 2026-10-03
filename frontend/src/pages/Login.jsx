import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
            const response = await api.post("/auth/login", formData);

            localStorage.setItem("token", response.data.token);

            setMessage(response.data.message);

            setFormData({
                email: "",
                password: ""
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to continue managing your job applications.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
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
                        Login
                    </button>
                    
                    <p style={{ textAlign: "center", paddingTop: "10px" }}>
                        Create your new Account <Link to="/register">Register</Link> here.
                    </p>
                </form>

                {message && <p className="auth-message">{message}</p>}

            </div>
        </div>
    );
};

export default Login;