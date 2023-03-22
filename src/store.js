import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/register-login/userSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
  },
});

export default store;
