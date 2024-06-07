import { all, call, put, select, takeEvery } from "redux-saga/effects";
import statisticSlice from "./slice";
import {
  statisticByDateRange,
  statisticByIndentifyIpRange,
} from "../../apis/ipRange.api";

function* _getCountIpRange({ payload }) {
  try {
    let data, status;

    ({ data, status } = yield call(statisticByIndentifyIpRange));

    if (status === 200 || status === 201) {
      yield put(statisticSlice.actions.getCountIpRangeSuccess(data));
    } else {
      yield put(statisticSlice.actions.getCountIpRangeError([]));
    }
  } catch (error) {
    yield put(statisticSlice.actions.getCountIpRangeError());
  }
}

function* _getCountWithDateRange({ payload }) {
  try {
    let data, status;
    ({ data, status } = yield call(statisticByDateRange, payload));

    if (status === 200 || status === 201) {
      yield put(statisticSlice.actions.getCountWithDateRangeSuccess(data));
    } else {
      yield put(statisticSlice.actions.getCountWithDateRangeError([]));
    }
  } catch (error) {
    yield put(statisticSlice.actions.getCountWithDateRangeError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      statisticSlice.actions.getCountIpRange().type,
      _getCountIpRange
    ),
    yield takeEvery(
      statisticSlice.actions.getCountWithDateRange().type,
      _getCountWithDateRange
    ),
  ]);
}
