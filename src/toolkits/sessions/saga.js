import { all, call, put, takeEvery } from "redux-saga/effects";
import sessionSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import { getAll, deleteItem, create, update } from "../../apis/session.api";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    // console.log(data, status);
    if (status === 200 || status === 201) {
      yield put(sessionSlice.actions.getSessionsSuccess(data));
    } else {
      yield put(sessionSlice.actions.getSessionsError([]));
    }
  } catch (error) {
    yield put(sessionSlice.actions.getSessionsError([]));
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
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deleteItem, { ID: item.ID }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? sessionSlice.actions.handleSessionSuccess()
        : sessionSlice.actions.handleSessionError([])
    );

    if (isSuccess) {
      yield put(sessionSlice.actions.getSessions(payload));
    }
  } catch (error) {
    yield put(sessionSlice.actions.handleSessionError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(sessionSlice.actions.getSessions().type, _getAll),
    yield takeEvery(sessionSlice.actions.handleSession().type, _handleItem),
  ]);
}
