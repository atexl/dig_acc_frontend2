// ...existing code...
import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./components/Login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
