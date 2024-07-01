import { all, call, put, takeEvery } from "redux-saga/effects";
import scanSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import {
  getBySessionId,
  deleteItem,
  create,
  execute,
  executeAll,
} from "../../apis/scan.api";

function* _getBySessionId({ payload }) {
  try {
    const { data, status } = yield call(getBySessionId, payload);
    if (status === 200 || status === 201) {
      yield put(scanSlice.actions.getScanBySessionIDsSuccess(data));
    } else {
      yield put(scanSlice.actions.getScanBySessionIDsError([]));
    }
  } catch (error) {
    yield put(scanSlice.actions.getScanBySessionIDsError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, item));
    } else if (actionName === ACTION_NAME.EXECUTE) {
      ({ data, status } = yield call(execute, item));
    } else if (actionName === ACTION_NAME.EXECUTE_ALL) {
      ({ data, status } = yield call(executeAll, item));
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deleteItem, { ID: item.ID }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? scanSlice.actions.handleScanSuccess()
        : scanSlice.actions.handleScanError([])
    );

    if (isSuccess) {
      yield put(scanSlice.actions.getScanBySessionIDs(payload));
    }
  } catch (error) {
    yield put(scanSlice.actions.handleScanError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      scanSlice.actions.getScanBySessionIDs().type,
      _getBySessionId
    ),
    yield takeEvery(scanSlice.actions.handleScan().type, _handleItem),
  ]);
}
