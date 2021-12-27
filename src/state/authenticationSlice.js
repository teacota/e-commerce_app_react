import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseLocalStorage } from "../helpers/parseLocalStorage";

export const register = createAsyncThunk(
  "register/register",
  async (dispatch, getState) => {
    const user = await axios.post(
      process.env.REACT_APP_API + "auth/registration/",
      { ...dispatch }
    );
    return user;
  }
);

export const login = createAsyncThunk(
  "login/login",
  async (dispatch, getState) => {
    const user = await axios.post(process.env.REACT_APP_API + "auth/login/", {
      ...dispatch,
    });
    return user;
  }
);

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  user: parseLocalStorage("user"),
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },

    [register.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
    },

    [register.rejected]: (state) => {
      state.isLoading = false;
      state.error = "User registration failed";
    },

    [login.pending]: (state) => {
      state.isLoading = true;
    },

    [login.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      localStorage.setItem("user", JSON.stringify(payload.data.user));
      localStorage.setItem("token", JSON.stringify(payload.data.access_token));
      state.user = payload.data.user;
    },

    [login.rejected]: (state) => {
      state.isLoading = false;
      state.error = "User login failed";
    },
  },
});

export const { resetError, resetSuccess, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
