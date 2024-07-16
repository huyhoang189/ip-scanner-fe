import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identify: {
    IpRanges: [],
    DepartmentID: null,
    SessionID: null,
  },
  selectedIdentify: {
    IpRanges: [],
    DepartmentID: null,
    SessionID: null,
  },
  isLoading: false,
  modalActive: false,
  errorMessage: false,
};

const reducer = createSlice({
  name: "Identifies",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      console.log(action.payload);
      state.modalActive = !state.modalActive;
      state.selectedIdentify =
        action.payload !== null ? action.payload : initialState.identify;
    },
    identifyIpRange: (state, action) => {},
    identifyIpRangeSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedIdentify = initialState.identify;
    },
    identifyIpRangeError: (state, action) => {},
    updateSelectedIdentyfiInput: (state, action) => {
      state.selectedIdentify = action.payload;
    },
  },
});

export default reducer;
