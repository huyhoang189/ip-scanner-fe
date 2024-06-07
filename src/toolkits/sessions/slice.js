import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: [],
  session: {
    ID: null,
    Name: "",
    Description: "",
    Status: "NOTHING",
    Progress: 0,
    CreatedAt: "",
    UpdatedAt: "",
  },
  selectedSession: {
    ID: null,
    Name: "",
    Description: "",
    Status: "NOTHING",
    Progress: 0,
    CreatedAt: "",
    UpdatedAt: "",
  },
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
};

const reducer = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedSession =
        action.payload !== null ? action.payload : initialState.session;
    },
    getSessions: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getSessionsSuccess: (state, action) => {
      state.errorMessage = false;
      state.sessions = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.pageNumber = action.payload.Paging.pageNumber;
      state.pageSize = action.payload.Paging.pageSize;
      state.isLoading = false;
    },
    getSessionsError: (state, action) => {
      state.errorMessage = "Error";
      state.sessions = action.payload ? action.payload : state.sessions;
      state.isLoading = false;
    },
    handleSession: (state, action) => {},
    handleSessionSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedSession = action.payload;
    },
    handleSessionError: (state, action) => {},
    updateSelectedSessionInput: (state, action) => {
      state.selectedSession = action.payload;
    },
  },
});

export default reducer;
