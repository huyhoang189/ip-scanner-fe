import { getReportIpRange, getReportSession } from "../../apis/report.api";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import reportSlice from "./slice";
function* _getReportIpRange({ payload }) {
  try {
    const { data, status } = yield call(getReportIpRange, payload);
    if (status === 200 || status === 201) {
      yield put(reportSlice.actions.getReportIpRangeSuccess(data));
    } else {
      yield put(reportSlice.actions.getReportIpRangeError([]));
    }
  } catch (error) {
    yield put(reportSlice.actions.getReportIpRangeError([]));
  }
}

function* _getReportSession({ payload }) {
  try {
    const { data, status } = yield call(getReportSession, payload);
    if (status === 200 || status === 201) {
      yield put(reportSlice.actions.getReportSessionSuccess(data));
    } else {
      yield put(reportSlice.actions.getReportSessionError([]));
    }
  } catch (error) {
    yield put(reportSlice.actions.getReportSessionError([]));
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      reportSlice.actions.getReportIpRange().type,
      _getReportIpRange
    ),
    yield takeEvery(
      reportSlice.actions.getReportSession().type,
      _getReportSession
    ),
  ]);
}
