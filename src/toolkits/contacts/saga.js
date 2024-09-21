import { all, call, put, select, takeEvery } from "redux-saga/effects";
import contactSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import {
  deleteItem,
  create,
  update,
  getAllByDepartmentId,
} from "../../apis/curator.api";

function* _getAll({ payload }) {
  try {
    const state = yield select();
    const { contacts } = state;
    if (contacts?.departmentNodeSelected?.ID) {
      const { data, status } = yield call(getAllByDepartmentId, {
        ...payload,
        departmentId: contacts?.departmentNodeSelected?.ID,
      });
      if (status === 200 || status === 201) {
        yield put(contactSlice.actions.getContactsSuccess(data));
      } else {
        yield put(contactSlice.actions.getContactsError([]));
      }
    } else {
      yield put(contactSlice.actions.getContactsError([]));
    }
  } catch (error) {
    yield put(contactSlice.actions.getContactsError([]));
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
        ? contactSlice.actions.handleContactSuccess()
        : contactSlice.actions.handleContactError([])
    );

    if (isSuccess) {
      yield put(contactSlice.actions.getContacts(payload));
    }
  } catch (error) {
    yield put(contactSlice.actions.handleContactError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(contactSlice.actions.getContacts().type, _getAll),
    yield takeEvery(contactSlice.actions.handleContact().type, _handleItem),
  ]);
}
