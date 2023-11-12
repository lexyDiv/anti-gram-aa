import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../types/Chat";
import newMessageSound from "../../../App/sounds/new_message.mp3";
import { Sounds } from "../types/Sounds";
import green from "../../../App/images/green.png";
import eye from "../../../App/images/eye.webp";
import like from "../../../App/images/like.png";
import dizlike from "../../../App/images/dizlike.png";
import addFoto from "../../../App/images/addFoto.png";
import addImage from "../../../App/images/addImage.png";
import clearFoto from "../../../App/images/clearFoto.webp";
import closed from "../../../App/images/closed.png";
import emojis from "../../../App/images/emojis.png";
import loading from "../../../App/images/loading.gif";
import stop from "../../../App/images/stop.png";
import send from "../../../App/images/whatsappSendButton.png";
import menu from "../../../App/images/menu.png";
import down from "../../../App/images/down.png";
import back from "../../../App/images/back.png";
import plast from "../../../App/images/back.png";
import pen from "../../../App/images/pen.jpg";
import scan from "../../../App/images/scan.png";

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
  sounds: Sounds;
  images: {
    scan: string;
    pen: string;
    plast: string;
    back: string;
    send: string;
    stop: string;
    loading: string;
    emojis: string;
    closed: string;
    green: string;
    eye: string;
    like: string;
    dizlike: string;
    addFoto: string;
    addImage: string;
    clearFoto: string;
    menu: string;
    down: string;
  };
} = {
  focusChat: 0,
  loading: true,
  focusMessage: 0,
  viewedsActivate: false,
  newChat: null,
  menuFocusChatId: null,
  globalError: false,
  data: false,
  socketId: "",
  sounds: { newMessage: new Audio(newMessageSound) },
  images: {
    scan,
    pen,
    plast,
    back,
    down,
    menu,
    green,
    eye,
    like,
    dizlike,
    send,
    stop,
    loading,
    emojis,
    closed,
    addFoto,
    addImage,
    clearFoto,
  },
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
