import { User } from "@/shared/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
  },
  reducers: {
    signOut: (state) => {
      state.user = null;
    },
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { signIn, signOut} =
  userAuthSlice.actions;

export default userAuthSlice.reducer;