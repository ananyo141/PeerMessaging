import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  userId: string | null;
  contactId: string | null;
  avatarOptions: { [key: string]: string };
}

export const initialState: UserState = {
  userId: null,
  contactId: null,
  avatarOptions: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setContactId: (state, action: PayloadAction<string>) => {
      state.contactId = action.payload;
    },
    setAvatarOptions: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.avatarOptions = action.payload;
    },
    clearUser: (_) => {
      return initialState;
    },
  },
});

export const { setUserId, setContactId, setAvatarOptions, clearUser } = userSlice.actions;

export default userSlice.reducer;
