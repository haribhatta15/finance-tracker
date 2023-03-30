// const [user, setUser] = useState({})

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const taransSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    setTrans: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

const { reducer, actions } = taransSlice;

export const { setTrans } = actions;

export default reducer;
