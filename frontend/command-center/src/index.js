import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./assets/css/style.css";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import GuestMiddleware from "./middlewares/GuestMiddleware";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import ForgetPassword from "./views/auth/ForgetPassword";
import Login from "./views/auth/Login";
import ResetPassword from "./views/auth/ResetPassword";
import Dashboard from "./views/dashboard/Dashboard";
import NotFound from "./views/errors/NotFound";
import DashBoardLayout from "./views/layouts/DashBoardLayout";
import SimpleLayout from "./views/layouts/SimpleLayout";
import UserList from "./views/users/UserList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestMiddleware>
              <SimpleLayout>
                <App />
              </SimpleLayout>
            </GuestMiddleware>
          }
        />

        <Route
          path="/login"
          element={
            <GuestMiddleware>
              <SimpleLayout>
                <Login />
              </SimpleLayout>
            </GuestMiddleware>
          }
        />

        <Route
          path="forget-password"
          element={
            <GuestMiddleware>
              <SimpleLayout>
                <ForgetPassword />
              </SimpleLayout>
            </GuestMiddleware>
          }
        />

        <Route
          path="reset-password"
          element={
            <GuestMiddleware>
              <SimpleLayout>
                <ResetPassword />
              </SimpleLayout>
            </GuestMiddleware>
          }
        />

        <Route
          path="dashboard"
          element={
            <AuthMiddleware>
              <DashBoardLayout>
                <Dashboard />
              </DashBoardLayout>
            </AuthMiddleware>
          }
        />

        <Route
          path="user"
          element={
            <AuthMiddleware>
              <DashBoardLayout>
                <UserList />
              </DashBoardLayout>
            </AuthMiddleware>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
