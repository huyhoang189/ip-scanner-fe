import { all } from "redux-saga/effects";
import departmentSaga from "./departments/saga";
import ipRangeSaga from "./ipRanges/saga";
import sessionSaga from "./sessions/saga";
import scanSaga from "./scans/saga";
import identifySaga from "./identifies/saga";
import statisticSaga from "./statistics/saga";
import curatorSaga from "./curators/saga";
import reportSaga from "./reports/saga";
import contactSaga from "./contacts/saga";
import scheduleSaga from "./schedules/saga";
import settingSaga from "./settings/saga";
import authSaga from "./auth/saga";
import useSaga from "./users/saga";

export default function* rootSaga() {
  yield all([
    departmentSaga(),
    ipRangeSaga(),
    sessionSaga(),
    scanSaga(),
    identifySaga(),
    statisticSaga(),
    curatorSaga(),
    reportSaga(),
    contactSaga(),
    scheduleSaga(),
    settingSaga(),
    authSaga(),
    useSaga(),
  ]);
}
