import { all, call, put, takeEvery } from "redux-saga/effects";
import userSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import { getAll, deleteItem, create, update } from "../../apis/user.api";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    // console.log(data, status);
    if (status === 200 || status === 201) {
      yield put(userSlice.actions.getUsersSuccess(data));
    } else {
      yield put(userSlice.actions.getUsersError([]));
    }
  } catch (error) {
    yield put(userSlice.actions.getUsersError([]));
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
        ? userSlice.actions.handleUserSuccess()
        : userSlice.actions.handleUserError([])
    );

    if (isSuccess) {
      yield put(userSlice.actions.getUsers(payload));
    }
  } catch (error) {
    yield put(userSlice.actions.handleUserError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(userSlice.actions.getUsers().type, _getAll),
    yield takeEvery(userSlice.actions.handleUser().type, _handleItem),
  ]);
}
