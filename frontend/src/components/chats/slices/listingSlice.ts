import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../types/Chat";

const initialState: {
  focusChat: number;
  loading: boolean;
  focusMessage: number;
  viewedsActivate: boolean;
  newChat: Chat | null;
  menuFocusChatId: number | null;
  globalError: boolean;
  data: boolean;
  socketId: string;
} = {
  focusChat: 0,
  loading: true,
  focusMessage: 0,
  viewedsActivate: false,
  newChat: null,
  menuFocusChatId: null,
  globalError: false,
  data: false,
  socketId: '',
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setGlobalError: (state, action) => {
      state.globalError = action.payload;
      state.loading = true;
    },
    updateMenuFocusChat: (state, action) => {
      state.menuFocusChatId = action.payload;
    },
    updateNewChat: (state, action) => {
      state.newChat = action.payload;
    },

    changeViewedsActivate: (state, action) => {
      state.viewedsActivate = action.payload;
    },
    updateFocusMessage: (state, action) => {
      state.focusMessage = action.payload;
    },
    changeLoad: (state, action) => {
      state.loading = action.payload;
    },
    updateFocusChat: (state, action) => {
      state.focusChat = action.payload;
    },
  },
});

export default listingSlice.reducer;
export const {
  updateFocusChat,
  changeLoad,
  updateFocusMessage,
  changeViewedsActivate,
  updateNewChat,
  updateMenuFocusChat,
  setGlobalError,
  setData,
  setSocketId,
} = listingSlice.actions;
