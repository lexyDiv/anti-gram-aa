import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatsState } from "../types/ChatsState";
import { User } from "../../personalisation/types/User";
import { getChats } from "../../../functions/getChats";
import { getOldMessages } from "../../../functions/getOldMessages";
import { MutableRefObject } from "react";
import { AppDispatch } from "../../../store";
import { Socket } from "socket.io-client";
import { goToAboutMessage } from "../../../functions/goToAboutMessage";
import { Message } from "../types/Message";
import { Chat } from "../types/Chat";

const initialState: ChatsState = {
  chats: [],
  error: undefined,
  prevOnline: [],
  prevOffline: [],
  loadOK: false,
};

export const goToAboutMessageFetch = createAsyncThunk(
  "go/to/aboutMessage",
  (obj: {
    dispatch: AppDispatch;
    aboutMessage: Message;
    chat: Chat;
    messageBox: MutableRefObject<HTMLElement | null>;
    userId: number;
  }) => goToAboutMessage(obj)
);

export const get_oldMessages = createAsyncThunk(
  "get/oldMessages",
  (obj: {
    limit: number;
    offset: number;
    chatId: number;
    vector: string;
    userId: number;
    messageBox: MutableRefObject<HTMLElement | null>;
    dispatch: AppDispatch;
  }) => getOldMessages(obj)
);

export const get_chats = createAsyncThunk(
  "get/chats",
  (obj: { dispatch: AppDispatch; user: User; socket: Socket }) => getChats(obj)
);

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    socketChatsUpdate: (state, action) => {
      state.chats = action.payload;
    },
    setLoadOk: (state) => {
      state.loadOK = true;
    },
    addChatAll: (state, action) => {
      state.chats.push(action.payload);
    },
    deleteChat: (state, action) => {
      state.chats = state.chats.filter(
        (chat) => chat.id !== action.payload.chatId
      );
    },
    statePrevDefault: (state) => {
      state.prevOffline = [];
      state.prevOnline = [];
    },
    updateOnline: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.alien?.nickName === action.payload.alienNickName
      );
      if (chat) {
        chat.online = action.payload.online;
      } else if (action.payload.online) {
        state.prevOnline.push(action.payload.alienNickName);
      } else {
        state.prevOffline.push(action.payload.alienNickName);
      }
    },
    updateStepsPlan: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.stepsPlan = action.payload.stepsPlan;
      }
    },
    scrollFocusMessageIdDefault: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.scrollFocusMessageId = 0;
      }
    },
    deleteMessageDefault: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      chat ? (chat.deleteMessage = false) : false;
    },
    deleteMessage: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.messages = chat.messages.filter(
          (message) => message.id !== action.payload.messageId
        );
        chat.oldMessages = chat.oldMessages.filter(
          (message) => message.id !== action.payload.messageId
        );
        chat.messages.forEach((message) => {
          message.midi_message_id &&
          message.midi_message_id === action.payload.messageId
            ? (message.aboutMessage = null)
            : false;
        });
        chat.oldMessages.forEach((message) => {
          message.midi_message_id &&
          message.midi_message_id === action.payload.messageId
            ? (message.aboutMessage = null)
            : false;
        });
        const myStepsPlan = action.payload.myStepsPlan;
        const alienStepsPlan: number[] = action.payload.alienStepsPlan;
        const alienForvard = action.payload.alienForvard;
        let alIndex = alienStepsPlan
          .slice(0, alienForvard - 1)
          .reduce((acc: number, el: number) => acc + el, 0);
        for (let i = 0; i < myStepsPlan.length; i++) {
          alIndex -= myStepsPlan[i];
          if (alIndex < 0) {
            chat.stepsPlan[i] -= 1;
            break;
          }
        }

        chat.allMessages -= 1;
        chat.deleteMessage = true;
      }
    },
    addNewChat: (state, action) => {
      state.chats.push(action.payload.chat);
    },
    putMessage: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chat_id
      );
      if (chat) {
        let stop = false;

        chat.messages.forEach((message) => {
          if (
            message.midi_message_id &&
            message.aboutMessage &&
            message.midi_message_id === action.payload.id
          ) {
            message.aboutMessage.body = action.payload.body;
            message.aboutMessage.image = action.payload.image;
            message.aboutMessage.emojiId = action.payload.emojiId;
          }
        });

        for (let i = 0; i < chat.messages.length; i += 1) {
          const message = chat.messages[i];
          if (message.id === action.payload.id) {
            message.body = action.payload.body;
            message.image = action.payload.image;
            message.emojiId = action.payload.emojiId;
            stop = true;
            break;
          }
        }
        if (!stop) {
          chat.oldMessages.forEach((message) => {
            if (
              message.midi_message_id &&
              message.aboutMessage &&
              message.midi_message_id === action.payload.id
            ) {
              message.aboutMessage.body = action.payload.body;
              message.aboutMessage.image = action.payload.image;
              message.aboutMessage.emojiId = action.payload.emojiId;
            }
          });
          for (let i = 0; i < chat.oldMessages.length; i += 1) {
            const message = chat.oldMessages[i];
            if (message.id === action.payload.id) {
              message.body = action.payload.body;
              message.image = action.payload.image;
              message.emojiId = action.payload.emojiId;
              stop = true;
              break;
            }
          }
        }
      }
    },
    newMessage: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.newMessage = action.payload.newMessage;
      }
    },
    clickOnChat: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.click = action.payload.click;
      }
    },
    scrollTopChat: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.scrollTop = action.payload.scrollTop;
      }
    },
    changeForvard: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.forvard = action.payload.forvard;
      }
    },
    addViewes: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      let message;
      if (chat) {
        message =
          chat.messages.find(
            (message) => message.id === action.payload.messageId
          ) ||
          chat.oldMessages.find(
            (message) => message.id === action.payload.messageId
          );
        message ? message.Vieweds.push({ user_id: 0, message_id: 0 }) : false;
      }
    },
    updateSeengs: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        const message = chat.messages.find(
          (message) => message.id === action.payload.viewed.message_id
        );
        message ? (message.seengs += 1) : false;
      }
    },
    addDisLike: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        const messages = chat.forvard === 1 ? chat.messages : chat.oldMessages;
        messages
          .find((message) => message.id === action.payload.disLike.message_id)
          ?.Dislikes.push(action.payload.disLike);
      }
    },

    addLike: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        const messages = chat.forvard === 1 ? chat.messages : chat.oldMessages;
        messages
          .find((message) => message.id === action.payload.like.message_id)
          ?.Likes.push(action.payload.like);
      }
    },

    addMessageToChat: (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chat_id
      );
      if (chat) {
        chat.messages.push(action.payload);
        chat.allMessages += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(goToAboutMessageFetch.fulfilled, (state, action) => {
      if (action.payload && action.payload.chatId) {
        const chat = state.chats.find(
          (c) => c.id === Number(action.payload?.chatId)
        );
        if (chat) {
          chat.oldMessages = action.payload.messages;
          chat.forvard = action.payload.forvard;
        }
      }
    });
    builder.addCase(goToAboutMessageFetch.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(get_chats.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(get_chats.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(get_oldMessages.fulfilled, (state, action) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.oldMessages = action.payload.messages;
        action.payload.vector === "up"
          ? (chat.forvard += 1)
          : (chat.forvard -= 1);
      }
    });
    builder.addCase(get_oldMessages.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default chatsSlice.reducer;
export const {
  addMessageToChat,
  addLike,
  addDisLike,
  updateSeengs,
  addViewes,
  changeForvard,
  scrollTopChat,
  clickOnChat,
  newMessage,
  putMessage,
  addNewChat,
  deleteMessage,
  deleteMessageDefault,
  scrollFocusMessageIdDefault,
  updateStepsPlan,
  updateOnline,
  deleteChat,
  addChatAll,
  statePrevDefault,
  setLoadOk,
  socketChatsUpdate,
} = chatsSlice.actions;
