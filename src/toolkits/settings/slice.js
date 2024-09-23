import { createSlice } from "@reduxjs/toolkit";
import { SCAN_MODE } from "../../utils/common";

const initialState = {
  settings: [],
  setting: {},
  selectedSetting: {},
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
};

const reducer = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedSetting =
        action.payload !== null ? action.payload : initialState.setting;
    },
    getSettings: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getSettingsSuccess: (state, action) => {
      state.errorMessage = false;
      state.settings = action.payload.Data;
      state.isLoading = false;
    },
    getSettingsError: (state, action) => {
      state.errorMessage = "Error";
      state.settings = action.payload ? action.payload : state.settings;
      state.isLoading = false;
    },
    handleSetting: (state, action) => {},
    handleSettingSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedSetting = action.payload;
    },
    handleSettingError: (state, action) => {},
    updateSelectedSettingInput: (state, action) => {
      state.selectedSetting = action.payload;
    },
  },
});

export default reducer;
