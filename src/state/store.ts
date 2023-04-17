import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@src/state/features/user/userSlice";
import chatReducer from "@src/state/features/chat/chatSlice";

//Global store
export const store = configureStore({
  reducer: {
    //reducers are defined here
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
