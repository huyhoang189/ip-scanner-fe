import { all, call, put, select, takeEvery } from "redux-saga/effects";
import statisticSlice from "./slice";
import {
  statisticByDateRange,
  statisticByIndentifyIpRange,
} from "../../apis/ipRange.api";
import { statisticOverview } from "../../apis/statistic.api";

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

function* _getOverview({ payload }) {
  try {
    let data, status;
    ({ data, status } = yield call(statisticOverview, payload));

    if (status === 200 || status === 201) {
      yield put(statisticSlice.actions.getOverviewSuccess(data));
    } else {
      yield put(statisticSlice.actions.getOverviewError([]));
    }
  } catch (error) {
    yield put(statisticSlice.actions.getOverviewError());
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
    yield takeEvery(statisticSlice.actions.getOverview().type, _getOverview),
  ]);
}
