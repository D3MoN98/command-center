import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../config/axios";

const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("auth_token"),
    authToken: localStorage.getItem("auth_token"),
    authUser: JSON.parse(localStorage.getItem("auth_user")) ?? null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem("auth_token", action.payload.auth_token);
      localStorage.setItem("auth_user", JSON.stringify(action.payload.user));
      state.authUser = action.payload.user;
      state.authToken = action.payload.auth_token;
    },
    logout(state, action) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      state.isLoggedIn = false;
      state.authToken = null;
      state.authUser = null;
    },
    setAuthUser(state, action) {
      localStorage.setItem("auth_user", JSON.stringify(action.payload.data));
      state.authUser = action.payload.data;
    },
  },
});

// action creator
const loginAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .post("api/login", data)
        .then((response) => response.data)
        .then((response) => {
          if (response.status == "success") {
            dispatch(auth.actions.login(response.data));
            toast.success(response.message);
            resolve(response);
          }
        })
        .catch((error) => {
          if (error.request.status == 422) {
            toast.error(error.response.data.message);
          }
          reject(error);
        });
    });
  });
};

const googleLoginAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get("api/login/google")
        .then((response) => response.data)
        .then((response) => {
          if (response.status == "success") {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const googleLoginCallbackAction = (query) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get(`api/login/google/callback/${query}`)
        .then((response) => response.data)
        .then((response) => {
          if (response.status == "success") {
            console.log(response);
            dispatch(auth.actions.login(response.data));
            toast.success(response.message);
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const logoutAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/logout")
      .then((response) => response.data)
      .then((response) => {
        toast.success(response.message);
        dispatch(authAction.logout());
        resolve(response);
      });
  });
};

const AutoLogoutAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    toast.success("Auto logged out");
    dispatch(authAction.logout());
    resolve("Auto logged out");
    reject("Something went wrong");
  });
};

const forgotPasswordAction = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .post("api/forgot-password", data)
        .then((response) => response.data)
        .then((response) => {
          toast.success(response.message);
          resolve(response);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          reject(error);
        });
    });
  });
};

const resetPasswordAction = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .put("api/reset-password", data)
        .then((response) => response.data)
        .then((response) => {
          toast.success(response.message);
          resolve(response);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          reject(error);
        });
    });
  });
};

const profileEditAction = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .put("api/profile", data)
      .then((response) => response.data)
      .then((response) => {
        dispatch(auth.actions.setAuthUser(response));
        toast.success(response.message);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const authActionCreator = {
  loginAction,
  logoutAction,
  forgotPasswordAction,
  resetPasswordAction,
  AutoLogoutAction,
  googleLoginAction,
  googleLoginCallbackAction,
  profileEditAction,
};

export const authAction = auth.actions;

export default auth.reducer;
