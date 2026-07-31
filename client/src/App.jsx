import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sports from "./pages/Sports";
import WorkoutLogs from "./pages/WorkoutLogs";
import Goals from "./pages/Goals";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sports" element={<ProtectedRoute><Sports /></ProtectedRoute>} />
        <Route path="/workout-logs" element={<ProtectedRoute><WorkoutLogs /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}
