import { all, call, put, takeEvery } from "redux-saga/effects";
import settingSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import { getAll, create, update } from "../../apis/setting.api";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    // console.log(data, status);
    if (status === 200 || status === 201) {
      yield put(settingSlice.actions.getSettingsSuccess(data));
    } else {
      yield put(settingSlice.actions.getSettingsError([]));
    }
  } catch (error) {
    yield put(settingSlice.actions.getSettingsError([]));
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
        ? settingSlice.actions.handleSettingSuccess()
        : settingSlice.actions.handleSettingError([])
    );

    if (isSuccess) {
      yield put(settingSlice.actions.getSettings(item));
    }
  } catch (error) {
    yield put(settingSlice.actions.handleSettingError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(settingSlice.actions.getSettings().type, _getAll),
    yield takeEvery(settingSlice.actions.handleSetting().type, _handleItem),
  ]);
}
