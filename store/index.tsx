import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// SERVICES
import { savingsAPI } from "@/services/wsavingsAPI";
// SLICES
import searchProfessionReducer from "@/store/slices/searchProfessionSlice";
import userAuthReducer from "@/store/slices/userAuthSlice";

const rootReducer = combineReducers({
  [savingsAPI.reducerPath]: savingsAPI.reducer,
  searchProfession: searchProfessionReducer,
  userAuth: userAuthReducer, 
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(savingsAPI.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;