import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;  // redirect if no token
    }

    return children; // render the page if token exists
}

export default ProtectedRoute;