import React from "react";
import ForgetPassword from "../views/auth/ForgetPassword";
import Login from "../views/auth/Login";

export const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "Home",
    },
    component: () => import("../App"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login",
    },
    component: () => <Login />,
  },
  {
    path: "/forget-password",
    name: "forget-password",
    meta: {
      title: "Forget Password",
    },
    component: () => <ForgetPassword />,
  },
];
