import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipRange: {},
  selectedIpRange: {},
  isLoading: false,
  modalActive: false,
  errorMessage: false,
};

const reducer = createSlice({
  name: "Identifies",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedIpRange =
        action.payload !== null ? action.payload : initialState.ipRange;
    },
    identifyIpRange: (state, action) => {},
    identifyIpRangeSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    identifyIpRangeError: (state, action) => {},
    updateSelectedIpRangeInput: (state, action) => {
      state.selectedIpRange = action.payload;
    },
  },
});

export default reducer;
