import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: ""
    });

    const getProfile = async () => {
        try {
            const response = await api.get("/users/profile");
            setUser(response.data.user);

            setFormData({
                name: response.data.user.name,
                email: response.data.user.email
            });
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(
                "/users/password",
                passwordData
            );

            alert(response.data.message);

            setPasswordData({
                currentPassword: "",
                newPassword: ""
            });

        } catch (error) {
            console.log("PASSWORD ERROR:", error);
            console.log("SERVER RESPONSE:", error.response?.data);

            alert(
                error.response?.data?.message ||
                "Failed to update password"
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put("/users/profile", formData);

            setUser(response.data.user);

            alert("Profile updated successfully");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="profile-page">

            <div className="profile-header">
                <h1>My Profile</h1>
                <p>Manage your account information and password.</p>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <button className="profile-submit" type="submit">
                    Update Profile
                </button>
            </form>

            <form className="password-form" onSubmit={handlePasswordSubmit}>

                <div className="password-header">
                    <h2>Change Password</h2>
                    <p>Update your password to keep your account secure.</p>
                </div>

                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                    />
                </div>

                <button className="password-submit" type="submit">
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Profile;