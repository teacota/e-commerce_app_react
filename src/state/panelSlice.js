import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (dispatch, getState) => {
    const users = await axios.get(process.env.REACT_APP_API + "users/");
    return users;
  }
);

export const patchUser = createAsyncThunk(
  "users/patchUser",
  async (dispatch, getState) => {
    const user = await axios({
      method: "put",
      url: process.env.REACT_APP_API + `users/${dispatch.id}/`,
      data: { ...dispatch.body },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token").split('"')[1],
      },
    });
    return user;
  }
);

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  users: [],
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.data;
      state.success = true;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Could not fetch users";
    },
    // [login.pending]: (state) => {
    //   state.isLoading = true;
    // },
    [patchUser.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload.data.id) {
          return payload.data;
        }
        return user;
      });
    },
    // [login.rejected]: (state) => {
    //   state.isLoading = false;
    //   state.error = "User login failed";
    // },
  },
});

export const { resetError, resetSuccess, logout } = panelSlice.actions;

export default panelSlice.reducer;
