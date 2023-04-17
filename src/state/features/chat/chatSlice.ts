import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataConnection } from "peerjs";

interface Message {
  timestamp: number;
  content: string;
  username: string;
}

interface ChatState {
  messages: Message[];
  connection: DataConnection | null;
}

const initialState: ChatState = {
  messages: [],
  connection: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setConnection: (state, action: PayloadAction<DataConnection>) => {
      state.connection = action.payload;
    },
    clearChat: (_) => {
      return initialState;
    },
  },
});

export const { addMessage, setConnection, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
