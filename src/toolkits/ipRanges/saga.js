import { all, call, put, select, takeEvery } from "redux-saga/effects";
import ipRangeSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import {
  getAll,
  deleteItem,
  create,
  update,
  getAllByDepartmentId,
} from "../../apis/ipRange.api";

function* _getAll({ payload }) {
  try {
    const state = yield select();
    const { ipRanges } = state;
    if (ipRanges?.departmentNodeSelected?.ID) {
      const { data, status } = yield call(getAllByDepartmentId, {
        ...payload,
        departmentId: ipRanges?.departmentNodeSelected?.ID,
      });
      if (status === 200 || status === 201) {
        yield put(ipRangeSlice.actions.getIpRangesSuccess(data));
      } else {
        yield put(ipRangeSlice.actions.getIpRangesError([]));
      }
    } else {
      yield put(ipRangeSlice.actions.getIpRangesError([]));
    }
  } catch (error) {
    yield put(ipRangeSlice.actions.getIpRangesError([]));
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
        ? ipRangeSlice.actions.handleIpRangeSuccess()
        : ipRangeSlice.actions.handleIpRangeError([])
    );

    if (isSuccess) {
      yield put(ipRangeSlice.actions.getIpRanges(payload));
    }
  } catch (error) {
    yield put(ipRangeSlice.actions.handleIpRangeError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(ipRangeSlice.actions.getIpRanges().type, _getAll),
    yield takeEvery(ipRangeSlice.actions.handleIpRange().type, _handleItem),
  ]);
}
