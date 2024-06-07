import { all, call, put, takeEvery } from "redux-saga/effects";
import departmentSlice from "./slice";
import { ACTION_NAME } from "../../utils/common";
import { getAll, deleteItem, create, update } from "../../apis/department.api";

function* _getAllTree({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    // console.log(data, status);
    if (status === 200 || status === 201) {
      yield put(departmentSlice.actions.getDepartmentTreesSuccess(data));
    } else {
      yield put(departmentSlice.actions.getDepartmentsTreeError([]));
    }
  } catch (error) {
    yield put(departmentSlice.actions.getDepartmentsTreeError([]));
  }
}

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    // console.log(data, status);
    if (status === 200 || status === 201) {
      yield put(departmentSlice.actions.getDepartmentsSuccess(data));
    } else {
      yield put(departmentSlice.actions.getDepartmentsError([]));
    }
  } catch (error) {
    yield put(departmentSlice.actions.getDepartmentsError([]));
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
        ? departmentSlice.actions.handleDepartmentSuccess()
        : departmentSlice.actions.handleDepartmentError([])
    );

    if (isSuccess) {
      yield put(departmentSlice.actions.getDepartments(payload));
    }
  } catch (error) {
    yield put(departmentSlice.actions.handleDepartmentError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(departmentSlice.actions.getDepartments().type, _getAll),
    yield takeEvery(
      departmentSlice.actions.getDepartmentTrees().type,
      _getAllTree
    ),
    yield takeEvery(
      departmentSlice.actions.handleDepartment().type,
      _handleItem
    ),
  ]);
}
