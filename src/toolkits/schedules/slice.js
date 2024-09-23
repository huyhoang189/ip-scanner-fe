import { createSlice } from "@reduxjs/toolkit";
import { SCAN_MODE } from "../../utils/common";

const initialState = {
  schedules: [],
  schedule: {},
  selectedSchedule: {},
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
};

const reducer = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedSchedule =
        action.payload !== null ? action.payload : initialState.schedule;
    },
    getSchedules: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getSchedulesSuccess: (state, action) => {
      state.errorMessage = false;
      state.schedules = action.payload.Data;
      state.isLoading = false;
    },
    getSchedulesError: (state, action) => {
      state.errorMessage = "Error";
      state.schedules = action.payload ? action.payload : state.schedules;
      state.isLoading = false;
    },
    handleSchedule: (state, action) => {},
    handleScheduleSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedSchedule = action.payload;
    },
    handleScheduleError: (state, action) => {},
    updateSelectedScheduleInput: (state, action) => {
      state.selectedSchedule = action.payload;
    },
  },
});

export default reducer;
