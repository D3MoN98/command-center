import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../config/axios";

const user = createSlice({
  name: "user",
  initialState: {
    users: [],
    total: 0,
    totalPage: 1,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.data;
      state.total = action.payload.meta.total;
      state.totalPage = action.payload.meta.last_page;
    },
  },
});

// action creator
const fetchUsersAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get("api/user", {
          params: data,
        })
        .then((response) => response.data)
        .then((response) => {
          dispatch(userAction.setUsers(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const updateUserAction = (id, data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .put(`api/user/${id}`, data)
        .then((response) => response.data)
        .then((response) => {
          toast.success(response.message);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const userActionCreator = {
  fetchUsersAction,
  updateUserAction,
};

export const userAction = user.actions;

export default user.reducer;
