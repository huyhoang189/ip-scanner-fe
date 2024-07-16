import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scans: [],
  scanLogs: [],
  scan: {
    ID: null,
    Command: "",
    Ips: "",
    Identified: "UNIDENTIFIED",
    SessionID: "",
    Status: "",
    CreatedAt: "",
    UpdatedAt: "",
  },
  selectedScan: {
    ID: null,
    Command: "",
    Ips: "",
    Identified: "UNIDENTIFIED",
    SessionID: "",
    Status: "",
    CreatedAt: "",
    UpdatedAt: "",
  },
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 1,
  filterOption: {
    IdentifyStatus: "TOTAL_RECORD",
  },
};

const reducer = createSlice({
  name: "scans",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedScan =
        action.payload !== null ? action.payload : initialState.scan;
    },
    getScanBySessionIDs: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getScanBySessionIDsSuccess: (state, action) => {
      state.errorMessage = false;
      state.scans = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.pageNumber = action.payload.Paging.pageNumber;
      state.pageSize = action.payload.Paging.pageSize;
      state.isLoading = false;
    },
    getScanBySessionIDsError: (state, action) => {
      state.errorMessage = "Error";
      state.scans = action.payload ? action.payload : state.scans;
      state.isLoading = false;
    },
    handleScan: (state, action) => {},
    handleScanSuccess: (state, action) => {
      // state.modalActive = false;
      state.errorMessage = false;
      state.selectedScan = action.payload;
    },
    handleScanError: (state, action) => {},
    updateSelectedScanInput: (state, action) => {
      state.selectedScan = action.payload;
    },
    getScanLogBySessionIDs: (state, action) => {
      state.errorMessage = false;
    },
    getScanLogBySessionIDsSuccess: (state, action) => {
      state.errorMessage = false;
      state.scanLogs = action.payload.Data;
    },
    getScanLogBySessionIDsError: (state, action) => {
      state.errorMessage = "Error";
      state.scanLogs = action.payload ? action.payload : state.scanLogs;
    },
    updateFiterOptionScanInput: (state, action) => {
      state.filterOption = action.payload;
    },
  },
});

export default reducer;
