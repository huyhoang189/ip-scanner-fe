import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipRanges: [],
  ipRange: {
    ID: null,
    IpRangeInt: 3232279040,
    IpRange: "",
    Subnet: 0,
    DepartmentID: "",
    CreatedAt: "",
    UpdatedAt: "",
  },
  selectedIpRange: {
    ID: null,
    IpRangeInt: 3232279040,
    IpRange: "",
    Subnet: 0,
    DepartmentID: "",
    CreatedAt: "",
    UpdatedAt: "",
  },
  errorMessage: false,
  isLoading: false,
  modalActive: false,
  modalUpdateActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  departmentNodeSelected: {},
  sortParams: {
    sortField: null, // default sort field
    sortOrder: null, // default sort order
  },
};

const reducer = createSlice({
  name: "IpRanges",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedIpRange =
        action.payload !== null ? action.payload : initialState.ipRange;
    },
    toggleModalUpdate: (state, action) => {
      state.modalUpdateActive = !state.modalUpdateActive;
    },
    getIpRanges: (state, action) => {
      state.errorMessage = false;
      state.isLoading = true;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    getIpRangesSuccess: (state, action) => {
      state.errorMessage = false;
      state.ipRanges = action.payload.Data;
      state.count = action.payload.Paging.totalItem;

      state.isLoading = false;
    },
    getIpRangesError: (state, action) => {
      state.errorMessage = "Error";
      state.ipRange = action.payload ? action.payload : state.ipRange;
      state.isLoading = false;
    },
    handleIpRange: (state, action) => {},
    updateDepartmentIdForIpRanges: (state, action) => {},
    handleIpRangeSuccess: (state, action) => {
      state.modalActive = false;
      state.modalUpdateActive = false;
      state.errorMessage = false;
      state.selectedIpRange = action.payload;
    },
    handleIpRangeError: (state, action) => {},
    updateSelectedIpRangeInput: (state, action) => {
      state.selectedIpRange = action.payload;
    },
    updateDepartmentNodeSelected: (state, action) => {
      state.departmentNodeSelected = action.payload;
      state.selectedIpRange = initialState.ipRange;
    },
    updateSortParams: (state, action) => {
      state.sortParams = action.payload;
    },
  },
});

export default reducer;
