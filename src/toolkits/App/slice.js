import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuCollapse: true,
};

const reducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSiderbar: (state, action) => {
      state.menuCollapse = !state.menuCollapse;
    },
  },
});

export default reducer;
