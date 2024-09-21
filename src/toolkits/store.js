import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import departmentSlice from "./departments/slice";
import sessionSlice from "./sessions/slice";
import scanSlice from "./scans/slice";
import ipRangeSlice from "./ipRanges/slice";
import identifySlice from "./identifies/slice";
import statisticSlice from "./statistics/slice";
import curatorSlice from "./curators/slice";
import appSlice from "./App/slice";
import reportSlice from "./reports/slice";
import contactSlice from "./contacts/slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    departments: departmentSlice.reducer,
    ipRanges: ipRangeSlice.reducer,
    sessions: sessionSlice.reducer,
    scans: scanSlice.reducer,
    identifies: identifySlice.reducer,
    statistics: statisticSlice.reducer,
    curators: curatorSlice.reducer,
    apps: appSlice.reducer,
    reports: reportSlice.reducer,
    contacts: contactSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
