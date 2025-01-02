import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user, requiredRole }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  if (requiredRole === "admin" && user?.isGuest) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
