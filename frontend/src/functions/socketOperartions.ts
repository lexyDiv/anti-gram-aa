import { Socket } from "socket.io-client";
import {
  addChatAll,
  addDisLike,
  addLike,
  addMessageToChat,
  addNewChat,
  deleteChat,
  deleteMessage,
  newMessage,
  putMessage,
  socketChatsUpdate,
  updateOnline,
  updateSeengs,
} from "../components/chats/slices/chatsSlice";
import { Dislike } from "../components/chats/types/Dislike";
import { Like } from "../components/chats/types/Like";
import { Viewed } from "../components/chats/types/Viewed";
import { AppDispatch } from "../store";
import { User } from "../components/personalisation/types/User";
import { Chat } from "../components/chats/types/Chat";
import {
  changeLoad,
  setData,
  setGlobalError,
  setSocketId,
  updateFocusChat,
  updateFocusMessage,
  updateNewChat,
} from "../components/chats/slices/listingSlice";
import { MutableRefObject } from "react";
import { addContact } from "../components/personalisation/slises/userSlice";
import { Sounds } from "../components/chats/types/Sounds";

export function socketOperations({
  socket,
  dispatch,
  user,
  actualChats,
  actualFocusMessage,
  sounds,
}: {
  socket: Socket;
  dispatch: AppDispatch;
  user: User;
  actualChats: MutableRefObject<Chat[]>;
  actualFocusMessage: MutableRefObject<number>;
  sounds: Sounds;
}): void {
  socket.on('socketId', (data) => {
    dispatch(setSocketId(data.socketId));
  })
  socket.on("get:chats", (data) => {
    dispatch(changeLoad(true));
    if (data.message === "ok") {
      dispatch(socketChatsUpdate(data.chatsData));
      dispatch(setData(true));
    } else {
      dispatch(setGlobalError(true));
    }
  });

  socket.on("contact", (data) => {
    dispatch(addContact(data));
  });

  socket.on("new:all:chat", (data) => {
    dispatch(updateNewChat(data));
    dispatch(changeLoad(true));
    dispatch(addNewChat({ chat: data }));
    dispatch(updateFocusChat(data.id));
    dispatch(updateFocusMessage(0));
  });

  socket.on("add:chat:all", (data) => {
    dispatch(addChatAll(data));
    dispatch(updateFocusChat(data.id));
    dispatch(changeLoad(true));
    dispatch(updateNewChat(data));
  });

  socket.on("delete/chat", (data) => {
    dispatch(changeLoad(true));
    if (data.message === "ok") {
      dispatch(deleteChat({ chatId: data.chatId }));
      dispatch(updateFocusChat(null));
    }
  });

  socket.on("offline", (data) => {
    dispatch(
      updateOnline({ alienNickName: data.alienNickName, online: false })
    );
  });

  socket.on("online", (data) => {
    dispatch(updateOnline({ alienNickName: data.alienNickName, online: true }));
  });

  socket.on("message/delete", (data) => {
    data.messageId === actualFocusMessage.current &&
      dispatch(updateFocusMessage(0));
    dispatch(
      deleteMessage({
        chatId: data.chatId,
        messageId: data.messageId,
        alienForvard: data.forvard,
        alienStepsPlan: data.stepsPlan,
        myStepsPlan: actualChats.current.find((chat) => chat.id === data.chatId)
          ?.stepsPlan,
      })
    );
    dispatch(changeLoad(true));
  });

  socket.on("add/personal/chat", (data) => {
    dispatch(changeLoad(true));
    const chat = actualChats.current.find((el) => el.id === data.chat.id);
    if (!chat) {
      dispatch(addNewChat({ forvard: true, chat: data.chat }));
      dispatch(updateNewChat(data.chat));
    }
    if (data.forvard) {
      dispatch(updateFocusMessage(0));
      dispatch(updateFocusChat(data.chat.id));
    }
  });

  socket.on("put/message", (data) => {
    dispatch(updateFocusMessage(0));
    dispatch(changeLoad(true));
    dispatch(putMessage(data));
  });

  socket.on("chat:addViewed", (data: { chatId: number; viewed: Viewed }) => {
    dispatch(updateSeengs(data));
  });

  socket.on("chat:addLike", (data: { like: Like; chatId: number }) => {
    dispatch(changeLoad(true));
    dispatch(addLike(data));
  });

  socket.on("chat:addDisLike", (data: { disLike: Dislike; chatId: number }) => {
    dispatch(changeLoad(true));
    dispatch(addDisLike(data));
  });

  socket.on(
    "chat:incoming",
    (data: { message: { user_id: number; chat_id: number } }) => {
      if (user && user.id === data.message.user_id) {
        dispatch(changeLoad(true));
        dispatch(updateFocusMessage(0));
        dispatch(
          newMessage({ chatId: data.message.chat_id, newMessage: true })
        );
      } else {
        sounds.newMessage.play();
      }
      dispatch(addMessageToChat(data.message));
    }
  );
}
