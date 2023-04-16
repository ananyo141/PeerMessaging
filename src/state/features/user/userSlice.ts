import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  userId: string | null;
  contactId: string | null;
}

export const initialState: UserState = {
  userId: null,
  contactId: null,
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
    clearUser: (_) => {
      return initialState;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
