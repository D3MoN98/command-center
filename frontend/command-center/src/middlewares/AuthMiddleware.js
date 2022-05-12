import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthMiddleware({ children }) {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
