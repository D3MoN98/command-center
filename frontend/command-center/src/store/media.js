import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../config/axios";

const media = createSlice({
  name: "media",
  initialState: {
    medias: [],
    media: null,
  },
  reducers: {
    setMedias(state, action) {
      let prev = state.medias;
      let medias = prev.concat(action.payload.data);
      state.medias = medias;
    },
    setMedia(state, action) {
      state.media = action.payload.data;
    },
    setConcatMedias(state, action) {
      let prev = state.medias;
      let medias = prev.unshift(action.payload.data);
      // console.log(medias);
      // state.medias = medias;
    },
  },
});

// action creator
const fetchMediasAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get("api/media", {
          params: data,
        })
        .then((response) => response.data)
        .then((response) => {
          dispatch(mediaAction.setMedias(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const fetchMediaAction = (id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get(`api/media/${id}`)
        .then((response) => response.data)
        .then((response) => {
          dispatch(mediaAction.setMedia(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const createMediaAction = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .post(`api/media/`, data)
        .then((response) => response.data)
        .then((response) => {
          toast.success(response.message);
          dispatch(mediaAction.setConcatMedias(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const fetchMediaByUserAction = (data, refresh) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios
        .get(`api/user-media/`, {
          params: data,
        })
        .then((response) => response.data)
        .then((response) => {
          dispatch(mediaAction.setMedias(response));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const mediaActionCreator = {
  fetchMediasAction,
  fetchMediaAction,
  createMediaAction,
  fetchMediaByUserAction,
};

export const mediaAction = media.actions;

export default media.reducer;
