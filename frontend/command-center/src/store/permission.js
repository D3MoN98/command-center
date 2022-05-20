import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

const permission = createSlice({
  name: "permission",
  initialState: {
    permissions: [],
    total: 0,
    totalPage: 1,
    permission: null,
  },
  reducers: {
    setpermissions(state, action) {
      state.permissions = action.payload.data;
      state.total = action.payload.meta.total;
      state.totalPage = action.payload.meta.last_page;
    },
  },
});

// action creator
const fetchpermissionsAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get("api/permission", {
          params: data,
        })
        .then((response) => response.data)
        .then((response) => {
          dispatch(permissionAction.setpermissions(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const permissionActionCreator = {
  fetchpermissionsAction,
};

export const permissionAction = permission.actions;

export default permission.reducer;
