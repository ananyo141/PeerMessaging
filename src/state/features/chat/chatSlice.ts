import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  timestamp: number;
  content: string;
  username: string;
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearChat: (_) => {
      return initialState;
    },
  },
});

export const { addMessage, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
