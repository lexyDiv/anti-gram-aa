import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Logo from "../components/logo/Logo";
import PersRoom from "../components/personalisation/PersRoom";
import ChatRoom from "../components/chats/ChatRoom";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  statePrevDefault,
  updateOnline,
} from "../components/chats/slices/chatsSlice";
import { chatRegistration } from "../functions/chatsRegistration";
import { updateNewChat } from "../components/chats/slices/listingSlice";
import { socketOperations } from "../functions/socketOperartions";
import { getChatsSocket } from "../functions/getChatsSocket";
import { userSocketJoin } from "../functions/userSocketJoin";
import { sleepingListener } from "../components/chats/specialFunctions/sleepingListener";

export const socket = io();
let reLoad = false;

function App(): JSX.Element {
  const navigate = useNavigate();
  const [screen, setScrren] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { prevOffline, prevOnline, loadOK } = useSelector(
    (state: RootState) => state.chats
  );
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const { focusMessage } = useSelector((state: RootState) => state.listing);
  const actualFocusMessage = useRef(focusMessage);
  actualFocusMessage.current = focusMessage;
  const actualChats = useRef(chats);
  actualChats.current = chats;
  const actualState = useRef(useSelector((state: RootState) => state.chats));
  actualState.current = useSelector((state: RootState) => state.chats);
  const { newChat } = useSelector((state: RootState) => state.listing);
  const { socketId } = useSelector((state: RootState) => state.listing);
  const actualSocketId = useRef(socketId);
  actualSocketId.current = socketId;
  const { data } = useSelector((state: RootState) => state.listing);
  const actualData = useRef(data);
  actualData.current = data;

  useEffect(() => {
    navigate("/");
    window.addEventListener("resize", () => {
      setScrren({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  useEffect(() => {
    prevOnline.forEach((el) =>
      dispatch(updateOnline({ alienNickName: el, online: true }))
    );
    prevOffline.forEach((el) =>
      dispatch(updateOnline({ alienNickName: el, online: false }))
    );
    dispatch(statePrevDefault());
  }, [loadOK]);

  useEffect(() => {
    newChat &&
      user &&
      chatRegistration({
        socket,
        chatId: String(newChat.id),
      });
    dispatch(updateNewChat(null));
  }, [newChat]);

  useEffect(() => {
    if (!reLoad && user) {
      socketOperations({
        socket,
        dispatch,
        user,
        actualChats,
        actualFocusMessage,
      });

      getChatsSocket({ socket, user, dispatch });
      userSocketJoin({ socket, user });
      reLoad = true;
    }
    user && sleepingListener({ actualSocketId, actualData });
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Logo />} />
      <Route path="/personalisation" element={<PersRoom />} />
      <Route
        path="/chats"
        element={<ChatRoom screen={screen} socket={socket} />}
      />
    </Routes>
  );
}

export default App;
