import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countWithDateRange: [],
  countIpRange: [],
};

const reducer = createSlice({
  name: "Statistics",
  initialState,
  reducers: {
    getCountWithDateRange: (state, action) => {},
    getCountWithDateRangeSuccess: (state, action) => {
      console.log(action.payload);
      state.countWithDateRange = action.payload.Data;
    },
    getCountWithDateRangeError: (state, action) => {
      state.countWithDateRange = action.payload
        ? action.payload
        : state.countWithDateRange;
    },
    getCountIpRange: (state, action) => {},
    getCountIpRangeSuccess: (state, action) => {
      state.countIpRange = action.payload.Data;
    },
    getCountIpRangeError: (state, action) => {
      state.countIpRange = action.payload ? action.payload : state.countIpRange;
    },
  },
});

export default reducer;
