import { all, call, put, takeEvery } from "redux-saga/effects";
import scheduleSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import { getAll, create, update } from "../../apis/schedule.api";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    // console.log(data, status);
    if (status === 200 || status === 201) {
      yield put(scheduleSlice.actions.getSchedulesSuccess(data));
    } else {
      yield put(scheduleSlice.actions.getSchedulesError([]));
    }
  } catch (error) {
    yield put(scheduleSlice.actions.getSchedulesError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, item));
    } else if (actionName === ACTION_NAME.UPDATE) {
      ({ data, status } = yield call(update, item));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? scheduleSlice.actions.handleScheduleSuccess()
        : scheduleSlice.actions.handleScheduleError([])
    );

    if (isSuccess) {
      yield put(scheduleSlice.actions.getSchedules(item));
    }
  } catch (error) {
    yield put(scheduleSlice.actions.handleScheduleError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(scheduleSlice.actions.getSchedules().type, _getAll),
    yield takeEvery(scheduleSlice.actions.handleSchedule().type, _handleItem),
  ]);
}
