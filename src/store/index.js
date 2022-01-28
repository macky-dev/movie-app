import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieSlice from "./movieSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieSlice,
  },
});
