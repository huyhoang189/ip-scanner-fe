import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  departmentTrees: [],
  department: {
    ID: null,
    Name: "",
    Description: "",
    Position: 0,
    ParentID: "",
    Parent: null,
    IsCategory: false,
    FullName: "",
    CreatedAt: "",
    UpdatedAt: "",
  },
  selectedDepartment: {
    ID: null,
    Name: "",
    Description: "",
    Position: 0,
    ParentID: "",
    Parent: null,
    IsCategory: false,
    FullName: "",
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
  name: "departments",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDepartment =
        action.payload !== null ? action.payload : initialState.department;
    },
    getDepartments: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
    },
    getDepartmentsSuccess: (state, action) => {
      state.errorMessage = false;
      state.departments = action.payload.Data;
      state.count = action.payload.Paging.totalItem;
      state.pageNumber = action.payload.Paging.pageNumber;
      state.pageSize = action.payload.Paging.pageSize;
      state.isLoading = false;
    },
    getDepartmentsError: (state, action) => {
      state.errorMessage = "Error";
      state.departments = action.payload ? action.payload : state.departments;
      state.isLoading = false;
    },
    handleDepartment: (state, action) => {},
    handleDepartmentSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
      state.selectedDepartment = action.payload;
    },
    handleDepartmentError: (state, action) => {},
    updateSelectedDepartmentInput: (state, action) => {
      state.selectedDepartment = action.payload;
    },

    getDepartmentTrees: (state, action) => {
      state.errorMessage = false;
    },
    getDepartmentTreesSuccess: (state, action) => {
      state.departmentTrees = action.payload.Data;
    },
    getDepartmentsTreeError: (state, action) => {
      state.errorMessage = "Error";
      state.departmentTrees = action.payload
        ? action.payload
        : state.departments;
      state.isLoading = false;
    },
  },
});

export default reducer;
