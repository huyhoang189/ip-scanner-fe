import { createSlice } from "@reduxjs/toolkit";
import { SCAN_MODE } from "../../utils/common";

const initialState = {
  curators: [],
  curator: {},
  selectedCurator: {},
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
};

const reducer = createSlice({
  name: "curators",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedCurator =
        action.payload !== null ? action.payload : initialState.curator;
    },
    getCurators: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getCuratorsSuccess: (state, action) => {
      state.errorMessage = false;
      state.curators = action.payload.Data;
      state.isLoading = false;
    },
    getCuratorsError: (state, action) => {
      state.errorMessage = "Error";
      state.curators = action.payload ? action.payload : state.curators;
      state.isLoading = false;
    },
    handleCurator: (state, action) => {},
    handleCuratorSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedCurator = action.payload;
    },
    handleCuratorError: (state, action) => {},
    updateSelectedCuratorInput: (state, action) => {
      state.selectedCurator = action.payload;
    },
  },
});

export default reducer;
