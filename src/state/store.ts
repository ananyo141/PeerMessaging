import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@src/state/features/user/userSlice";

//Global store
export const store = configureStore({
  reducer: {
    //reducers are defined here
    user: userReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
