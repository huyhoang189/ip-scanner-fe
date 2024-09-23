import { createSlice } from "@reduxjs/toolkit";
import { SCAN_MODE } from "../../utils/common";

const initialState = {
  users: [],
  user: {},
  selectedUser: {},
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
};

const reducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedUser =
        action.payload !== null ? action.payload : initialState.user;
    },
    getUsers: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.errorMessage = false;
      state.users = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.pageNumber = action.payload.Paging.pageNumber;
      state.pageSize = action.payload.Paging.pageSize;
      state.isLoading = false;
    },
    getUsersError: (state, action) => {
      state.errorMessage = "Error";
      state.users = action.payload ? action.payload : state.users;
      state.isLoading = false;
    },
    handleUser: (state, action) => {},
    handleUserSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedUser = action.payload;
    },
    handleUserError: (state, action) => {},
    updateSelectedUserInput: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export default reducer;
