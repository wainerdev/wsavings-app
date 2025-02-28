import { savingsAPI } from "@/services/wsavingsAPI";
import { User } from "@/shared/models/User";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  signedUser: null as User | null,
  isInitialized: false,
}

export const userAuthSlice = createSlice({
  name: "session",
  initialState: INITIAL_STATE,
  reducers: {
    signOut: (state) => {
      console.log("signOut");
      state.signedUser = INITIAL_STATE.signedUser;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      savingsAPI.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        const { user } = payload as unknown as {
          user: User;
        };
        state.signedUser = user;
        state.isInitialized = true;
      }
    ),
    builder.addMatcher(
      savingsAPI.endpoints.getProfile.matchRejected,
      (state) => {
        state.isInitialized = true;
      }
    ),
    builder.addMatcher(
      savingsAPI.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        const { user } = payload as unknown as {
          token: string;
          user: User;
        };
        console.log("getProfile", payload);
        state.signedUser = user;
        state.isInitialized = true;
      }
    );
  },
});

export const { signOut } = userAuthSlice.actions;

export default userAuthSlice.reducer;
