import { all, call, put, select, takeEvery } from "redux-saga/effects";
import identifySlice from "./slice";
import scanSlice from "../scans/slice";
import { ACTION_NAME } from "../../utils/common";
import { identify } from "../../apis/scan.api";

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;

    if (actionName === ACTION_NAME.IDENTIFY) {
      ({ data, status } = yield call(identify, item));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? identifySlice.actions.identifyIpRangeSuccess()
        : identifySlice.actions.identifyIpRangeError([])
    );

    if (isSuccess) {
      yield put(
        scanSlice.actions.getScanBySessionIDs({
          SessionID: payload?.item?.SessionID,
          pageNumber: payload?.pageNumber,
          keyword: payload?.keyword,
          pageSize: payload?.pageSize,
        })
      );
    }
  } catch (error) {
    yield put(identifySlice.actions.handleIpRangeError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(identifySlice.actions.identifyIpRange().type, _handleItem),
  ]);
}
