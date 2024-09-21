import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportIpRanges: [],
  reportSessions: [],
  isLoading: false,
  errorMessage: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
};

const reducer = createSlice({
  name: "Reports",
  initialState,
  reducers: {
    getReportIpRange: (state, action) => {
      state.isLoading = true;
      state.errorMessage = false;
    },
    getReportIpRangeSuccess: (state, action) => {
      state.isLoading = false;
      state.reportIpRanges = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.pageNumber = action.payload.Paging.pageNumber;
      state.pageSize = action.payload.Paging.pageSize;
    },
    getReportIpRangeError: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "Error";
      state.reportIpRanges = [];
    },
    getReportSession: (state, action) => {
      state.isLoading = true;
      state.errorMessage = false;
    },
    getReportSessionSuccess: (state, action) => {
      state.isLoading = false;
      state.reportSessions = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.pageNumber = action.payload.Paging.pageNumber;
      state.pageSize = action.payload.Paging.pageSize;
    },
    getReportSessionError: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "Error";
      state.reportSessions = [];
    },
  },
});

export default reducer;
