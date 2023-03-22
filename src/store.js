import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    userInfo: {},
  },
});

export default store;
