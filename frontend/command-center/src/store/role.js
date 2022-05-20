import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../config/axios";

const role = createSlice({
  name: "role",
  initialState: {
    roles: [],
    total: 0,
    totalPage: 1,
    role: {
      name: "",
      label: "",
      description: "",
      permissions: [],
    },
  },
  reducers: {
    setRoles(state, action) {
      state.roles = action.payload.data;
      state.total = action.payload.meta.total;
      state.totalPage = action.payload.meta.last_page;
    },
    setRole(state, action) {
      state.role = action.payload.data;
    },
  },
});

// action creator
const fetchRolesAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get("api/role", {
          params: data,
        })
        .then((response) => response.data)
        .then((response) => {
          dispatch(roleAction.setRoles(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const fetchRoleAction = (id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get(`api/role/${id}`)
        .then((response) => response.data)
        .then((response) => {
          dispatch(roleAction.setRole(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const updateRoleAction = (data, id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .put(`api/role/${id}`, data)
        .then((response) => response.data)
        .then((response) => {
          toast.success(response.message);
          dispatch(roleAction.setRole(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const setPermisionToRoleAction = (data, id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .put(`api/role/permission/${id}`, data)
        .then((response) => response.data)
        .then((response) => {
          toast.success(response.message);
          dispatch(roleAction.setRole(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const roleActionCreator = {
  fetchRolesAction,
  fetchRoleAction,
  setPermisionToRoleAction,
  updateRoleAction,
};

export const roleAction = role.actions;

export default role.reducer;
