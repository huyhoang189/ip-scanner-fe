import { all } from "redux-saga/effects";
import departmentSaga from "./departments/saga";
import ipRangeSaga from "./ipRanges/saga";
import sessionSaga from "./sessions/saga";
import scanSaga from "./scans/saga";
import identifySaga from "./identifies/saga";
import statisticSaga from "./statistics/saga";
import curatorSaga from "./curators/saga";
export default function* rootSaga() {
  yield all([
    departmentSaga(),
    ipRangeSaga(),
    sessionSaga(),
    scanSaga(),
    identifySaga(),
    statisticSaga(),
    curatorSaga(),
  ]);
}
