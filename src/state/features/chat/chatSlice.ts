import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Peer } from "peerjs";

interface Message {
  timestamp: number;
  content: string;
  username: string;
}

interface ChatState {
  messages: Message[];
  peerObject: Peer | null;
}

const initialState: ChatState = {
  messages: [],
  peerObject: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setConnection: (state, action: PayloadAction<Peer>) => {
      state.peerObject = action.payload;
    },
    clearChat: (_) => {
      return initialState;
    },
  },
});

export const { addMessage, setConnection, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
