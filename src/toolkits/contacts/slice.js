import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  contact: {},
  selectedContact: {},
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  modalUpdateActive: false,
  count: 0,
  pageSize: 0,
  pageNumber: 0,
  departmentNodeSelected: {},
};

const reducer = createSlice({
  name: "Contacts",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedContact =
        action.payload !== null ? action.payload : initialState.contact;
    },
    toggleModalUpdate: (state, action) => {
      state.modalUpdateActive = !state.modalUpdateActive;
    },
    getContacts: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getContactsSuccess: (state, action) => {
      state.errorMessage = false;
      state.contacts = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.pageNumber = action.payload.Paging.pageNumber;
      state.pageSize = action.payload.Paging.pageSize;
      state.isLoading = false;
    },
    getContactsError: (state, action) => {
      state.errorMessage = "Error";
      state.contact = action.payload ? action.payload : state.contact;
      state.isLoading = false;
    },
    handleContact: (state, action) => {},
    updateDepartmentIdForContacts: (state, action) => {},
    handleContactSuccess: (state, action) => {
      state.modalActive = false;
      state.modalUpdateActive = false;
      state.errorMessage = false;
      state.selectedContact = action.payload;
    },
    handleContactError: (state, action) => {},
    updateSelectedContactInput: (state, action) => {
      state.selectedContact = action.payload;
    },
    updateDepartmentNodeSelected: (state, action) => {
      state.departmentNodeSelected = action.payload;
      state.selectedContact = initialState.contact;
    },
  },
});

export default reducer;
