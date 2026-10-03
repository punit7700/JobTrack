import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddJob from "./pages/AddJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";


const ProtectedLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

const AuthRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />} />
                
                <Route
                    path="/register"
                    element={
                        <AuthRoute>
                            <Register />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Dashboard />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Profile />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Jobs />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/new"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <AddJob />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id/edit"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <EditJob />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <JobDetails />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <div style={{ padding: "40px", textAlign: "center" }}>
                            <h1>404</h1>
                            <p>Page not found.</p>

                            <Link to="/dashboard">
                                Go to Dashboard
                            </Link>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;