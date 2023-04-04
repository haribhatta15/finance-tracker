import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/register-login/userSlice";
import transReducer from "./pages/dashboard/transSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    trans: transReducer,
  },
});

export default store;