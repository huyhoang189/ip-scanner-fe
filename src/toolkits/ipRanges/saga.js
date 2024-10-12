import { all, call, put, select, takeEvery } from "redux-saga/effects";
import ipRangeSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import {
  getAll,
  deleteItem,
  create,
  update,
  getAllByDepartmentId,
  updateDepartmentIdForIpRanges,
} from "../../apis/ipRange.api";

import historySlice from "../histories/slice";

function* _getAll({ payload }) {
  try {
    const state = yield select();
    const { ipRanges } = state;
    if (ipRanges?.departmentNodeSelected?.ID) {
      const { data, status } = yield call(getAllByDepartmentId, {
        ...payload,
        keyword: ipRanges?.searchOptions?.keyword,
        departmentId: ipRanges?.departmentNodeSelected?.ID,
        sortParams: ipRanges?.sortParams,
        activeStatus: ipRanges?.searchOptions?.activeStatus,
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
      // call update api
      ({ data, status } = yield call(update, item));

      yield put(
        historySlice.actions.handleHistory({
          actionName: ACTION_NAME.CREATE,
          item: [{ IpRangeID: item?.ID, DepartmentID: item.DepartmentID }],
        })
      );
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

function* _handleUpdateIpRangess({ payload }) {
  try {
    const { item } = payload;
    let data, status;
    ({ data, status } = yield call(updateDepartmentIdForIpRanges, item));

    yield put(
      historySlice.actions.handleHistory({
        actionName: ACTION_NAME.CREATE,
        item: item.IpRangeIDs.map((id) => ({
          IpRangeID: id,
          DepartmentID: item.DepartmentID,
        })),
      })
    );

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
    yield takeEvery(
      ipRangeSlice.actions.updateDepartmentIdForIpRanges().type,
      _handleUpdateIpRangess
    ),
  ]);
}
