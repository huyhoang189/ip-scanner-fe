import { createSlice } from "@reduxjs/toolkit";
import { SCAN_MODE } from "../../utils/common";

const initialState = {
  histories: [],
  history: {},
  selectedHistory: {}, // Changed from 'selectedCurator'
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
};

const reducer = createSlice({
  name: "histories",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedHistory =
        action.payload !== null ? action.payload : initialState.history;
    },
    getHistories: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    getHistoriesSuccess: (state, action) => {
      console.log("action.payload", action.payload.Data);
      state.errorMessage = false;
      state.histories = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.isLoading = false;
    },
    getHistoriesError: (state, action) => {
      state.errorMessage = "Error";
      state.histories = action.payload ? action.payload : state.histories;
      state.isLoading = false;
    },
    handleHistory: (state, action) => {},
    handleHistorySuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedHistory = action.payload;
    },
    handleHistoryError: (state, action) => {},
    updateSelectedHistoryInput: (state, action) => {
      state.selectedHistory = action.payload;
    },
  },
});

export default reducer;
