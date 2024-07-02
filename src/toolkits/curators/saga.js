import { all, call, put, takeEvery } from "redux-saga/effects";
import curatorSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import { getAll, deleteItem, create, update } from "../../apis/curator.api";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    // console.log(data, status);
    if (status === 200 || status === 201) {
      yield put(curatorSlice.actions.getCuratorsSuccess(data));
    } else {
      yield put(curatorSlice.actions.getCuratorsError([]));
    }
  } catch (error) {
    yield put(curatorSlice.actions.getCuratorsError([]));
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
        ? curatorSlice.actions.handleCuratorSuccess()
        : curatorSlice.actions.handleCuratorError([])
    );

    if (isSuccess) {
      yield put(curatorSlice.actions.getCurators(item));
    }
  } catch (error) {
    yield put(curatorSlice.actions.handleCuratorError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(curatorSlice.actions.getCurators().type, _getAll),
    yield takeEvery(curatorSlice.actions.handleCurator().type, _handleItem),
  ]);
}
