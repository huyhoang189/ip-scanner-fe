import { all, call, put, takeEvery } from "redux-saga/effects";
import historySlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import { getByIpRange, deleteItem, creates } from "../../apis/history.api";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getByIpRange, payload);
    if (status === 200 || status === 201) {
      yield put(historySlice.actions.getHistoriesSuccess(data));
    }
  } catch (error) {
    console.log("error", error);
    yield put(historySlice.actions.getHistoriesError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(creates, item));
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deleteItem, { ID: item.ID }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? historySlice.actions.handleHistorySuccess()
        : historySlice.actions.handleHistoryError([])
    );

    if (isSuccess) {
      yield put(historySlice.actions.getHistories(item));
    }
  } catch (error) {
    yield put(historySlice.actions.handleHistoryError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(historySlice.actions.getHistories().type, _getAll),
    yield takeEvery(historySlice.actions.handleHistory().type, _handleItem),
  ]);
}
