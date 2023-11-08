import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./components/personalisation/slises/userSlice";
import logoSlice from "./components/logo/slices/logoSlice";
import chatsSlice from "./components/chats/slices/chatsSlice";
import listingSlice from "./components/chats/slices/listingSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    literas: logoSlice,
    chats: chatsSlice,
    listing: listingSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export type TimeOut = ReturnType<typeof setTimeout>;

export default store;
