import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countWithDateRange: [],
  countIpRange: [],
  overview: [],
  sessions: [],
};

const reducer = createSlice({
  name: "Statistics",
  initialState,
  reducers: {
    getCountWithDateRange: (state, action) => {},
    getCountWithDateRangeSuccess: (state, action) => {
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

    getOverview: (state, action) => {},
    getOverviewSuccess: (state, action) => {
      state.overview = action.payload.Data;
    },
    getOverviewError: (state, action) => {
      state.overview = action.payload ? action.payload : state.overview;
    },

    getSessions: (state, action) => {},
    getSessionsSuccess: (state, action) => {
      state.sessions = action.payload.Data;
    },
    getSessionsError: (state, action) => {
      state.sessions = action.payload ? action.payload : state.sessions;
    },
  },
});

export default reducer;
