import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../../functions/getUser";
import { UserState } from "../types/UserState";
import { loganisationGo } from "../../../functions/loganisationGo";
import { NavigateFunction } from "react-router-dom";

const initialState: UserState = {
  user: null,
  error: undefined,
  acssessToken: null,
};

export const get_user = createAsyncThunk("getUser", () => getUser());

export const loganisation = createAsyncThunk(
  "log/user",
  (obj: {
    nick: string;
    password: string;
    navigate: NavigateFunction;
    setMessage: (value: string) => void;
    setLoad: (value: boolean) => void;
  }) => loganisationGo(obj)
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.user && state.user.Contacts.push(action.payload);
    },
    registration: (state, action) => {
      state.user = action.payload;
    },
    newAvatar: (state, action) => {
      state.user ? (state.user.foto = action.payload) : false;
    },
    clearUserErr: (state) => (state.error = undefined),
  },
  extraReducers: (builder) => {
    builder.addCase(get_user.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.acssessToken = action.payload.acssessToken;
    });
    builder.addCase(get_user.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(loganisation.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loganisation.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { clearUserErr, newAvatar, registration, addContact } =
  userSlice.actions;
export default userSlice.reducer;
