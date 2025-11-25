
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const currentUser = localStorage.getItem("currentUser");
    const isAuthenticated = currentUser ;
    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }
    return children
}
