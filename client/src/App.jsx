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
import Attire from "./pages/Attire";
import Stats from "./pages/Stats";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/sports" element={<ProtectedRoute><Sports /></ProtectedRoute>} />
          <Route path="/workout-logs" element={<ProtectedRoute><WorkoutLogs /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/attire" element={<ProtectedRoute><Attire /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
        </Routes>
      </main>
    </AuthProvider>
  );
}
