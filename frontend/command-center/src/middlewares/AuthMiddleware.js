import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authActionCreator } from "../store/auth";

export default function AuthMiddleware({ children }) {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let authUser = useSelector((state) => state.auth.authUser);
  let dispatch = useDispatch();

  const sessionTime = 10 * 60 * 60;

  // auto logout
  useEffect(() => {
    const delayDebounceFn = setInterval(() => {
      const lastLoginTime = new Date(authUser.last_login_at).getTime() / 1000;
      const now = new Date().getTime() / 1000;
      if (isLoggedIn && lastLoginTime + sessionTime < now) {
        dispatch(authActionCreator.AutoLogoutAction()).then(() => {
          return <Navigate to="/login" replace />;
        });
      }
    }, 1000 * 60);

    return () => clearTimeout(delayDebounceFn);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
