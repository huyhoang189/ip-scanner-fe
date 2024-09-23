import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionUser: {},
  sessionUserInit: {},
  item: {},
  isLogin: false,
  modalActive: false,
  errorMessage: false,
};

const reducer = createSlice({
  name: "auths",
  initialState,
  reducers: {
    checkAuthentication: (state, action) => {},
    login: (state, action) => {
      state.errorMessage = false;
    },
    loginSuccess: (state, action) => {
      state.item = action.payload;
      state.isLogin = true;
      state.errorMessage = false;
    },
    loginError: (state, action) => {
      state.isLogin = false;
      state.errorMessage = action.payload.error;
    },
    logout: (state, action) => {
      state.item = {};
      state.isLogin = false;
    },
    getSessionUser: (state, action) => {
      state.errorMessage = false;
    },
    getSessionUserSucces: (state, action) => {
      state.errorMessage = false;
      state.sessionUser = action.payload;
    },
    getSessionUserError: (state, action) => {
      state.errorMessage = action.payload.error;
      state.sessionUser = initialState.sessionUserInit;
    },
  },
});

export default reducer;
